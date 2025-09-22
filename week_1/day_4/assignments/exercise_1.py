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
# Pass the all_cats list to this new instance
sara_pets = Pets(all_cats)

# 4. Use walk method on all cats
sara_pets.walk()

    
