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
# Campare names
if user_name == "Sarah":
    print(random.choice(same_name_jokes))
else:
    print(random.choice(different_name_jokes))