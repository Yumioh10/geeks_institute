# 1- Print all numbers from 1 to 20
from ast import Index


print("All numbers from 1 to 20:")
for i in range(1, 21):
   print(i)

# 2- Print every element with an even index (from 1 to 20)
print("\nNumbers with even index (from 1 to 20):")
numbers = list(range(1, 21))
for index in range(len(numbers)):
   if index % 2 == 0: # check even index
      print(numbers[index])
      
         