# 1. Create new file and import the Dog class from exercice 2
import random
from exercise_2 import Dog

# 2. Create a class named PetDog that inherits from Dog
class PetDog(Dog):
   def __init__(self, name, age, weight):
      # Call the parent Dog class's __init__ method to set a name, age, weight
      super().__init__(name, age, weight)
# 3. add an attribute trained and set false by default
      self.trained = False

# 4. Add the method train, play, do_a_trick
   # add the train method
   def train(self):
      # Call the bark method from the parent Dog class
      print(self.bark())
      # Switch the trained attribute to True
      self.trained = True
   # add the play method
   def play(self, *args):
      # Join the names passed as arguments into a single string
      dog_names = ", ".join(args)
      print(f"{dog_names} all play together.")

   # add the do_a_trick method
   def do_a_trick(self):
      # check if the dog is trained before performing a trick
      if self.trained:
         tricks = [
            f"{self.name} does a barrel roll.",
            f"{self.name} stands on his back legs",
            f"{self.name} shakes your hand",
            f"{self.name} plays dead"
         ]
         # Randomly select and print a trick from the list 
      else:
         print(f"{self.name} is not trained yet.")
# Exmple usage
# Create an instance of PetDog
my_dog = PetDog("Buddy", 4, 15)

print("--- Initial State ---")
# Buddy is not trained, so this won't work yet
my_dog.do_a_trick()

print("\n--- Training the Dog ---")
# Call the train method. This will also make the dog bark
my_dog.train()

print("\n--- After Training ---")
# Now that Buddy is trained, he can do a trick
my_dog.do_a_trick()

print("\n--- Playing with Friends ---")
# Call the play method with some friends' names
my_dog.play("Max", "Lucy", "Mimi")