############################ Exercise 1 ############################
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())
class Cat():
    is_lazy = True
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'
        
class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
    
# 1. Create another cat breed named Siamese that inherits from the cat class
class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# 2. Create the list all_cats, that holds three cat
all_cats = [
    Bengal("Mimi", 7),
    Chartreux("Lala", 4),
    Siamese("Pop", 6)
]
# 3. Create a variable called sara_pets 
sara_pets = Pets(all_cats) # Pass the all_cats list to this new instance
# 4. Use walk method on all cats
sara_pets.walk()
############################ Exercise 2 ############################
# 1.Create the class Dog
class Dog():
   def __init__(self, name, age, weight):
      """"""
      self.name = name
      self.age = age
      self.weight = weight
# 2. Implement methods bark, run_speed, fight
   def bark(self): # method that return a string for dog's bark 
      return f"{self.name} is barking"
   def run_speed(self): # method that calculate and return the dog's running speed
      return (self.weight / self.age) * 10
   def fight(self, other_dog): # method that return a string stating which dog won the fight
      # The winner is the dog with the higher score: run_speed * weight
      # Calculate the fight score for the current dog 
      my_fight_score = self.run_speed() * self.weight
      # Calculate the fight score for the other dog
      other_dog_fight_score = other_dog.run_speed() * other_dog.weight
      if my_fight_score > other_dog_fight_score:
         return f"{self.name} won the fight against {other_dog.name}"
      elif other_dog_fight_score > my_fight_score:
         return f"{other_dog.name} won the fight against {self.name}"
      else:
         return "The fight is a tie"
# 3. Create 3 dogs and run 
dog1 = Dog("Rex", 5, 25)
dog2 = Dog("Bella", 3, 18)
dog3 = Dog("Tank", 8, 50)
print("---  ---")
print(dog1.bark())
# Demonstrate the run speed
print(f"{dog1.name}'s running speed: {dog1.run_speed():.1f}")
print(f"{dog2.name}'s running speed: {dog2.run_speed():.1f}")
print(f"{dog3.name}'s running speed: {dog3.run_speed():.1f}")
print("--- Start the Fight ---")
print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog1.fight(dog3))