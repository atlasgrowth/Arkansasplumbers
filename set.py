#!/usr/bin/env python3

import os
import sys
import subprocess
import json

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"

# Read GitHub token from environment variable
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("ERROR: GITHUB_TOKEN environment variable not set!")
    sys.exit(1)

def run_cmd(cmd):
    """Run a shell command with real-time output."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def main():
    print("===================================================")
    print(" Step 1: Install NPM dependencies in 'website/'")
    print("===================================================")
    run_cmd("npm install --prefix website")

    print("===================================================")
    print(" Step 2: Install gh-pages (dev) in 'website/'")
    print("===================================================")
    run_cmd("npm install --save-dev gh-pages --prefix website")

    print("===================================================")
    print(" Step 3: Modify 'website/package.json' to add 'predeploy' & 'deploy'")
    print("===================================================")
    pkg_path = os.path.join("website", "package.json")
    if not os.path.isfile(pkg_path):
        print(f"ERROR: Can't find {pkg_path}.")
        sys.exit(1)

    with open(pkg_path, "r", encoding="utf-8") as f:
        package_data = json.load(f)

    scripts = package_data.get("scripts", {})
    scripts["predeploy"] = "npm run build"
    scripts["deploy"] = "gh-pages -d dist"
    package_data["scripts"] = scripts

    with open(pkg_path, "w", encoding="utf-8") as f:
        json.dump(package_data, f, indent=2)

    print("Updated website/package.json with predeploy & deploy scripts")

    print("===================================================")
    print(" Step 4: Initialize Git at the ROOT and force-push everything ")
    print("         so that 'data/' is included on main branch.")
    print("===================================================")

    # If not already a git repo, init
    if not os.path.isdir(".git"):
        run_cmd("git init")

    # Configure user (can change name/email)
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

    # Check if remote origin exists. If not, add it
    remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
    try:
        run_cmd("git remote get-url origin")
        print("Remote 'origin' already exists.")
    except RuntimeError:
        print("No remote origin found; adding now...")
        run_cmd(f"git remote add origin {remote_url}")

    # Add everything at ROOT (includes data/, website/, etc.)
    run_cmd("git add .")
    run_cmd('git commit -m "Deploy setup (root-level)" || true')  
    run_cmd("git branch -M main || true")

    # FORCE push to overwrite the remote if needed
    print("Force-pushing to main branch on GitHub...")
    run_cmd("git push -u origin main --force")

    print("===================================================")
    print(" Step 5: Deploy using 'npm run deploy --prefix website'")
    print("         This builds site & pushes dist/ to gh-pages.")
    print("===================================================")
    run_cmd("npm run deploy --prefix website")

    print("===================================================")
    print(" ALL DONE!")
    print("===================================================")
    print(f"Your code (including data/) is now on GitHub main branch.")
    print(f"Your built website is on gh-pages at:")
    print(f"  https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/")
    print("Enable Pages on the gh-pages branch if needed.")
    print("Check query param, e.g.:")
    print(f"  https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/?site_id=1stcallplumbing")


if __name__ == "__main__":
    main()
