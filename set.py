#!/usr/bin/env python3

import os
import sys
import subprocess
import json

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"

# 1) Make sure you have a GitHub token in Replit secrets:
#    GITHUB_TOKEN=<your personal access token>
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("ERROR: GITHUB_TOKEN environment variable not set!")
    sys.exit(1)

def run_cmd(cmd):
    """Run a shell command with real-time output. Raises error on non-zero exit."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def remove_website_git():
    """Remove any .git folder inside website/ so we only track from root .git."""
    website_git = os.path.join("website", ".git")
    if os.path.isdir(website_git):
        print(f"Removing {website_git} to ensure single .git at root.")
        run_cmd(f"rm -rf {website_git}")
    else:
        print("No .git folder in website/ to remove.")

def fix_gitignore():
    """Remove lines ignoring data/ or *.json from .gitignore if it exists."""
    gitignore_path = ".gitignore"
    if not os.path.isfile(gitignore_path):
        print("No .gitignore found at root; skipping fix.")
        return

    # Read lines
    with open(gitignore_path, "r") as f:
        lines = f.readlines()

    # Filter out lines that contain 'data/' or '*.json'
    new_lines = []
    removed_lines = []
    for line in lines:
        line_strip = line.strip()
        if "data/" in line_strip or "*.json" in line_strip:
            removed_lines.append(line_strip)
        else:
            new_lines.append(line)

    if removed_lines:
        print("Removed these lines from .gitignore:")
        for r in removed_lines:
            print("  ", r)
        # Write back filtered lines
        with open(gitignore_path, "w") as f:
            f.writelines(new_lines)
    else:
        print("No lines ignoring data/ or *.json found in .gitignore.")

def init_git_root():
    """Initialize git at root if needed, configure user."""
    if not os.path.isdir(".git"):
        run_cmd("git init")
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

def set_remote():
    """Force remote origin to token-based URL."""
    remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
    # Overwrite origin remote
    # (If you want to skip overwriting if it exists, remove --set-url)
    run_cmd(f"git remote remove origin || true")  # remove old origin if any
    run_cmd(f"git remote add origin {remote_url}")

def add_commit_push_root():
    """Add all files at root, forcibly add data/ if needed, push to main (force)."""
    run_cmd("git add .")
    run_cmd("git add data/ -f")
    run_cmd('git commit -m "Deploy everything with data" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def setup_and_deploy_website():
    """Install deps in website/, add predeploy/deploy scripts, run npm run deploy."""
    # 1) npm install
    run_cmd("npm install --prefix website")
    # 2) npm install --save-dev gh-pages
    run_cmd("npm install --save-dev gh-pages --prefix website")
    # 3) Modify package.json
    pkg_path = os.path.join("website", "package.json")
    if not os.path.isfile(pkg_path):
        print("ERROR: No package.json in website/")
        sys.exit(1)

    with open(pkg_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    scripts = data.get("scripts", {})
    scripts["predeploy"] = "npm run build"
    scripts["deploy"] = "gh-pages -d dist"
    data["scripts"] = scripts

    with open(pkg_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Updated website/package.json with predeploy/deploy scripts")

    # 4) Deploy
    run_cmd("npm run deploy --prefix website")

def main():
    print("===================================================")
    print("STEP 1: Remove .git in website/ (if any)")
    print("===================================================")
    remove_website_git()

    print("===================================================")
    print("STEP 2: Fix .gitignore to allow data/ and *.json")
    print("===================================================")
    fix_gitignore()

    print("===================================================")
    print("STEP 3: Initialize Git at root, set user")
    print("===================================================")
    init_git_root()

    print("===================================================")
    print("STEP 4: Overwrite remote origin with token-based URL")
    print("===================================================")
    set_remote()

    print("===================================================")
    print("STEP 5: Add, commit, force-push all root files (incl. data/)")
    print("===================================================")
    add_commit_push_root()

    print("===================================================")
    print("STEP 6: Install and deploy from 'website/'")
    print("===================================================")
    setup_and_deploy_website()

    print("===================================================")
    print("ALL DONE!")
    print("===================================================")
    print("Your code (including data/) should be on main branch.")
    print(f"Check: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}")
    print("Your built site is on gh-pages branch. Check Pages:")
    print(f"  https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/")
    print("Try a param, e.g.:")
    print(f"  https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/?site_id=1stcallplumbing")

if __name__ == "__main__":
    main()
