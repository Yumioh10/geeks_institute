# Part 2:
# 1.1 Create this function should display the program menu
# menu_editor.py

from menu_item import MenuItem
from menu_manager import MenuManager
import sys

def view_item():
    """
    Handles the 'View an Item' (V) option.
    Asks the user for an item name and displays its details if found.
    """
    print("\n--- VIEW ITEM ---")
    item_name = input("Enter the NAME of the item to view: ").strip()
    
    # Use the MenuManager class method to retrieve the item
    item = MenuManager.get_by_name(item_name)
    
    if item:
        print("\n🔎 Item Found:")
        print(f"Name: {item.item_name}")
        print(f"Price: ${item.item_price}")
    else:
        print(f"⚠️ Item '{item_name}' was NOT found on the menu.")


def show_user_menu():
    """
    1. Displays the program menu and handles user input until they choose to exit.
    """
    while True:
        print("\n=== Restaurant Menu Manager ===")
        print("View a specific Item (V)")
        print("Add a new Item (A)")
        print("Delete an Item (D)")
        print("Update an existing Item (U)")
        print("Show the Full Menu (S)")
        print("Exit Program (X)")
        print("===============================")
        
        choice = input("Enter your choice (V/A/D/U/S/X): ").upper()
        
        if choice == 'V':
            view_item() # <-- Now defined above!
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'X':
            # 6. Exit logic
            print("\nExiting the Menu Manager. Final Menu:")
            show_restaurant_menu()
            sys.exit(0)
        else:
            print("❌ Invalid choice. Please try again.")

def get_input_details():
    """Helper function to safely get item name and price."""
    item_name = input("Enter the item name: ").strip()
    
    while True:
        try:
            item_price = int(input("Enter the item price (integer): "))
            if item_price < 0:
                 print("Price cannot be negative.")
                 continue
            return item_name, item_price
        except ValueError:
            print("❌ Invalid price. Please enter a whole number.")

def add_item_to_menu():
    """
    2. Asks the user for item details, creates a MenuItem, and saves it.
    """
    print("\n--- ADD ITEM ---")
    item_name, item_price = get_input_details()

    item = MenuItem(item_name, item_price)
    item.save() 
    print("✅ Item was added successfully.") 

def remove_item_from_menu():
    """
    3. Asks the user for the item name to remove, creates a MenuItem, and deletes it.
    """
    print("\n--- DELETE ITEM ---")
    item_name_to_remove = input("Enter the NAME of the item to remove: ").strip()

    item = MenuItem(item_name_to_remove, 0)
    
    # We rely on MenuItem.delete() to print the status message (success/failure)
    try:
        item.delete() 
        print(f"✅ Item '{item_name_to_remove}' deletion process completed.")
    except Exception as e:
        print(f"❌ There was an error during the deletion process: {e}")


def update_item_from_menu():
    """
    4. Asks for the item to update, and the new details, then calls the update method.
    """
    print("\n--- UPDATE ITEM ---")
    old_name = input("Enter the CURRENT name of the item to update: ").strip()
    
    print("\n-- Enter NEW Details --")
    new_name, new_price = get_input_details()

    item = MenuItem(old_name, 0)
    
    item.update(new_name, new_price)

    # Since MenuItem.update() prints its success/failure, we add the final confirmation:
    print(f"✅ Item '{old_name}' update process completed.")


def show_restaurant_menu():
    """
    5. Uses MenuManager to retrieve and print the full restaurant menu.
    """
    print("\n============= RESTAURANT MENU =============")
    items = MenuManager.all_items()
    
    if not items:
        print("The menu is currently empty.")
    else:
        # Print header
        print(f"{'Item Name':<25}{'Price':>10}")
        print("-" * 35)
        
        for item in items:
            print(f"{item.item_name:<25}${item.item_price:>9}")
    print("===========================================")

# Main execution block
if __name__ == '__main__':
    show_user_menu()