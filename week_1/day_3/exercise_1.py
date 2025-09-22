
class Cat:
   def __init__(self, cat_name, cat_age):
      self.name = cat_name
      self.age = cat_age

# 1. Instantaniate 3 Cat objects
cat1 = Cat("Mimi", 3)
cat2 = Cat("lola", 2)
cat3 = Cat("Pop", 5)

# 2. Create the function to find the oldest
def find_oldest_cat(cats_list):
   """Finds and return the oldest cat object"""
   oldest_cat = None
   oldest_age = -1

   for cat in cats_list:
      if cat.age > oldest_age:
         oldest_age = cat.age
         oldest_cat = cat
   return oldest_cat

# Create a list of the cat objects
all_cats = [cat1, cat2, cat3]

# Use the function to find the oldest cat
oldest_cat_object = find_oldest_cat(all_cats)

# 3. Print the required string
if oldest_cat_object:
   print(f"The aldest cat is {oldest_cat_object.name}, and is {oldest_cat_object.age} years old.")

