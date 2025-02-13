#!/usr/bin/env python3

import os
import sys
import subprocess

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

def run_cmd(cmd):
    """Run shell commands with real-time output, raise error if exit code != 0."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def remove_website_git():
    """Remove .git folder in website/ so there's only one git repo at the root."""
    website_git = os.path.join("website", ".git")
    if os.path.isdir(website_git):
        print(f"Removing {website_git} so we only have one .git at root.")
        run_cmd(f"rm -rf {website_git}")
    else:
        print("No .git folder in 'website/' to remove.")

def fix_gitignore():
    """Remove lines ignoring data/ or *.json from .gitignore if it exists."""
    gitignore_path = ".gitignore"
    if not os.path.isfile(gitignore_path):
        print("No .gitignore found at root; skipping fix.")
        return

    with open(gitignore_path, "r") as f:
        lines = f.readlines()

    new_lines = []
    removed_lines = []
    for line in lines:
        strip_line = line.strip().lower()
        if "data/" in strip_line or "*.json" in strip_line:
            removed_lines.append(strip_line)
        else:
            new_lines.append(line)

    if removed_lines:
        print("Removed these lines from .gitignore:")
        for r in removed_lines:
            print(f"  {r}")
        with open(gitignore_path, "w") as f:
            f.writelines(new_lines)
    else:
        print("No lines ignoring data/ or *.json found in .gitignore.")

def git_init_and_push():
    """Initialize root git (if needed), set remote, force-push changes to main."""
    if not os.path.isdir(".git"):
        run_cmd("git init")
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

    if GITHUB_TOKEN:
        remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
        run_cmd("git remote remove origin || true")  # remove old origin if any
        run_cmd(f"git remote add origin {remote_url}")
    else:
        print("No GITHUB_TOKEN in environment. You may be prompted for credentials on push.")

    run_cmd("git add .")
    run_cmd('git commit -m "Install fontawesome-free & push" || true')
    run_cmd("git branch -M main || true")
    # Force-push to main
    run_cmd("git push -u origin main --force")

def main():
    print("Step 1: Remove .git in website/")
    remove_website_git()

    print("Step 2: Fix .gitignore for data/ and *.json")
    fix_gitignore()

    print("Step 3: Install @fortawesome/fontawesome-free in website/")
    run_cmd("npm install --save @fortawesome/fontawesome-free --prefix website")

    print("Step 4: Commit & push everything to main (GitHub).")
    git_init_and_push()

    print("\n==================== DONE ====================")
    print("1) `@fortawesome/fontawesome-free` is installed in website/package.json.")
    print("2) Your changes are force-pushed to GitHub.")
    print("3) If Vercel is connected to your GitHub repo, it will auto-build now.")
    print("4) Check the Vercel dashboard for the new deployment logs.")
    print("5) If you see a successful build, visit your https://<project>.vercel.app or custom domain.")


if __name__ == "__main__":
    main()
