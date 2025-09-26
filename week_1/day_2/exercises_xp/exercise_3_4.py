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