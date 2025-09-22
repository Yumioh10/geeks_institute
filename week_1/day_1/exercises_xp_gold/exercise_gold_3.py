# Define my name
my_name = 'Sarah'

# Keep asking until the user enters my_name
while True:
   user_name = input("Enter your name:")
   if user_name.strip().lower() == my_name.lower():
      print(f"Hi {my_name}! We have the same name!")
      break
   else:
      print("That's not my name, try again!")