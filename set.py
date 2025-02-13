#!/usr/bin/env python3

import os
import sys
import subprocess

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

def run_cmd(cmd):
    print(f"[CMD] {cmd}")
    r = subprocess.run(cmd, shell=True)
    if r.returncode != 0:
        raise RuntimeError(f"Command failed: {cmd}")

def remove_website_git():
    website_git = os.path.join("website", ".git")
    if os.path.isdir(website_git):
        print(f"Removing {website_git} ...")
        run_cmd(f"rm -rf {website_git}")

def fix_gitignore():
    p = ".gitignore"
    if not os.path.isfile(p):
        return
    with open(p, "r") as f:
        lines = f.readlines()
    new_lines = []
    for line in lines:
        ll = line.strip().lower()
        if "data/" in ll or "*.json" in ll:
            # remove it
            continue
        new_lines.append(line)
    with open(p, "w") as f:
        f.writelines(new_lines)

def switch_to_hash_router():
    """Example: replacing 'BrowserRouter' => 'HashRouter' in website/src/index.jsx."""
    index_path = "website/src/index.jsx"
    if not os.path.isfile(index_path):
        print(f"{index_path} not found; adjust script accordingly.")
        return
    with open(index_path, "r") as f:
        content = f.read()
    # naive replacement
    content = content.replace("BrowserRouter", "HashRouter")

    with open(index_path, "w") as f:
        f.write(content)
    print("Switched BrowserRouter -> HashRouter in website/src/index.jsx")

def git_push():
    if not os.path.isdir(".git"):
        run_cmd("git init")
    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')
    if GITHUB_TOKEN:
        remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
        run_cmd("git remote remove origin || true")
        run_cmd(f"git remote add origin {remote_url}")
    run_cmd("git add .")
    run_cmd('git commit -m "Switch to HashRouter" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def main():
    remove_website_git()
    fix_gitignore()
    switch_to_hash_router()
    git_push()
    print("\nDone. Vercel will auto-build. No more 404 on direct routes!")

if __name__ == "__main__":
    main()
