#!/usr/bin/env python3

import os
import sys
import subprocess

# CONFIG: Adjust to match your repo's info
GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"
# The path to your dev index.html (within the 'website/' folder)
INDEX_HTML_PATH = "website/index.html"

# 1) If your actual index.html is in 'website/public/index.html' or some other location,
#    adjust the path accordingly.


def run_cmd(cmd):
    """Run shell command with real-time output. Raise error on non-zero exit code."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def remove_dev_script():
    """Remove the dev script tag referencing './src/index.jsx' from index.html, if present."""
    if not os.path.isfile(INDEX_HTML_PATH):
        print(f"WARNING: {INDEX_HTML_PATH} not found. Skipping script removal.")
        return

    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    new_lines = []
    removed_any = False

    for line in lines:
        # Check if this line references 'src/index.jsx'
        if 'script type="module" src="./src/index.jsx"' in line.replace(" ", ""):
            removed_any = True
            continue  # skip this line
        new_lines.append(line)

    if removed_any:
        with open(INDEX_HTML_PATH, "w", encoding="utf-8") as f:
            f.writelines(new_lines)
        print(f"Removed dev script from {INDEX_HTML_PATH}.")
    else:
        print(f"No dev script reference found in {INDEX_HTML_PATH}. No changes made.")

def git_push_changes():
    """Initialize git (if needed), set remote with token, commit & force-push to main."""
    # 1) Check if .git exists
    if not os.path.isdir(".git"):
        run_cmd("git init")

    # 2) Configure user
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

    # 3) Set up remote with token, if available
    github_token = os.environ.get("GITHUB_TOKEN")
    if github_token:
        remote_url = f"https://{github_token}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
        run_cmd("git remote remove origin || true")
        run_cmd(f"git remote add origin {remote_url}")
    else:
        print("WARNING: GITHUB_TOKEN not set. You may be prompted for GitHub credentials on push.")

    # 4) Commit & push changes
    run_cmd("git add .")
    run_cmd('git commit -m "Remove dev script from index.html" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def main():
    print(f"STEP 1: Removing dev script from {INDEX_HTML_PATH} if present.")
    remove_dev_script()

    print("STEP 2: Commit and push all changes to GitHub (main branch).")
    git_push_changes()

    print("\nDONE! Check your GitHub repo for updated index.html.")
    print("If you're using Vercel with GitHub integration, a new build may trigger automatically.")

if __name__ == "__main__":
    main()
