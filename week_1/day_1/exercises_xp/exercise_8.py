# create a list of sandwich orders
sandwich_orders = ["Tuna sandwich","Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
print(sandwich_orders)

# Remove all Pastrami sandwich
while "Pastrami sandwich" in sandwich_orders:
   sandwich_orders.remove("Pastrami sandwich")
print("Sorry, we run out of Pastrami, the available orders are: ",sandwich_orders)

# We need to prepare the orders of the clients:
# Create an empty list 
finished_sandwiches = []

# remove sandwish from sandwich_orders and add them to the finished_sandwiches list
order_1, order_2, order_3, order_4 = sandwich_orders
finished_sandwiches.append(order_1)
finished_sandwiches.append(order_2)
finished_sandwiches.append(order_3)
finished_sandwiches.append(order_4)
sandwich_orders = []
print("I made your",finished_sandwiches[0])
print("I made your",finished_sandwiches[1])
print("I made your",finished_sandwiches[2])
print("I made your",finished_sandwiches[3])

