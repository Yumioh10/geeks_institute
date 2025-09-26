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
