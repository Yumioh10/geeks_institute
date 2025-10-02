# 4. In the file menu_manager.py, create a new class called MenuManager
import psycopg2
from db_config import DB_CONFIG
from menu_item import MenuItem

class MenuManager:
    """Manages menu interactions with the database."""
# 4.1. Create a Class Method called get_by_name that will return a single item from the Menu_Items table depending on it’s name, if an object is not found (there is no item matching the name in the get_by_name method) return None
    @classmethod
    def get_by_name(cls, item_name):
        """Returns a single MenuItem object matching the item_name, or None."""
        conn = None
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()
            
            sql = "SELECT item_name, item_price FROM Menu_Items WHERE item_name = %s"
            cursor.execute(sql, (item_name,))
            
            record = cursor.fetchone()
            
            if record:
                # record is (item_name, item_price)
                return MenuItem(record[0], record[1])
            else:
                return None

        except psycopg2.Error as e:
            print(f"❌ Database error in get_by_name: {e}")
            return None
        finally:
            if conn: conn.close()
# 4.2. Create a Class Method called all_items which will return a list of all the items from the Menu_Items table.
    @classmethod
    def all_items(cls):
        """Returns a list of all MenuItem objects from the Menu_Items table."""
        conn = None
        items_list = []
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()
            
            sql = "SELECT item_name, item_price FROM Menu_Items ORDER BY item_name"
            cursor.execute(sql)
            
            records = cursor.fetchall()
            
            for record in records:
                # record is (item_name, item_price)
                items_list.append(MenuItem(record[0], record[1]))
                
            return items_list

        except psycopg2.Error as e:
            print(f"❌ Database error in all_items: {e}")
            return []
        finally:
            if conn: conn.close()

# Testing 
# Run this block in menu_manager.py or a separate test file

print("--- Testing MenuItem functionality (save, update, delete) ---")
item = MenuItem('Burger', 35)
item.save()

item_to_update = MenuItem('Tuna Sandwich', 40)
item_to_update.save()

# Update the item's name and price
item_to_update.update('Veggie Burger', 37) 
# The item instance has now changed internally and in the database

# Save another item for testing get_by_name and all_items
MenuItem('Beef Stew', 65).save()


print("\n--- Testing MenuManager functionality (get_by_name) ---")
# Test Case 1: Item is found
item2 = MenuManager.get_by_name('Beef Stew')
print(f"Found Item 2: {item2}")
# Test Case 2: Item not found
item3 = MenuManager.get_by_name('Not Here')
print(f"Found Item 3: {item3}")


print("\n--- Testing MenuManager functionality (all_items) ---")
items = MenuManager.all_items()
print("All Menu Items:")
for i in items:
    print(f" - {i}")

    
print("\n--- Testing Delete functionality ---")
item.delete() # Deleting the original 'Burger' now that it's done its job

print("\n--- Menu After Delete ---")
items_after_delete = MenuManager.all_items()
print("All Menu Items:")
for i in items_after_delete:
    print(f" - {i}")