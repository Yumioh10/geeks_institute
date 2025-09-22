import random

wins = 0
losses = 0

print("Guess a number between 1 and 9. Enter 'q' to quit.")

# Get user input
while True:
   guess = input("\nYour guess: ")

   #Check if user wants to quit
   if guess == 'q':
      break

   # Validate input
   if not guess.isdigit() or int(guess) not in range(1, 10):
      print("Please enter a number between 1 and 9 or 'q' to quit")
      continue

   # Generate random number and compare
   target = random.randint(1, 9)
   if int(guess) == target:
      print("Winner")
      wins += 1
   else:
      print(f"Better luck next time. the number was {target}")
      losses += 1

# Display results
print(f"\nThanks for Playing!")
print(f"Games won: {wins}")
print(f"Games lost: {losses}")