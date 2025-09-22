import random
# Part I:
class Game():
   def __init__(self):
      self.choices = ["rock", "paper", "scissors"]
# 1. Ask user to select an item rock,paper or scissors
   def get_user_item(self):
      """Prompts the user to select an item with data validation"""
      while True:
         user_input = input("Select an item (rock, paper, or scissors): ").lower()
         if user_input in self.choices:
            return user_input
         print("Invalid input. Please choose from rock, paper, or scissors")
# 2. Select the computer item at random
   def get_computer_item(self):
      """Randomly selects an item for the computer."""
      return random.choice(self.choices)
# 3. Determine the result of the game
   def get_game_result(self, user_item, computer_item):
      """Determine the result of the game"""
      if user_item == computer_item:
         return "draw"
      # win conditions for the user
      if (user_item == "rock" and computer_item == "scissors") or (user_item == "paper" and computer_item == "rock") or (user_item == "scissors" and computer_item == "paper"):
         return "win"
      else: 
         return "loss"
# 4. Add the play function
   def play(self):
      """Play a single game of Rock, Paper, Scissors"""
      user_item = self.get_user_item()
      computer_item = self.get_computer_item()
      game_result = self.get_game_result(user_item, computer_item)
      print(f"You selected {user_item}. The computer selected {computer_item}.")
      if game_result == "win":
         print("You Won!")
      elif game_result == "loss":
         print("You Lose!")
      else:
         print("It's a Draw")
      return game_result
