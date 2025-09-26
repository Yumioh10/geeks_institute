###################################### Exercise 1 ######################################
# Define the lists
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Convert lists into a dictionary using zip
result = dict(zip(keys, values))

# Print the result
print(result)
###################################### Exercise 2 ######################################
# Define the family dictionary with their age
family = {
   'rick': 43,
   'beth': 13,
   'morty': 5,
   'summer': 8
}
total_cost = 0
# fonction to determine ticket price based on age 
def get_ticket_price(age):
   if age < 3:
      return 0
   elif age >= 3 and age <= 12:
      return 10
   else:
     return 15

# calculate the ticket prices
for member, age in family.items():
   price = get_ticket_price(age)
   print(f"{member.capitalize()} (age {age}) pay ${price}")
   total_cost += price

print(f"\nTotal cost for the family: ${total_cost}") 

################################################
# Bonus 
# Empty family dictionary
family = {}

# function to determine ticket price based on age
def get_ticket_price(age):
   if age < 3:
      return 0
   elif age <= 12:
      return 10
   else:
      return 15

print("Enter family members (type 'done' when you finish entrering all the members):")

# Collect names and ages until user types "done"
while True:
   name = input("Enter name: ").strip()
   if name.lower() == "done":
      break

   # Validate age input 
   while True:
      try:
         age = int(input(f"Enter age of {name}:"))
         break
      except ValueError:
         print("Invalid age. Please enter a number.")

# Collect names and ages

   family[name] = age

# Calculate and display ticket prices
total_cost = 0
print("\n Ticket Prices: ")
for member, age in family.items():
   price = get_ticket_price(age)
   print(f"{member.capitalize()} (age{age}) pays ${price}")
   total_cost += price

print(f"\nTotal cost for the family: ${total_cost}")