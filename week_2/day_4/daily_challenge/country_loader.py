import requests
import random
import psycopg2
import sys
from db_config import DB_CONFIG  # Assumes db_config.py is in the same directory

# The base URL for fetching all countries
API_URL = "https://restcountries.com/v3.1/all"

def fetch_10_random_countries():
    """
    Fetches all countries from the API, randomly selects 10, and extracts
    the required attributes: name, capital, flag, subregion, population.
    """
    print("🌍 Fetching all country data from the REST Countries API...")
    
    try:
        # Fetch data from the API
        response = requests.get(API_URL)
        response.raise_for_status() # Raises an HTTPError for bad responses (4xx or 5xx)
        all_countries = response.json()
        
        # Check if we received enough data
        if len(all_countries) < 10:
            print("Error: API returned fewer than 10 countries. Exiting.")
            return []
        
        # Randomly select 10 countries
        random_countries = random.sample(all_countries, 10)
        print(f"✅ Successfully selected 10 random countries.")
        
        # Process and extract required attributes
        extracted_data = []
        for country in random_countries:
            # Safely extract data, handling missing fields using .get()
            name = country.get('name', {}).get('common', 'N/A')
            
            # Capital is an array, we take the first element (or None)
            capital = country.get('capital', [None])[0] 
            
            # Flag URL (using 'png' format)
            flag_url = country.get('flags', {}).get('png') 
            
            subregion = country.get('subregion')
            population = country.get('population')
            
            # Compile the data as a dictionary for psycopg2.extras.execute_batch (executemany in this case)
            extracted_data.append({
                'name': name,
                'capital': capital,
                'flag_url': flag_url,
                'subregion': subregion,
                'population': population if population else 0 # Default to 0 if population is missing
            })
        
        return extracted_data
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching data from API: {e}")
        return []

def insert_countries_to_db(countries_data):
    """
    Connects to the database and inserts the list of country dictionaries.
    Uses ON CONFLICT DO NOTHING to safely handle re-runs without erroring on unique constraints.
    """
    if not countries_data:
        print("No valid country data to insert. Skipping database connection.")
        return

    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        insert_sql = """
            INSERT INTO Countries (name, capital, flag_url, subregion, population)
            VALUES (%(name)s, %(capital)s, %(flag_url)s, %(subregion)s, %(population)s)
            ON CONFLICT (name) DO NOTHING; -- Prevents errors if the script is run multiple times
        """
        
        # Use executemany for efficient bulk insertion
        cursor.executemany(insert_sql, countries_data)
        
        conn.commit()
        print(f"✅ Successfully processed {len(countries_data)} records.")
        print(f"   {cursor.rowcount} new country records were inserted (or skipped due to conflict).")

    except psycopg2.Error as e:
        print(f"❌ Database error during insertion: {e}")
        if conn: conn.rollback()
    finally:
        if conn: conn.close()
        

if __name__ == '__main__':
    # 1. Fetch the data
    country_records = fetch_10_random_countries()
    
    # 2. Insert the data into the database
    insert_countries_to_db(country_records)

    # 3. Verify the insertion (Optional check)
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM Countries;")
        count = cursor.fetchone()[0]
        print(f"\n📊 Total records in Countries table: {count}")
    except psycopg2.Error as e:
        print(f"❌ Verification error: {e}")
    finally:
        if 'conn' in locals() and conn: conn.close()