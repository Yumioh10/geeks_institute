# 1. Ask user for a word
word = input("Please enter a word?").lower()

# Create an empty dictionary to store the letter indexes 
word_dict = {}

# loop through the word using its index and value
for i, char in enumerate(word):
   # Check if the letter is already a key in dictionary
   if char in word_dict:
      word_dict[char].append(i)
   else:
      # if the letter is not in the dictionary we create a new key
      word_dict[char] = [i]

# print the final dictionary
print(word_dict)

