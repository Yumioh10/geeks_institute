import math
import turtle
class Circle:
   """A class representing a circle, define by either its radius or diamenter."""
   def __init__(self, radius=None, diameter=None):
      if radius is not None:
         self.radius = radius
      elif diameter is not None:
         self.diameter = diameter
      else:
         raise ValueError("A circle must be defined by either a radius or a diameter.")
      
   @property
   def radius(self):
      return self._radius
   
   @radius.setter
   def radius(self, value):
      if value < 0:
         raise ValueError("Radius cannot ne negative")
      self._radius = value
      
   @property
   def diameter(self):
      return self._radius * 2
   
   @diameter.setter
   def diameter(self, value):
      if value < 0:
         raise ValueError("Diameter cannot be negative")
      self._radius = value / 2

   def area(self):
      """Calculates the cicrle's area"""
      return math.pi * (self.radius ** 2)
   
   def __str__(self):
      """Return a string representation of the circle's attributes"""
      return f"Circle with a radius of {self.radius:.2f} and a diameter of {self.diameter:.2f}."
   
   def __add__(self, other):
      """Adds two circles and returns a new circle with a combined radius"""
      new_radius = self.radius + other.radius
      return Circle(radius=new_radius)
   
   def __gt__(self, other):
      """Compares two circles to see which is bigger based on area."""
      return self.area() > other.area()
   
   def __eq__(self, other):
      """Compares two circles to see if they are equal based on radius."""
      return self.radius == other.radius
   
   # draw the sorted circles
   def draw_circles(circles):
      """Draws a list of circles sorted by size."""
      # Set up the turtle screen
      screen = turtle.Screen()
      screen.title("Sorted Circles")
   
      t = turtle.Turtle()
      t.speed(1)
      t.hideturtle()
   
      # Calculate a starting position
      x = 0
      y = -200
      for circle in circles:
         t.penup()
         t.goto(x, y + circle.radius)
         t.pendown()
   
         t.circle(circle.radius)
   
         t.penup()
         t.goto(x, y + 10)
         t.write(f"R={circle.radius:.1f}", align="center", font=("Arial", 12, "normal"))
   
         y += circle.diameter + 20
   
      screen.exitonclick()
      
      # ---- Main Program ---
if __name__ == "__main__":
   # Create a list of circles with varying sizes
   circle_list = [
      Circle(radius=30),
      Circle(diameter=100),
      Circle(radius=20),
      Circle(diameter=50),
      Circle(radius=10)
   ]
   # Sort the list of circles (from smallest to largest )
   circle_list.sort()

   # Draw the sorted circles
Circle.draw_circles(circle_list)
# Create circle instances
circle1 = Circle(radius=4)
circle2 = Circle(diameter=10)
circle3 = Circle(radius=4)

# 1. Access attributes
print(f"Circle 1 - Radius: {circle1.radius:.2f}, Diameter: {circle1.diameter:.2f}")
print(f"Circle 2 - Radius: {circle2.radius:.2f}, Diameter: {circle2.diameter:.2f}")

# 2. Compute area
print(f"Area of Circle 1: {circle1.area():.2f}")
print(f"Area of Circle 2: {circle2.area():.2f}")

# 3. Add two circles
circle_sum = circle1 + circle2
print(f"New circle from addition: {circle_sum}")
print(f"New circle radius: {circle_sum.radius:.2f}")

# 4. Compare for 'bigger than' (>)
print(f"Is Circle 2 bigger than Circle 1? {circle2 > circle1}")

# 5. Compare for 'equal to' (==)
print(f"Is Circle 1 equal to Circle 3? {circle1 == circle3}")

# 6. Sort a list of circles
circles_list = [circle1, circle2, circle_sum, Circle(radius=3)]
circles_list.sort() 
print("\nSorted Circles:")
for c in circles_list:
   print(c)
################################################################
###    Bonus: using Turtle module, draw the sorted circles   ###


