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

# Updated Reviews.jsx code
REVIEWS_JSX = r'''import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = ({ business, loading }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = business?.five_star_reviews || [];
  const reviewsLink = business?.basic_info?.reviews_link || '';

  useEffect(() => {
    if (!reviews.length) return;
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading || !reviews.length) return null;

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-overlay"></div>
      <div className="reviews-container">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <div className="reviews-slider">
          <div className="review-card" key={currentReview}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">{reviews[currentReview].text}</p>
            <div className="review-author">- {reviews[currentReview].reviewer_name}</div>
            <div className="review-date">
              {new Date(reviews[currentReview].date).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="review-dots">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(index)}
              aria-label={`Review ${index + 1}`}
            />
          ))}
        </div>
        {reviewsLink && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="review-button"
            >
              Read Our Reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
'''

# Updated Footer.jsx code
FOOTER_JSX = r'''import React from 'react';
import './Footer.css';

const Footer = ({ business }) => {
  const { name = '', phone = '', latitude, longitude } = business?.basic_info || {};
  const currentYear = new Date().getFullYear();

  // If we have lat/long, build a no-API-key embed URL
  const mapSrc = latitude && longitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : '';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{name || 'Professional Plumbing Services'}</h3>
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="footer-phone"
            >
              <i className="fas fa-phone"></i> {phone}
            </a>
          )}
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-section">
          <h4>Available 24/7</h4>
          <p>Emergency Plumbing Services</p>
          <p>Professional & Reliable</p>
        </div>
        {mapSrc && (
          <div className="footer-section">
            <h4>Our Location</h4>
            <iframe
              src={mapSrc}
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} {name || 'Professional Plumbing'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
'''

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
    # Remove old origin if any, then add with token
    run_cmd("git remote remove origin || true")
    run_cmd(f"git remote add origin {remote_url}")

def add_commit_push_root():
    """Add all files at root, forcibly add data/ if needed, push to main (force)."""
    run_cmd("git add .")
    run_cmd("git add data/ -f")
    run_cmd('git commit -m "Deploy everything with data + updated code" || true')
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

def write_updated_code():
    """Write new code to Reviews.jsx and Footer.jsx."""
    reviews_path = os.path.join("website", "src", "components", "Reviews", "Reviews.jsx")
    footer_path = os.path.join("website", "src", "components", "Footer", "Footer.jsx")

    # Ensure directories exist
    os.makedirs(os.path.dirname(reviews_path), exist_ok=True)
    os.makedirs(os.path.dirname(footer_path), exist_ok=True)

    print(f"Writing updated Reviews.jsx to {reviews_path}")
    with open(reviews_path, "w", encoding="utf-8") as f:
        f.write(REVIEWS_JSX)

    print(f"Writing updated Footer.jsx to {footer_path}")
    with open(footer_path, "w", encoding="utf-8") as f:
        f.write(FOOTER_JSX)

def main():
    print("===================================================")
    print("STEP A: Write updated Reviews.jsx and Footer.jsx")
    print("===================================================")
    write_updated_code()

    print("===================================================")
    print("STEP B: Remove .git in website/ (if any)")
    print("===================================================")
    remove_website_git()

    print("===================================================")
    print("STEP C: Fix .gitignore to allow data/ and *.json")
    print("===================================================")
    fix_gitignore()

    print("===================================================")
    print("STEP D: Initialize Git at root, set user, remote")
    print("===================================================")
    init_git_root()
    set_remote()

    print("===================================================")
    print("STEP E: Add, commit, force-push all root files (incl. data/)")
    print("===================================================")
    add_commit_push_root()

    print("===================================================")
    print("STEP F: Install and deploy from 'website/' to gh-pages")
    print("===================================================")
    setup_and_deploy_website()

    print("===================================================")
    print("ALL DONE!")
    print("===================================================")
    print("Files are updated, data folder is included, and your site is deployed.")
    print(f"Check main branch at: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}")
    print(f"Check live site at: https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/")
    print("Try a query param like: ?site_id=1stcallplumbing")


if __name__ == "__main__":
    main()
