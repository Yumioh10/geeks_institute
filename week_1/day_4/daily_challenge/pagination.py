import math # import the math module
# Step 1: Create the Pagination Class
class Pagination():
   """A class that stimulate a basic pagination system"""
# Step 2: Implement the __init__ method   
   def __init__(self, items='None', page_size=10):
      self.items = items if items is not None else []
      self.page_size = page_size
      self.current_idx = 0
      if self.page_size > 0:
         self.total_pages = math.ceil(len(self.items) / self.page_size)
      else:
         self.total_pages = 0
# Step 3: Implement the get_visible_items() Method
   def get_visible_items(self):
      """Return the list of items visible on the current page"""
      start_index = self.current_idx * self.page_size
      end_index = start_index + self.page_size
      return self.items[start_index:end_index]
#Step 4: Implement Navigation Methods
   def go_to_page(self, page_num):
      """Navigate toa specific page number (1-based index)"""
      if 1 <= page_num <= self.total_pages:
         self.current_idx = page_num - 1
      else:
         raise ValueError(f"Page number {page_num} is out of range. Please enter a number between 1 and {self.total_pages}.")
      return self
   def first_page(self):
      """Navigate to the first page"""
      self.current_idx = 0
      return self
   
   def last_page(self):
      """Navigate to the last page"""
      self.current_idx = self.total_pages - 1
      return self
   
   def next_page(self):
      """Moves one page forward"""
      if self.current_idx < self.total_pages - 1:
         self.current_idx += 1
      return self
   
   def previous_page(self):
      """Move one page backward"""
      if self.current_idx > 0:
         self.current_idx -= 1
      return self
# Step 5: Add a Custom __str__() Method
   def __str__(self):
      """Return a string representation of the visible items on the current page. """
      return "\n".join(self.get_visible_items())
# Step 6: Test Your Code
alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(p.get_visible_items())
# ['a', 'b', 'c', 'd']

p.next_page()
print(p.get_visible_items())
# ['e', 'f', 'g', 'h']

p.last_page()
print(p.get_visible_items())
# ['y', 'z']

p.go_to_page(10)
print(p.current_idx + 1)
# Output: 7

p.go_to_page(0)
# Raises ValueError
