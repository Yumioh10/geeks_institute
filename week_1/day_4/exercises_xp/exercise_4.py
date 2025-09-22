# 1. Create the class Family
class Family():
   def __init__(self, last_name, members):
      """Initializes the Family instance with a last name and a list of members"""
      self.last_name = last_name
      self.members = members
# 2. Implement the methods born, is_18, family_presentation   
   # Implement the method born   
   def born(self, **kwargs):
      """Adds a new child to the members list using key"""
      self.members.append(kwargs)
      print(f"Congratulations to the {self.last_name} family on the birth of a new child")

   # Implement the method is_18
   def is_18(self, name):
      """Checks if a family member is 18 or older"""
      for member in self.members:
         if member['name'] == name:
            return member['age'] >= 18
      return False # Return False if the member is not found
   
   # Implement the method family_presentation
   def family_presentation(self):
      """Prints the family's last name and details for all members"""
      print(f"\n--- The {self.last_name} Family ---")
      for member in self.members:
         print(f"Name: {member['name']}, Age:{member['age']}, Gender: {member['gender']}, is_child: {member['is_child']}")

 # 3. Create the Family class instance
# Initial list of the family members
initial_members = [
   {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False},
   {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False} 
]
# Create an instance of the Family class
amany_family = Family(last_name="Amany", members=initial_members)
# 1* Call the born() method to add a new child
amany_family.born(name='Baby', age=0, gender='Male', is_child=True)
# 2* Call the is_18() method to check if members are over 18
print(f"Is Michael over 18? {amany_family.is_18('Michael')}")
print(f"Is Baby over 18? {amany_family.is_18('Baby')}")
# 3* Call the family_presentation() method
amany_family.family_presentation()
