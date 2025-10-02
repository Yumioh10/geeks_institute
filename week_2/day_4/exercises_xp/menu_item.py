import psycopg2
from db_config import DB_CONFIG

# 2. In the file menu_item.py, create a new class called MenuItem, the attributes should be the name and price of each item.

class MenuItem:
    def __init__(self, item_name, item_price):
        self.item_name = item_name
        self.item_price = item_price

    def __repr__(self):
        return f"MenuItem(name={self.item_name}, price={self.item_price})"
    
    # 3. Create several methods (save, delete, update) these methods will allow a user to save, delete and update items from the Menu_Items table. The update method can update the name as well as the price of an item.
    def save(self):
        """Saves the current MenuItem instance to the Menu_Items table."""
        conn = None
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()
            
            sql = """
                INSERT INTO Menu_Items (item_name, item_price) 
                VALUES (%s, %s)
                RETURNING item_id;
            """
            cursor.execute(sql, (self.item_name, self.item_price))
            
            # Retrieve the auto-generated item_id and optionally store it on the instance
            self.item_id = cursor.fetchone()[0] 
            
            conn.commit()
            print(f"✅ Saved '{self.item_name}' with ID: {self.item_id}")

        except psycopg2.Error as e:
            print(f"❌ Database error during save: {e}")
            if conn: conn.rollback()
        finally:
            if conn: conn.close()

    def delete(self):
        """Deletes the MenuItem from the database using its name as a key."""
        conn = None
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()
            
            sql = "DELETE FROM Menu_Items WHERE item_name = %s RETURNING item_id;"
            cursor.execute(sql, (self.item_name,))
            
            if cursor.rowcount > 0:
                deleted_id = cursor.fetchone()[0]
                conn.commit()
                print(f"🗑️ Deleted '{self.item_name}' (ID: {deleted_id}) successfully.")
            else:
                print(f"⚠️ Item '{self.item_name}' not found for deletion.")

        except psycopg2.Error as e:
            print(f"❌ Database error during delete: {e}")
            if conn: conn.rollback()
        finally:
            if conn: conn.close()
            
    def update(self, new_name=None, new_price=None):
        """
        Updates the item_name and/or item_price of the item 
        in the database, then updates the instance attributes.
        """
        conn = None
        current_name = self.item_name
        
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cursor = conn.cursor()

            # Determine which fields to update
            updates = []
            params = []
            
            if new_name is not None:
                updates.append("item_name = %s")
                params.append(new_name)
            
            if new_price is not None:
                updates.append("item_price = %s")
                params.append(new_price)
                
            if not updates:
                print("⚠️ No updates requested.")
                return

            # Build the SQL query
            sql = f"""
                UPDATE Menu_Items 
                SET {', '.join(updates)}
                WHERE item_name = %s
            """
            params.append(current_name)
            
            cursor.execute(sql, tuple(params))
            
            if cursor.rowcount > 0:
                conn.commit()
                
                # Update the instance attributes after successful DB commit
                if new_name is not None:
                    self.item_name = new_name
                if new_price is not None:
                    self.item_price = new_price
                    
                print(f"🔄 Updated item originally named '{current_name}'. New state: {self}")
            else:
                print(f"⚠️ Item '{current_name}' not found for update.")

        except psycopg2.Error as e:
            print(f"❌ Database error during update: {e}")
            if conn: conn.rollback()
        finally:
            if conn: conn.close()