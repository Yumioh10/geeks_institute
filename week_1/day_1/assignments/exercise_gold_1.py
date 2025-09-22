while True:
    month = int(input("Enter a month number (1-12): "))
    if month in range(1, 13): # only accept number from 1 to 12
        # Determine the season
        if month in range(3, 6):
            print("The season is Spring ")
        elif month in range(6, 9):
            print("The season is Summer ")
        elif month in range(9, 12):
            print("The season is Autumn ")   
        else: # month in (12, 1, 2)
            print("The season is Winter ")
        break
    else:
        print("Invalid month number. Please enter a number between 1 and 12.") 

