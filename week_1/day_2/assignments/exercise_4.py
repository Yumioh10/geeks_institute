# 1. create the function descrie_city
def describe_city(city, country):
    """The role of this function is to print city is in country"""
    print(f"{city} is in {country}") # 2. the function use is to print {city} is in {country}

# 3. Giving the parameter country a default value
def describe_city(city, country='Morocco'):
    print(f"{city} is in {country}")

# 4. Calling the function
describe_city("Rabat")


 