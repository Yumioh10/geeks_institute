# add basket list
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
print(basket)

# Remove Banana and Blueberries
basket.remove("Banana")
basket.remove("Blueberries")
print(basket)

# Add Kiwi to the list
basket.append("Kiwi")
print(basket)

# Add Apples to the beginning of the list
basket.insert(0,"Apples")
print(basket)

# Count how many apples are in the basket
print(f"There are {basket.count('Apples')} Apples in the basket")

# Empty the basket
basket = []
print(basket)