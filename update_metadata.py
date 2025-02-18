
import json
import csv
from datetime import datetime

# Load current metadata
with open('data/processed/metadata.json', 'r') as f:
    metadata = json.load(f)

# Read CSV file
with open('ARK Plumber Mobile - Review Text.csv', 'r') as f:
    csv_reader = csv.DictReader(f)
    # Create lookup dict of site_id -> owner name
    owner_lookup = {}
    for row in csv_reader:
        site_id = row.get('Website Link', '').split('site_id=')[-1].strip()
        owner_name = row.get('Owner Name', '').strip()
        if site_id and owner_name:
            owner_lookup[site_id] = owner_name

# Update businesses in metadata
for site_id, business in metadata['businesses'].items():
    if site_id in owner_lookup:
        business['owner_name'] = owner_lookup[site_id]
        # Also update phone number if available
        if site_id in owner_lookup and 'phone' not in business:
            business['phone'] = owner_lookup[site_id]['phone']
    else:
        business['owner_name'] = ''

# Update last_updated timestamp
metadata['last_updated'] = datetime.now().isoformat()

# Save updated metadata
with open('data/processed/metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)
