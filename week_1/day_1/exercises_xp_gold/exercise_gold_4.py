# list of names
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

# Ask the user for their name
user_name = input("Enter your name; ")

# Check if the name exists in the list
if user_name in names:
    print(f"Hi {user_name} found at index {names.index(user_name)}")
else:
    print(f"{user_name} not found in the list.")