############################################# Exercice 1: #############################################
while True:
    month = int(input("Enter a month number (1-12): "))
    if month in range(1, 13): # only accept number from 1 to 12
        # Determine the season
        if month in range(3, 6):
            print("The season is Spring ")
        elif month in range(6, 9):
            print("The season is Summer ")
        elif month in range(9, 12):
            print("The season is Autumn ")   
        else: # month in (12, 1, 2)
            print("The season is Winter ")
        break
    else:
        print("Invalid month number. Please enter a number between 1 and 12.") 
############################################# Exercice 2: #############################################
from ast import Index # 1- Print all numbers from 1 to 20
print("All numbers from 1 to 20:")
for i in range(1, 21):
   print(i)
print("\nNumbers with even index (from 1 to 20):") # 2- Print every element with an even index (from 1 to 20)
numbers = list(range(1, 21))
for index in range(len(numbers)):
   if index % 2 == 0: # check even index
      print(numbers[index])
############################################# Exercice 3: #############################################
my_name = 'Sarah' # Define my name
while True: # Keep asking until the user enters my_name
   user_name = input("Enter your name:")
   if user_name.strip().lower() == my_name.lower():
      print(f"Hi {my_name}! We have the same name!")
      break
   else:
      print("That's not my name, try again!")
############################################# Exercice 4: #############################################
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus'] # list of names
user_name = input("Enter your name; ") # Ask the user for their name
if user_name in names: # Check if the name exists in the list
    print(f"Hi {user_name} found at index {names.index(user_name)}")
else:
    print(f"{user_name} not found in the list.")
############################################# Exercice 5: #############################################
# Ask user for three numbers
num1 = int(input("Enter the first number")) 
num2 = int(input("Enter the second number"))
num3 = int(input("Enter the third number"))  
# Determine the greater number
greatest = max(num1, num2, num3) 
print(f"The greatest number is: {greatest}") 
############################################# Exercice 6: #############################################
import random
wins = 0
losses = 0
print("Guess a number between 1 and 9. Enter 'q' to quit.")
# Get user input
while True:
   guess = input("\nYour guess: ")
   #Check if user wants to quit
   if guess == 'q':
      break
   # Validate input
   if not guess.isdigit() or int(guess) not in range(1, 10):
      print("Please enter a number between 1 and 9 or 'q' to quit")
      continue
   # Generate random number and compare
   target = random.randint(1, 9)
   if int(guess) == target:
      print("Winner")
      wins += 1
   else:
      print(f"Better luck next time. the number was {target}")
      losses += 1
# Display results
print(f"\nThanks for Playing!")
print(f"Games won: {wins}")
print(f"Games lost: {losses}")
