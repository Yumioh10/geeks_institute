########################### Exercise 1 ###########################
class Cat:
   def __init__(self, cat_name, cat_age):
      self.name = cat_name
      self.age = cat_age
cat1 = Cat("Mimi", 3) # 1. Instantaniate 3 Cat objects
cat2 = Cat("lola", 2)
cat3 = Cat("Pop", 5)

def find_oldest_cat(cats_list): # 2. Create the function to find the oldest
   """Finds and return the oldest cat object"""
   oldest_cat = None
   oldest_age = -1

   for cat in cats_list:
      if cat.age > oldest_age:
         oldest_age = cat.age
         oldest_cat = cat
   return oldest_cat

all_cats = [cat1, cat2, cat3] # Create a list of the cat objects
oldest_cat_object = find_oldest_cat(all_cats) # Use the function to find the oldest cat

if oldest_cat_object: # 3. Print the required string
   print(f"The aldest cat is {oldest_cat_object.name}, and is {oldest_cat_object.age} years old.")
########################### Exercise 2 ###########################
# 1. Create th class Dog
class Dog():
   def __init__(self, name, height): # 2. create the __init__ method
      self.name = name
      self.height = height

   def bark(self):# 3. Create the method bark
      print(f"{self.name} goes woof")
   
   def jump(self): # 4. Create the method jump
      x = self.height * 2
      print(f"{self.name} jumps {x} cm high!")

# 5. Create the object davids_dog
davids_dog = Dog("Rex", 50)

# 6. Print the details of davids_dog and call the the methos bark and jump
print(f"Davis's dog is named {davids_dog.name} and is {davids_dog.height}cm tall.")
davids_dog.bark()
davids_dog.jump()

# 7. Create the object sarahs_dog 
sarahs_dog = Dog("Teacup", 20)

# 8. Print the details of sarahs_dog and call the methos bark and jump
print(f"Sarah's dog is name {sarahs_dog.name} and is {sarahs_dog.height}cm tall.")
sarahs_dog.bark()
sarahs_dog.jump()

# 9. Create the statement that check which dog is bigger
if davids_dog.height > sarahs_dog.height:
   print(f"{davids_dog.name} bigger than {sarahs_dog.name}")
elif sarahs_dog.height > davids_dog.height:
   print(f"{sarahs_dog.name} is bigger than {davids_dog.name}")
else:
   print("Both dogs are the same height.")
 ########################### Exercise 3 ###########################
# 1. Define the class Song
class Song():
   """Class that represente a song and its lyrics"""
   def __init__(self, lyrics):
      """Initialize the song object"""
      self.lyrics = lyrics

# 2. Create th method sing_me_a_song
   def sing_me_a_song(self):
      """print each line of the song's lyrics"""
      for line in self.lyrics:
         print(line)
# 3. Create an object
stairway= Song(["There is a lady who's sure", "all that glitters is gold", "and she is buying a stairway to heaven"])
# 4. Calling the method sing_me_a_song
stairway.sing_me_a_song()

########################### Exercise 4 ###########################

# 1. Create the class zoo
class Zoo:
    """This class manages a collection of animals in a zoo."""

    def __init__(self, zoo_name):
        """Initializes the zoo object with a name and an empty list for animals."""
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        """Adds a new animal to the zoo list if it's not already present."""
        # Convert the new animal name to lowercase for case-insensitive comparison
        animal_to_add = new_animal.lower()

        # Check if the animal (case-insensitively) is already in the list
        if animal_to_add not in self.animals:
            self.animals.append(animal_to_add)
            print(f"Added {new_animal.capitalize()} to the zoo.")
        else:
            print(f"{new_animal.capitalize()} is already in the zoo.")

    def get_animals(self):
        """Prints the list of all animals in the zoo."""
        # Capitalize each animal name for a cleaner display
        display_animals = [animal.capitalize() for animal in self.animals]
        print(f"The available animals in the {self.name} Zoo are: {display_animals}")

    def sell_animal(self, animal_sold):
        """Removes an animal from the zoo's list."""
        # Convert the animal to be sold to lowercase for case-insensitive comparison
        animal_to_sell = animal_sold.lower()
        
        # Check if the animal is in the list
        if animal_to_sell in self.animals:
            self.animals.remove(animal_to_sell)
            print(f"Sold {animal_sold.capitalize()}.")
        else:
            print(f"{animal_sold.capitalize()} is not in the zoo.")
    
    def sort_animals(self):
        """Sorts the animals alphabetically and groups them by first letter."""
        self.animals.sort()
        grouped_animals = {}
        for animal in self.animals:
            first_letter = animal[0].capitalize()
            if first_letter not in grouped_animals:
                grouped_animals[first_letter] = []
            grouped_animals[first_letter].append(animal.capitalize())
        return grouped_animals
        
    def get_groups(self):
        """Prints the groups of animals after sorting them alphabetically."""
        grouped_animals = self.sort_animals()
        print("\nAnimals grouped by first letter:")
        for letter, animals_list in grouped_animals.items():
            print(f"{letter}: {animals_list}")


# --- Demonstration of the Zoo Class ---

print("--- Creating a New Zoo ---")
new_york_zoo = Zoo("New York Zoo")

print("\n--- Adding Animals ---")
new_york_zoo.add_animal("Ape")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Cat")
new_york_zoo.add_animal("Cougar")
new_york_zoo.add_animal("Eel")
new_york_zoo.add_animal("Emu")
new_york_zoo.add_animal("Giraffe")
new_york_zoo.add_animal("Ape") # Test for duplicate

print("\n--- Current Animals ---")
new_york_zoo.get_animals()

print("\n--- Selling Animals ---")
new_york_zoo.sell_animal("Emu")
new_york_zoo.sell_animal("Zebra") # This one should not be found

print("\n--- Current Animals After Sale ---")
new_york_zoo.get_animals()

print("\n--- Sorting Animals ---")
new_york_zoo.get_groups()
