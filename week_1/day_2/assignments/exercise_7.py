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