
#!/bin/bash

# Add all changes
git add .

# Commit changes with timestamp
git commit -m "Update $(date '+%Y-%m-%d %H:%M:%S')"

# Push to main branch
git push origin main
