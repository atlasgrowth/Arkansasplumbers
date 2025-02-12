import json
import requests
import os
import glob

def get_five_star_reviews(business_data):
    """Fetch reviews from Apify and filter for 5-star reviews"""
    api_url = "https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items"
    params = {
        "token": "apify_api_o7mYRW8cyWa4FtBMQFfhu8rBpfWqVb1AnFwN"
    }

    place_id = business_data['ids']['place_id']
    business_name = business_data['basic_info']['name']

    payload = {
        "placeIds": [place_id],
        "maxReviews": 100
    }

    print(f"\nProcessing business: {business_name}")
    print(f"Site ID: {business_data['ids']['site_id']}")
    print(f"Place ID: {place_id}")

    try:
        print("Fetching reviews from Apify...")
        response = requests.post(api_url, params=params, json=payload)
        reviews = response.json()
        print(f"Received {len(reviews)} total reviews")

        # Filter for 5-star reviews
        five_star_reviews = []
        for review in reviews:
            stars = review.get('stars', 0)

            if stars == 5:
                # Try to get reviewer name from different possible fields
                reviewer_name = (review.get('name') or 
                               review.get('author_name') or 
                               review.get('author') or 
                               'Anonymous')

                review_data = {
                    'text': review.get('text', ''),
                    'reviewer_name': reviewer_name,
                    'date': review.get('publishedAtDate', '')
                }
                five_star_reviews.append(review_data)

        return five_star_reviews

    except Exception as e:
        print(f"Error fetching reviews: {str(e)}")
        return []

def update_business_file(business_data, five_star_reviews):
    """Update the business file with five star reviews"""
    try:
        # Add five star reviews to the business data
        business_data['five_star_reviews'] = five_star_reviews

        # Write back to the file using site_id
        business_name = business_data['basic_info']['name']
        site_id = business_data['ids']['site_id']

        file_path = f"data/processed/businesses/{site_id}.json"
        with open(file_path, 'w') as f:
            json.dump(business_data, f, indent=2)

        print(f"\nUpdated {business_name}")
        print(f"- Added {len(five_star_reviews)} five-star reviews")
        print(f"- File: {file_path}")

        # Print first review as example
        if five_star_reviews:
            print("Example review:")
            print(f"- From: {five_star_reviews[0]['reviewer_name']}")
            print(f"- Text: {five_star_reviews[0]['text'][:100]}...")

    except Exception as e:
        print(f"Error updating business file: {str(e)}")

def process_all_businesses():
    """Process all business files in the directory"""
    base_path = "data/processed/businesses"

    # Get all JSON files
    business_files = glob.glob(f"{base_path}/*.json")
    total_businesses = len(business_files)

    print(f"Found {total_businesses} businesses to process")

    # Track progress
    processed = 0
    successful = 0
    failed = 0

    for file_path in business_files:
        try:
            with open(file_path, 'r') as f:
                business_data = json.load(f)

            # Get and update reviews
            five_star_reviews = get_five_star_reviews(business_data)
            update_business_file(business_data, five_star_reviews)

            successful += 1

        except Exception as e:
            failed += 1
            print(f"Error processing {file_path}: {str(e)}")
            continue

        processed += 1
        # Show progress
        print(f"\nProgress: {processed}/{total_businesses} businesses processed")
        print(f"Success: {successful}, Failed: {failed}")

def main():
    print("Starting five-star review collection for all businesses...")

    process_all_businesses()

    print("\nProcess complete!")

if __name__ == "__main__":
    main()
    