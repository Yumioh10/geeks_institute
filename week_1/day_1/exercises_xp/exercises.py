########################################## Exercise 1: ##########################################
print(("Hello World \n")*4)
########################################## Exercise 2: ##########################################
power = 99**3

print("99^3 =", power)

print("99^3 x 8 =", power * 8)
########################################## Exercise 3: ##########################################
import random
my_name = "Sarah"
user_name = input("What's your name? ")

# Lists of funny messages
same_name_jokes = [
    f"No way! we both have the same name: {user_name}! Twinsies! ",
    f"OMG! Another {user_name}? The world isn't ready for two of us!",
    f"Wow! Two {user_name}s in one place? This must be fate!",
    f"Are you secretly my long-lost twin? Because this is uncanny!"
]
different_name_jokes = [
    f"Nice to meet you, {user_name}! But sorry... {my_name} is still the cooler one.",
    f"{user_name} is a good name, but {my_name} has a certain ring to it, don't you think?",
    f"{user_name} is a nice name, but {my_name} is the name of legends!",
]
if user_name == "Sarah": # Campare names
    print(random.choice(same_name_jokes))
else:
    print(random.choice(different_name_jokes))
########################################## Exercise 4: ##########################################
height_in_cm = input("What's your height in centimeters? ")

if int(height_in_cm) >= 145:
   print("You are tall enough to ride!")
else:
   print("Sorry, You still need to grow some more to ride.")
########################################## Exercise 5: ##########################################
my_fav_numbers = [7, 5, 9, 8] # createa set of my favorite numbers
print("My favorite numbers are:", (my_fav_numbers))

my_fav_numbers.append(1) # add two new numbers to the list
my_fav_numbers.append(3)
print("after adding two other favorite numbers:",my_fav_numbers)

my_fav_numbers.remove(5) # remove the last number of the list
print("After removing the last number:", my_fav_numbers)

friend_fav_numbers = [4, 5, 1, 7] # create a set of friend's favorite numbers
print("My friend's favorite numbers are:", (friend_fav_numbers))

our_favorite_numbers = my_fav_numbers + friend_fav_numbers # Concatenate both sets
print("Our favorite numbers are:", our_favorite_numbers)
########################################## Exercise 6: ##########################################
my_tuple = (16, 18, 15)
math_note, science_note, french_note = my_tuple

print("You're maths note is", math_note)

print("You're science note is", science_note)

print("You're french note is", french_note) # Tuples can't be changed, it can't add more integers to it 
########################################## Exercise 7: ##########################################
basket = ["Banana", "Apples", "Oranges", "Blueberries"] # add basket list
print(basket)

basket.remove("Banana")# Remove Banana and Blueberries
basket.remove("Blueberries")
print(basket)

basket.append("Kiwi")# Add Kiwi to the list
print(basket)

basket.insert(0,"Apples") # Add Apples to the beginning of the list
print(basket)

print(f"There are {basket.count('Apples')} Apples in the basket") # Count how many apples are in the basket

basket = [] # Empty the basket
print(basket)



