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

