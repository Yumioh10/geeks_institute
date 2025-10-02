import requests
import random
import psycopg2
from psycopg2 import OperationalError, errorcodes, errors

# --- PostgreSQL Configuration (Update with your actual credentials) ---
DB_CONFIG = {
    'dbname': 'countries_db',
    'user': 'postgres',
    'password': 'Pass.postgresql', # Ensure this is secure or uses environment variables in production
    'host': 'localhost',
    'port': '5432'
}

def fetch_countries():
    """Fetches country data from the Restcountries API."""
    url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"
    try:
        response = requests.get(url, timeout=10)
        # Raise an HTTPError for bad responses (4xx or 5xx)
        response.raise_for_status() 
        print(f"API status: {response.status_code}")
        # Return the parsed JSON data
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching countries from API: {e}")
        return []

# ----------------------------------------------------------------------

def create_table_if_not_exists(cursor):
    """Creates the 'countries' table if it does not already exist."""
    create_table_query = """
    CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        capital VARCHAR(255),
        flag TEXT,
        subregion VARCHAR(255),
        population BIGINT
    );
    """
    try:
        cursor.execute(create_table_query)
        print("Table 'countries' ensured to exist.")
    except Exception as e:
        print(f"Error creating table: {e}")
        raise # Re-raise to stop execution if table creation fails

# ----------------------------------------------------------------------

def save_countries_to_db(countries_data):
    """Connects to PostgreSQL and saves country data."""
    if not countries_data:
        print("No country data to save.")
        return

    try:
        # Use a 'with' statement for automatic connection handling
        with psycopg2.connect(**DB_CONFIG) as conn:
            # Use a 'with' statement for automatic cursor handling
            with conn.cursor() as cursor:
                # 1. Ensure the table is created
                create_table_if_not_exists(cursor)
                
                insert_count = 0
                for country in countries_data:
                    # Safely extract and format data
                    name = country.get('name', {}).get('common', 'Unknown')
                    # capital is a list, so we take the first element or default to 'Unknown'
                    capital = country.get('capital', ['Unknown'])[0] 
                    flag = country.get('flags', {}).get('png', '')
                    subregion = country.get('subregion', 'Unknown')
                    # Ensure population is an integer
                    population = int(country.get('population', 0)) 
                    
                    try:
                        # 2. Execute the INSERT query
                        insert_query = """
                        INSERT INTO countries (name, capital, flag, subregion, population) 
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT (name) DO NOTHING;
                        """
                        cursor.execute(insert_query, (name, capital, flag, subregion, population))
                        # Only count inserts that succeed (ON CONFLICT DO NOTHING skips existing ones)
                        if cursor.rowcount > 0:
                            insert_count += 1
                            
                    except (errors.UniqueViolation, errors.IntegrityError) as e:
                        # Catch specific errors like duplicate keys if ON CONFLICT wasn't used
                        print(f"Skipping {name}: Data integrity error ({e})")
                    except Exception as e:
                        print(f"An error occurred inserting {name}: {e}")
                
                # Commit the transaction after all inserts
                conn.commit() 
                print(f"{insert_count} new countries have been saved in the database.")
                
    except OperationalError as e:
        # Catch connection-related errors
        print(f"Database connection error: {e}")
        print("Please check your DB_CONFIG (host, port, name, user, password) and ensure PostgreSQL is running.")
    except Exception as e:
        print(f"An unexpected error occurred during database operation: {e}")
        
# ----------------------------------------------------------------------

def main():
    """Main function to orchestrate data fetching and saving."""
    all_countries = fetch_countries()
    
    if not all_countries:
        print("Exiting: No country data available.")
        return

    # Check if there are at least 10 countries to sample
    sample_size = min(len(all_countries), 10) 
    
    # 1. Randomly sample 10 countries (or fewer if total is < 10)
    random_countries = random.sample(all_countries, sample_size)
    print(f"Attempting to save {sample_size} countries.")
    
    # 2. Save the sampled countries to the database
    save_countries_to_db(random_countries)

# ----------------------------------------------------------------------

if __name__ == "__main__":
    main()