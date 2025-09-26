###################################### Exercise 5 ######################################
# Create the functon that accept the number and generate a random one
import random

def guess_number(user_number):
    if not 1 <= user_number <= 100:
        return "Please enter a number between 1 and 100"
    
    random_number = random.randint(1, 100)
    if random_number == user_number:
        return f"You win, you guessed the right number, your number was {user_number} and the computer number was {random_number}"
    else:
        return f"You loose, you guessed the wrong number, your number was {user_number} and the computer number was {random_number}"

print(guess_number(18))
###################################### Exercise 6 ######################################
# 1. create the function make_shirt
def make_shirt(size, text):
   """this function print a sentence summarizing the size of the shirt and the message printed on it"""
   print(f"The size of the shirt is {size} and the text printed is {text}") # 2. The sentence describing the size and the text on the shirt

make_shirt('Medium', 'Geeks Institut')

# 3. Modifying the function
def make_shirt(size='large', text='I love Python'):
   print(f"The size of the shirt is {size} and the text printed is {text}")

make_shirt() 

# 4. call the function for large size and default message
make_shirt('large')

# 5. Calling function for medium shirt and default message
make_shirt('medium')

# 6. Make the shirt of anysize with diferent message
make_shirt('small', 'Code everyday')

# 7. Bonus
make_shirt('large', 'geeks institut')

