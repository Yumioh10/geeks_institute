# Part II
from game import Game

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
