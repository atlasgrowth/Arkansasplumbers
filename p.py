import subprocess
import os

def fix_vite_config():
    """
    - Removes the duplicate outDir key in vite.config.js (within /website/).
    - Adds the missing host(s) to server.allowedHosts.
    """
    vite_config_path = os.path.join('website', 'vite.config.js')
    BLOCKED_DOMAINS = [
        # Add any other blocked domains you get error messages for
        "46b8f2d5-dcde-4b70-947b-1bb00faec0c2-00-3fhc9brd2jukf.worf.replit.dev"
    ]

    if not os.path.isfile(vite_config_path):
        print(f"Could not find {vite_config_path}. Check your folder structure.")
        return

    with open(vite_config_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove duplicate outDir key:  outDir: 'dist',outDir: 'dist'
    content = content.replace("outDir: 'dist',outDir: 'dist'", "outDir: 'dist'")

    # 2. Insert missing hosts into server.allowedHosts if not already present
    for domain in BLOCKED_DOMAINS:
        if domain not in content:
            # Find "allowedHosts: [" and insert domain before the closing bracket
            idx = content.find("allowedHosts: [")
            if idx != -1:
                bracket_end = content.find("]", idx)
                if bracket_end != -1:
                    # Insert the domain with a comma
                    content = (
                        content[:bracket_end] +
                        f", '{domain}'" +
                        content[bracket_end:]
                    )

    with open(vite_config_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✔ Fixed vite.config.js successfully.")


def main():
    # 1. Fix vite.config.js from root (so we stay consistent with file paths)
    fix_vite_config()

    # 2. Change directory into `website/` to run `npm install` and `npm run dev`
    os.chdir('website')

    # 3. Install dependencies
    print("Running npm install...")
    subprocess.run(["npm", "install"], check=True)

    # 4. Run dev server
    print("Starting dev server (npm run dev)...")
    subprocess.run(["npm", "run", "dev"], check=True)

if __name__ == "__main__":
    main()
