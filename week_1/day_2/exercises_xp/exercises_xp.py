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

###################################### Exercise 3 ######################################
# 1. Dictionary creation "brand"
brand = {
    'name': 'Zara',
    'creation_date': 1975,
    'creator_name': 'Amancio Ortega Gaona',
    'type_of_clothes': ["men", "women", "children", "home"],
    'international_competitors': ["Gap", "H&M", "Benetton"],
    'number_stores': 7000,
    'major_color': {
        'France': 'blue',
        'Spain': 'red',
        'US': ['pink', 'green']
    }
}
# 2. Changing the number of stores to 2
brand['number_stores'] = 2
print(brand)

# 3. print sentence that explain who Zaras clients are
    # Extract the clothing categories for people (excluding 'home')
clothing_categories = [category for category in brand['type_of_clothes'] if category != 'home']
    # Create a sentence about Zara's clients
sentence = f"{brand['name']}'s clients include {', '.join(clothing_categories)}."
print(sentence)

# 4. Adding a key called country_creation with a value Spain
brand['country_creation'] = 'Spain'
print(brand)

# 5. Checking international_competitors and adding a new store
if 'international_competitors' in brand:
   brand['international_competitors'].append('Desigual')
print(brand['international_competitors'])

# 6. Deleting the information about the date of creation
del brand["creation_date"]
print(brand)

# 7. Print the last international competitors
print(brand["international_competitors"][-1])

# 8. Print the major clothes colors in the US
print(brand['major_color']['US'])

# 9. Print the amount of key value paires
print(len(brand))

# 10. Print the keys of the dictionary
for key in brand:
   print(key)

# 11. Create another dictionary more_on_zara to dictionary brand
# Starting an empty dictionary called more_on_zara
more_on_zara = {}
# Adding items to the new dictionary
more_on_zara['creation_date'] = 1975
more_on_zara['number_stores'] = 10000
print(more_on_zara)

# 12. Update the dictionary brand
brand.update(more_on_zara)
print(brand)

# 13. Print the value of the key number_stores
print(brand['number_stores'])
print(brand.get("number_stores"))

###################################### Exercise 4 ######################################
# 1. create the function descrie_city
def describe_city(city, country):
    """The role of this function is to print city is in country"""
    print(f"{city} is in {country}") # 2. the function use is to print {city} is in {country}

# 3. Giving the parameter country a default value
def describe_city(city, country='Morocco'):
    print(f"{city} is in {country}")

# 4. Calling the function
describe_city("Rabat")

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

###################################### Exercise 7 ######################################

import random

# 1. create get_random_temp() function
def get_random_temp(*args):
   """This function return an integer selected at random"""
   return random.randint(-10, 40)
get_random_temp(20)

# 2. create main function
def main(*args):
   temperature = get_random_temp()
   print(f"The temperature right now is {temperature} degrees Celsius") 
# 3. add more functionality to the main
   if temperature < 0:
      print(f"Brrr, thats freezing! Wear some extra layers today")
   elif 0 <= temperature <= 16:
      print(f"Quite chilly! Don't forget your coat")
   elif 16 < temperature <= 23:
      print(f"The weather is mild; it's not too hot, not too cold")
   elif 24 <= temperature <= 32:
      print(f"It's a perfect day for the beach")
   else:
      print(f"This temperature range can cause heatstroke, so it's important to stay hydrated and take precautions.")
# 2.2 and 3
main(20)

# 4. changing the get_random_temp() function 
def get_random_temp(season):
   """
    Returns a random temperature based on the season.
    """
   if season == 'winter':
        return random.randint(-10, 16)
   elif season == 'spring':
        return random.randint(24, 32)
   elif season == 'autumn' or season == 'fall':
        return random.randint(16, 24)
   elif season == 'summer':
        return random.randint(24, 40)
   else:
        # Default to a general range if the input is invalid
        print("Invalid season entered. Generating a random temperature for a general range.")
        return random.randint(-10, 40)
   
# 4.3 changing main fubction
def main():
    """
    Asks the user for a season, generates a random temperature for that season,
    and provides a weather-related message.
    """
    season_input = input("Please type in a season (winter, spring, autumn/fall, or summer): ").lower()
    temperature = get_random_temp(season_input)
    print(f"\nThe temperature right now is {temperature} degrees Celsius.")

    if temperature < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temperature <= 16:
        print("Quite chilly! Don't forget your coat.")
    elif 16 < temperature <= 23:
        print("The weather is mild; it's not too hot, not too cold.")
    elif 24 <= temperature <= 32:
        print("It's a perfect day for the beach.")
    else:
        print("This temperature range can cause heatstroke, so it's important to stay hydrated and take precautions.")
if __name__ == "__main__":
    main()
# 3.2 calling the function get_random_temp
get_random_temp("spring")

# 5. Bonus give temperature a floating number
import random
def get_random_temp(*args):
   """This function return an float selected at random"""
   return random.uniform(-10.0, 40.0)

def main(*args):
   temperature = get_random_temp()
   print(f"The temperature right now is {temperature} degrees Celsius") 
   if temperature < 0.0:
      return random.uniform(-10.0, 0.0)
   elif 0.0 <= temperature <= 16.0:
      return random.uniform(0.0, 16.0)
   elif 16.0 < temperature <= 23.0:
      return random.uniform(16.0, 23.0)
   elif 24.0 <= temperature <= 32.0:
      return random.uniform(24.0, 32.0)
   else:
      return random.uniform(32.0, 40.0)
if __name__ == "__main__":
    main()

# 6. Ask the user for the number of the month 
import random
def get_random_temp(season):
   """
    Returns a random temperature based on the season.
    """
   if season == 'winter':
        return random.uniform(-10.0, 16.0)
   elif season == 'spring':
        return random.uniform(24.0, 32.0)
   elif season == 'autumn' or season == 'fall':
        return random.uniform(16.0, 24.0)
   elif season == 'summer':
        return random.uniform(24.0, 40.0)
   else:
        print("Invalid season entered. Generating a random temperature for a general range.")
        return random.uniform(-10.0, 40.0)
    
def main():
   """Asks the user for a month number, determines the season, and
    provides a weather-related message."""
   try:
       month_number = int(input("Please enter the number ofthe month (1-12):"))
   except ValueError:
       print("Invalid input. Please enter a number")
       return 
   
   season =""
   # Determine the season based on the month number
   if month_number in [12, 1, 2]:
      season = 'winter'
   elif month_number in [3, 4, 5]:
       season = 'spring'
   elif month_number in [6, 7, 8]:
       season = 'summer'
   elif month_number in [9, 10, 11]:
       season = 'autumn'
   else:
       print("Invalid month number. Please enter a numer between 1 and 12")
       return
   
   temperature = get_random_temp(season)
   print(f"\nFor month {month_number}, the season is {season.capitalize()}")
   print(f"The temperatue right now is {temperature:.1f} degrees Celcius")

   if temperature < 0:
       print("Brrr, that's freezing! Wear some extra layers today")
   elif 0 <= temperature <= 16:
       print("Quite chilly! Don't forget your coat")
   elif 16 < temperature <= 23:
       print("The weather is mild; it's not too hot, not too cold")
   elif 24 <= temperature <= 32:
       print("It's a perfect day for the beach")
   else:
       print("This temperature can cause heatstroke, so it's important to stay hydrated and take precautions")
if __name__ == "__main__":
    main()

main(5)

###################################### Exercise 8 ######################################
import random
def star_war_quiz(): # quiz Data
    data = [
        {
            "question": "What is Baby Yoda's real name?",
            "answer": "Grogu"
        },
        {
            "question": "Where did Obi-Wan take Luke after his birth?",
            "answer": "Tatooine"
        },
        {
            "question": "What year did the first Star Wars movie come out?",
            "answer": "1977"
        },
        {
            "question": "Who built C-3PO?",
            "answer": "Anakin Skywalker"
        },
        {
            "question": "Anakin Skywalker grew up to be who?",
            "answer": "Darth Vader"
        },
        {
            "question": "What species is Chewbacca?",
            "answer": "Wookiee"
        }
    ]

    # 1. Create a function that check the answers
    correct_count = 0
    incorrect_count = 0
    wrong_answers_list = []

    print("Welcome to the Star Wars Quizz!")
    
    # Shuffle questions for variety
    random.shuffle(data)
    total_questions = len(data)

    # Ask each question
    for i, qa in enumerate(data, 1):
        question = qa["question"]
        correct_answer = qa["answer"]
        print(f"Question {i}/{total_questions}:")
        print(f"{question}")

        user_answer = input("Your answer: ").strip()

        # Check if answer is correct (case-insensitive)
        if user_answer.lower() == correct_answer.lower():
            print("Correct! You get it\n")
            correct_count += 1
        else:
            print(f" Incorrect. The right answer is: {correct_answer}\n")

            incorrect_count += 1
            # Add th wrong answers list with details
            wrong_answers_list.append({
                "question": question,
                "user_answer": user_answer,
                "correct_answer": correct_answer
            })
    # Display final results
    print("QUIZ RESULT SUMMARY")
    print("=" * 30)
    print(f"Total Questions: {total_questions}")
    print(f"Correct Answers: {correct_count}")
    print(f"Incorrect Answers: {incorrect_count}")

    percentage = (correct_count / total_questions) * 100
    print(f"Percentage: {percentage:.1f}%")

    # Display wrong answers if any
    if wrong_answers_list:
        print(f"\n Questions you got wrong ({len(wrong_answers_list)}):")
        print("-" * 50)
        for i, wrong in enumerate(wrong_answers_list, 1):
            print(f"{i}. Question: {wrong['question']}")
            print(f"    Your answer: {wrong['user_answer']}")
            print(f"    Correct answer: {wrong['correct_answer']}")
            print("-" * 30)
    else:
        print("\n Amazing! You got all questions correct!")  

    # Ask to play again if more than 3 wrong answers
    if incorrect_count > 3:
        print("\n You had more than 3 wrong answers. Would you like to play again?")
        play_again = input("Play again? (yes/no): ").strip().lower()
        if play_again in ['yes', 'y', 'yeah', 'yep']:
            print("\n" + "="*50)
            print("STARTING NEW QUIZ SESSION")
            print("="*50 + "\n")
            return star_war_quiz() # Call the function to play again

    # Return the results as a dictionary
    return {
        "total_questions": total_questions,
        "correct_answers": correct_count,
        "incorrect_answers": incorrect_count,
        "percentage": percentage,
        "wrong_answers": wrong_answers_list
    }

# Launch the function
if __name__ == "__main__":
    # Run the quiz and get results
    quiz_results = star_war_quiz()

    # You can access the individual results :
    print(f"\n Results dictionary available for further processing:")
    print(f"Correct answers: {quiz_results['correct_answers']}")
    print(f"Wrong answers count: {quiz_results['incorrect_answers']}")
    print(f"Wrong answers details: {len(quiz_results['wrong_answers'])} items in list")
