#!/usr/bin/env python3

import os
import sys
import subprocess
import json

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"

# If you have a GitHub token (e.g., in Replit secrets)
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

# The vercel.json for a Vite + React SPA in subfolder "website"
VERCEL_JSON = {
  "version": 2,
  "builds": [
    {
      # If your code + package.json is inside "website/"
      "src": "website/package.json",
      "use": "@vercel/static-build",
      "config": {
        # Where Vite outputs final build
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      # fallback route to index.html for single-page app
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}

def run_cmd(cmd):
    """Run shell command with real-time output, raises error if exit code != 0."""
    print(f"\n[CMD] {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed (exit code {result.returncode}): {cmd}")

def remove_website_git():
    """Remove .git folder in website/ so there's only 1 Git repo at root."""
    website_git = os.path.join("website", ".git")
    if os.path.isdir(website_git):
        print(f"Removing {website_git} to avoid multiple repos.")
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
        ll = line.strip().lower()
        if "data/" in ll or "*.json" in ll:
            removed_lines.append(ll)
        else:
            new_lines.append(line)

    if removed_lines:
        print("Removing lines from .gitignore that ignore data/*.json:")
        for r in removed_lines:
            print("  ", r)
        with open(gitignore_path, "w") as f:
            f.writelines(new_lines)
    else:
        print("No lines ignoring data/ or *.json found in .gitignore.")

def write_vercel_json():
    """Write vercel.json at the root to define the build & routes."""
    path = "vercel.json"
    print(f"Writing vercel.json -> {path}")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(VERCEL_JSON, f, indent=2)

def init_and_push():
    """Initialize git at root if needed, set remote, force-push all changes to main."""
    if not os.path.isdir(".git"):
        run_cmd("git init")

    run_cmd('git config user.name "Replit Deployer"')
    run_cmd('git config user.email "nicksanford2341@gmail.com"')

    if GITHUB_TOKEN:
        remote_url = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"
        run_cmd("git remote remove origin || true")
        run_cmd(f"git remote add origin {remote_url}")
    else:
        print("No GITHUB_TOKEN in environment. You may be prompted for credentials on push.")

    run_cmd("git add .")
    run_cmd('git commit -m "Add vercel.json for SPA fallback" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def main():
    print("STEP 1: Remove .git in website/ (optional housekeeping)")
    remove_website_git()

    print("STEP 2: Fix .gitignore (remove data/ *.json ignores)")
    fix_gitignore()

    print("STEP 3: Write vercel.json with fallback route for React SPA")
    write_vercel_json()

    print("STEP 4: Init Git at root (if needed), force-push to main")
    init_and_push()

    print("\n==== DONE ====")
    print("Vercel's GitHub integration should see the new commit & run a build.")
    print("Check your Vercel dashboard -> Deployments to see if the build passes.")
    print("Now direct URL visits won't 404, because /(.*) routes to /index.html.")
    print("If you see 'No Output Directory named public', confirm your build output is 'dist' or rename it in vite.config.js.\n")


if __name__ == "__main__":
    main()
