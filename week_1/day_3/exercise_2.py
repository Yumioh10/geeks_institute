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
 


