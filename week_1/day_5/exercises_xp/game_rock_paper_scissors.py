############################# Game #############################
import random              # Part I:
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
######################### rock-paper-scissors #########################
from game import Game         # Part II
def get_user_menu_choice():
   """Displays the menu and gets the user's choice"""
   while True:
      print("\nMenu:")
      print("1. Play a new game")
      print("2. Show scores")
      print("3. Quit")
      choice = input("Enter your choice (1, 2, or 3):")
      if choice in ['1', '2', '3']:
         return choice
      print("Invalid choice. Please enter 1, 2, or 3.")
def print_results(results):
   """Prints a summary of the game results"""
   print(f"\n--- Game Summary ---")
   print(f"Wins: {results.get('win', 0)}")
   print(f"Losses: {results.get('loss', 0)}")
   print(f"Draws: {results.get('draw', 0)}")
   print("Thanks for playing!")
def main():
   """The main function to run the game."""
   results = {"win": 0, "loss":0, "draw": 0}
   while True:
      user_choice = get_user_menu_choice()
      if user_choice == '1':
         game = Game()
         game_result = game.play()
         results[game_result] = results.get(game_result, 0) + 1
      elif user_choice == '2':
         print_results(results)
      elif user_choice == '3':
         print_results(results)
         print("Exiting the game. Goodbye!")
         break
if __name__ == "__main__":
   main()

