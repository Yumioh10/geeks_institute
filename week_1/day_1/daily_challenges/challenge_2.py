# Ask user for a string
text = str(input("Enter a string: "))

# Initialize result with the first character
result = text[0] if text else ""

# Loop through the string starting from the second character
for char in text[1:]:
   if char != result[-1]:  # Compare with the last character in result
       result += char  # Append if different
   
print("String without consecutive duplicate:", result)

