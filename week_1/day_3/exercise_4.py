## For debug
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
