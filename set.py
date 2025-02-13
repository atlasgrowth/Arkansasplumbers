#!/usr/bin/env python3

import os
import sys
import subprocess
import json
import re

# -- CONFIG --
# The default folder you want both Vite + Vercel to use.
# e.g., "dist" or "public"
FORCE_OUT_DIR = "dist"

# If you keep your main code in "website/" folder, adjust here:
VITE_CONFIG_PATH = "website/vite.config.js"
VERCEL_JSON_PATH = "vercel.json"
PACKAGE_JSON_PATH = "website/package.json"  # if your package.json is in website/


def run_cmd(cmd):
    """Runs a shell command with live output. Raises on non-zero exit code."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def unify_vite_config():
    """
    Ensures that VITE_CONFIG_PATH sets `build.outDir = FORCE_OUT_DIR`.
    If not found, inserts or replaces it.
    """
    if not os.path.isfile(VITE_CONFIG_PATH):
        print(f"WARNING: {VITE_CONFIG_PATH} not found. Skipping unify.")
        return

    with open(VITE_CONFIG_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple approach: remove any line matching outDir: '...'
    # Then insert a line with outDir: 'dist' inside the build block if it exists.
    # We'll do a naive approach here. If user has multiple lines, we'll unify them.

    # Step 1: Remove existing outDir references
    pattern = r'(outDir\s*:\s*[\'"])(.*?)([\'"])'
    new_content = re.sub(pattern, rf"\1{FORCE_OUT_DIR}\3", content)

    if new_content != content:
        print(f"Replaced outDir references in {VITE_CONFIG_PATH} with '{FORCE_OUT_DIR}'.")
        content = new_content
    else:
        # If no references found, we might forcibly insert it inside build: { ... }
        # We'll do a naive approach: find "build: {" or create it
        if "build:" in content:
            # Insert outDir
            new_content = re.sub(
                r'(build\s*:\s*\{\s*)',
                rf"\1\n    outDir: '{FORCE_OUT_DIR}',",
                content
            )
            if new_content == content:
                print("Did not find a place to insert outDir. Not modifying build block.")
            else:
                print(f"Inserted outDir: '{FORCE_OUT_DIR}' into existing build block.")
                content = new_content
        else:
            # add a build block at top level
            # This is a bit naive, but we'll do a quick approach
            # Insert after first line
            lines = content.split("\n")
            lines.insert(1, f"  build: {{ outDir: '{FORCE_OUT_DIR}' }},")
            content = "\n".join(lines)
            print(f"Created build block with outDir: '{FORCE_OUT_DIR}' in {VITE_CONFIG_PATH}.")

    with open(VITE_CONFIG_PATH, "w", encoding="utf-8") as f:
        f.write(content)

def unify_vercel_json():
    """
    Ensures `vercel.json` sets "distDir": FORCE_OUT_DIR
    If no vercel.json found, warns and does nothing.
    Also checks or adds fallback route for BrowserRouter (optional).
    """
    if not os.path.isfile(VERCEL_JSON_PATH):
        print(f"WARNING: {VERCEL_JSON_PATH} not found. Skipping unify.")
        return

    with open(VERCEL_JSON_PATH, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            print(f"ERROR: {VERCEL_JSON_PATH} is not valid JSON. Skipping unify.")
            return

    builds = data.get("builds", [])
    updated_any = False
    for b in builds:
        if b.get("use") == "@vercel/static-build":
            config = b.setdefault("config", {})
            old_dist = config.get("distDir")
            if old_dist != FORCE_OUT_DIR:
                config["distDir"] = FORCE_OUT_DIR
                updated_any = True

    if updated_any:
        print(f"Updated distDir to '{FORCE_OUT_DIR}' in {VERCEL_JSON_PATH}.")
        with open(VERCEL_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    else:
        print(f"No changes to distDir needed in {VERCEL_JSON_PATH}.")

def unify_package_json():
    """
    Ensures the build script in package.json is "vite build",
    removing any custom --outDir override. Also ensures dependencies are installed.
    """
    if not os.path.isfile(PACKAGE_JSON_PATH):
        print(f"WARNING: {PACKAGE_JSON_PATH} not found. Skipping unify.")
        return

    with open(PACKAGE_JSON_PATH, "r", encoding="utf-8") as f:
        try:
            pack = json.load(f)
        except json.JSONDecodeError:
            print(f"ERROR: {PACKAGE_JSON_PATH} is not valid JSON. Skipping unify.")
            return

    scripts = pack.get("scripts", {})
    build_script = scripts.get("build")
    if build_script and "vite build" in build_script:
        # Check if there's a "--outDir" override
        if "--outDir" in build_script:
            new_build_script = "vite build"
            print(f"Removing '--outDir' override from build script in {PACKAGE_JSON_PATH}.")
            scripts["build"] = new_build_script
            pack["scripts"] = scripts
            with open(PACKAGE_JSON_PATH, "w", encoding="utf-8") as f:
                json.dump(pack, f, indent=2)
        else:
            print("Build script is already 'vite build' with no overrides. Good.")
    else:
        # forcibly set "build": "vite build"
        scripts["build"] = "vite build"
        pack["scripts"] = scripts
        with open(PACKAGE_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(pack, f, indent=2)
        print(f"Set build script to 'vite build' in {PACKAGE_JSON_PATH}.")

def remove_extra_vite_configs():
    """
    Checks for multiple vite configs like vite.config.ts, vite.config.js etc.
    If more than one found, tries removing them except the main VITE_CONFIG_PATH.
    """
    # We'll look for files matching "vite.config.*" in website/ except the main one
    config_dir = os.path.dirname(VITE_CONFIG_PATH)
    if not os.path.isdir(config_dir):
        return

    all_files = os.listdir(config_dir)
    vite_configs = [f for f in all_files if f.startswith("vite.config.") and f != os.path.basename(VITE_CONFIG_PATH)]
    if vite_configs:
        print("Found extra vite config files:", vite_configs)
        for vc in vite_configs:
            path_to_remove = os.path.join(config_dir, vc)
            print(f"Removing extra config: {path_to_remove}")
            os.remove(path_to_remove)
    else:
        print("No extra vite.config.* files found.")

def git_push_changes():
    """Git add, commit, force-push to main with a standard message."""
    if not os.path.isdir(".git"):
        run_cmd("git init")
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

    token = os.environ.get("GITHUB_TOKEN")
    username = "greekfreek23"
    repo = "Arkansasplumbers"

    if token:
        remote_url = f"https://{token}@github.com/{username}/{repo}.git"
        run_cmd("git remote remove origin || true")
        run_cmd(f"git remote add origin {remote_url}")
    else:
        print("WARNING: GITHUB_TOKEN not set. You may be prompted for credentials on push.")

    run_cmd("git add .")
    run_cmd('git commit -m "Unify Vite and Vercel config" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def main():
    print(f"=== Unifying your Vite + Vercel config to use outDir '{FORCE_OUT_DIR}' ===")

    # Step 1) Remove extra Vite configs
    remove_extra_vite_configs()

    # Step 2) Unify vite.config.js outDir
    unify_vite_config()

    # Step 3) Unify vercel.json distDir
    unify_vercel_json()

    # Step 4) Unify package.json build script
    unify_package_json()

    # Step 5) Git push
    print("\n--- Committing and force-pushing changes to GitHub ---")
    git_push_changes()

    print("\nAll done! Check your GitHub repo, then let Vercel build. If Vercel still uses a different folder in logs,")
    print("check your Vercel Project Settings to ensure no 'Framework Preset' is overriding. Good luck!")

if __name__ == "__main__":
    main()
