# 1. Create the class TheIncredible that inherit the class Family:
# 1. Create the Family class (required for TheIncredibles class to work)
class Family:
    """This is a base class to represent a family."""
    def __init__(self, last_name, members=[]):
        self.last_name = last_name
        self.members = members

    def family_presentation(self):
        """Prints the full family's presentation."""
        print(f"The {self.last_name} Family:")
        for member in self.members:
            print(f"- {member['name']} {self.last_name}, a {member['age']}-year-old {member['gender']}.")

    def born(self, **kwargs):
        """Adds a new member to the family."""
        self.members.append(kwargs)
        print(f"Congratulations! {kwargs['name']} {self.last_name} has been born.")
    
    def is_18(self, member_name):
        """Checks if a family member is 18 or older."""
        for member in self.members:
            if member['name'] == member_name:
                return member['age'] >= 18
        return False

# 2. Add method use_power
class TheIncredibles(Family):
    """A class representing the Incredibles family, inheriting from Family."""
    def use_power(self, member_name):
        """Prints the power of a member if they are over 18, raises an exception otherwise."""
        # Check if the member is over 18 using the inherited method
        if not self.is_18(member_name):
            raise ValueError(f"{member_name} is not over 18 years old and cannot use their power.")
        else:
            # Find the member and print their power
            for member in self.members:
                if member['name'] == member_name:
                    print(f"{member['name']}'s power is '{member['power']}'.")
                    return
        
    # 3. Add method incredible_presentation
    def incredible_presentation(self):
        """Prints a special introduction and then the full family presentation."""
        print("*Here is our powerful family**")
        # Use the super() function to call the family_presentation method from Family class
        super().family_presentation()

# 4. Create an instance of the Incredibles class
# Initial list of incredible family members with their powers
incredibles_members = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
]
# Create the instance
incredibles_family = TheIncredibles(last_name="Incredibles", members=incredibles_members)
print("--- Initial Family Presentation ---")

# 5. Call the incredible_presentation method
incredibles_family.incredible_presentation()

# 6. Use born method inherited from Family class to add Baby Jack with Unknown Power
incredibles_family.born(name='Jack', age=0, gender='Male', is_child=True, power='Unknown Power', incredible_name='Baby Jack')
print("\n--- Family presentation After Adding Jack ---")

# 7. Call the incredible_presentation method again
incredibles_family.incredible_presentation()

print("\n--- Demonstrating Powers ---")
# Use the use_power method for an adult
try:
    incredibles_family.use_power('Michael')
except ValueError as e:
    print(e)

# try to use the power for Baby Jack to raise the exception
try:
    incredibles_family.use_power('Jack')
except ValueError as e:
    print(e)
