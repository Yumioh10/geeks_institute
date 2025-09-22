# ask user for a number and a length
number = int(input("Enter a number:"))
length = int(input("Enter a length:"))

# Generate the list of multiples
multiples = [number * i for i in range(1, length +1)]

# Print the result
print(f"The first {length} multiples of {number} are:")
print(multiples)