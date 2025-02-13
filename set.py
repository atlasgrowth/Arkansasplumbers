#!/usr/bin/env python3

import os
import sys
import subprocess
import json

GITHUB_USERNAME = "greekfreek23"
REPO_NAME = "Arkansasplumbers"

# Read your GitHub token from Replit secrets
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("ERROR: GITHUB_TOKEN environment variable not set!")
    sys.exit(1)

# --------------------- Updated Reviews.jsx ---------------------
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

        {/* "Read Our Reviews" Button */}
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

# --------------------- Updated Reviews.css ---------------------
REVIEWS_CSS = r'''.reviews-section {
  position: relative;
  min-height: 400px;
  padding: 4rem 2rem;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  overflow: hidden;
}

.reviews-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.reviews-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  color: white;
}

.reviews-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: white;
}

.reviews-slider {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.review-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.review-stars {
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.review-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.review-author {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.9rem;
  opacity: 0.8;
}

.review-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background: white;
}

/* The "Read Our Reviews" button */
.review-button {
  display: inline-block;
  background-color: #facc15; /* nice gold color */
  color: #333;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.review-button:hover {
  background-color: #eab308;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 3rem 1rem;
  }

  .review-card {
    padding: 1.5rem;
  }

  .review-text {
    font-size: 1rem;
  }
}
'''

# --------------------- Updated Footer.jsx ---------------------
FOOTER_JSX = r'''import React from 'react';
import './Footer.css';

const Footer = ({ business }) => {
  const { name = '', phone = '', latitude, longitude } = business?.basic_info || {};
  const currentYear = new Date().getFullYear();

  // Build map iframe URL. If it's slow, removing "loading=lazy" won't really speed up Google loads.
  const mapSrc = latitude && longitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : '';

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Put Map at TOP of the footer */}
        {mapSrc && (
          <div className="footer-section map-section">
            <h4>Our Location</h4>
            <iframe
              src={mapSrc}
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              /* remove loading="lazy" if you want immediate load */
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        )}
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

# --------------------- Updated Footer.css ---------------------
FOOTER_CSS = r'''.footer {
  background: #0f172a;
  color: #fff;
  padding-top: 60px;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}
.footer-section h3 {
  color: #60a5fa;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.footer-section h4 {
  color: #94a3b8;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.footer-phone {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  transition: color 0.3s ease;
}
.footer-phone:hover {
  color: #60a5fa;
}
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-nav a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-nav a:hover {
  color: #60a5fa;
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  text-align: center;
  color: #94a3b8;
}
.map-section iframe {
  margin-top: 10px;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer-phone {
    justify-content: center;
  }
  .footer-nav {
    align-items: center;
  }
}
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

    with open(gitignore_path, "r") as f:
        lines = f.readlines()

    new_lines = []
    removed_lines = []
    for line in lines:
        line_strip = line.strip().lower()
        # if 'data/' or '*.json' are in line
        if 'data/' in line_strip or '*.json' in line_strip:
            removed_lines.append(line_strip)
        else:
            new_lines.append(line)

    if removed_lines:
        print("Removed these lines from .gitignore:")
        for r in removed_lines:
            print("  ", r)
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
    # remove old origin if any, add new
    run_cmd("git remote remove origin || true")
    run_cmd(f"git remote add origin {remote_url}")

def add_commit_push_root():
    """Add all files at root, forcibly add data/, commit, push to main (force)."""
    run_cmd("git add .")
    run_cmd("git add data/ -f")
    run_cmd('git commit -m "Deploy: updated Reviews, Footer, and data" || true')
    run_cmd("git branch -M main || true")
    run_cmd("git push -u origin main --force")

def setup_and_deploy_website():
    """Install deps in website/, add predeploy/deploy scripts, run npm run deploy."""
    run_cmd("npm install --prefix website")
    run_cmd("npm install --save-dev gh-pages --prefix website")

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

    run_cmd("npm run deploy --prefix website")

def write_updated_files():
    """Write updated code to Reviews.jsx, Reviews.css, Footer.jsx, and Footer.css."""
    reviews_jsx_path = os.path.join("website", "src", "components", "Reviews", "Reviews.jsx")
    reviews_css_path = os.path.join("website", "src", "components", "Reviews", "Reviews.css")
    footer_jsx_path  = os.path.join("website", "src", "components", "Footer", "Footer.jsx")
    footer_css_path  = os.path.join("website", "src", "components", "Footer", "Footer.css")

    # Make directories if not exist
    os.makedirs(os.path.dirname(reviews_jsx_path), exist_ok=True)
    os.makedirs(os.path.dirname(reviews_css_path), exist_ok=True)
    os.makedirs(os.path.dirname(footer_jsx_path), exist_ok=True)
    os.makedirs(os.path.dirname(footer_css_path), exist_ok=True)

    print(f"Writing new Reviews.jsx -> {reviews_jsx_path}")
    with open(reviews_jsx_path, "w", encoding="utf-8") as f:
        f.write(REVIEWS_JSX)

    print(f"Writing new Reviews.css -> {reviews_css_path}")
    with open(reviews_css_path, "w", encoding="utf-8") as f:
        f.write(REVIEWS_CSS)

    print(f"Writing new Footer.jsx -> {footer_jsx_path}")
    with open(footer_jsx_path, "w", encoding="utf-8") as f:
        f.write(FOOTER_JSX)

    print(f"Writing new Footer.css -> {footer_css_path}")
    with open(footer_css_path, "w", encoding="utf-8") as f:
        f.write(FOOTER_CSS)

def main():
    print("===================================================")
    print("STEP 1: Write updated Reviews/Footer files")
    print("===================================================")
    write_updated_files()

    print("===================================================")
    print("STEP 2: Remove .git in website/ if present")
    print("===================================================")
    remove_website_git()

    print("===================================================")
    print("STEP 3: Fix .gitignore to allow data/*.json")
    print("===================================================")
    fix_gitignore()

    print("===================================================")
    print("STEP 4: Init Git at root, set user, remote")
    print("===================================================")
    init_git_root()
    set_remote()

    print("===================================================")
    print("STEP 5: Add/commit/push everything (force) to main")
    print("===================================================")
    add_commit_push_root()

    print("===================================================")
    print("STEP 6: Deploy to gh-pages from website/")
    print("===================================================")
    setup_and_deploy_website()

    print("===================================================")
    print("ALL DONE!")
    print("===================================================")
    print(f"Check your code at: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}")
    print(f"Live site at: https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/")
    print("Short URL options:\n"
          "1) Use a custom domain with GitHub Pages\n"
          "2) Use a link shortener like bit.ly\n"
          "3) Deploy to Vercel/Netlify for a shorter subdomain")
    print("Example query param test:\n"
          f"  https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/?site_id=1stcallplumbing")

if __name__ == "__main__":
    main()
