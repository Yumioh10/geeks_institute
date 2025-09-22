
# createa set of my favorite numbers
my_fav_numbers = [7, 5, 9, 8]
print("My favorite numbers are:", (my_fav_numbers))

# add two new numbers to the list
my_fav_numbers.append(1)
my_fav_numbers.append(3)
print("after adding two other favorite numbers:",my_fav_numbers)

# remove the last number of the list
my_fav_numbers.remove(5)
print("After removing the last number:", my_fav_numbers)

# create a set of friend's favorite numbers
friend_fav_numbers = [4, 5, 1, 7]
print("My friend's favorite numbers are:", (friend_fav_numbers))

# Concatenate both sets
our_favorite_numbers = my_fav_numbers + friend_fav_numbers
print("Our favorite numbers are:", our_favorite_numbers)