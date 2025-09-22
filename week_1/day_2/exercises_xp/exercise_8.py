import random
def star_war_quiz(): # quiz Data
    data = [
        {
            "question": "What is Baby Yoda's real name?",
            "answer": "Grogu"
        },
        {
            "question": "Where did Obi-Wan take Luke after his birth?",
            "answer": "Tatooine"
        },
        {
            "question": "What year did the first Star Wars movie come out?",
            "answer": "1977"
        },
        {
            "question": "Who built C-3PO?",
            "answer": "Anakin Skywalker"
        },
        {
            "question": "Anakin Skywalker grew up to be who?",
            "answer": "Darth Vader"
        },
        {
            "question": "What species is Chewbacca?",
            "answer": "Wookiee"
        }
    ]

    # 1. Create a function that check the answers
    correct_count = 0
    incorrect_count = 0
    wrong_answers_list = []

    print("Welcome to the Star Wars Quizz!")
    
    # Shuffle questions for variety
    random.shuffle(data)
    total_questions = len(data)

    # Ask each question
    for i, qa in enumerate(data, 1):
        question = qa["question"]
        correct_answer = qa["answer"]
        print(f"Question {i}/{total_questions}:")
        print(f"{question}")

        user_answer = input("Your answer: ").strip()

        # Check if answer is correct (case-insensitive)
        if user_answer.lower() == correct_answer.lower():
            print("Correct! You get it\n")
            correct_count += 1
        else:
            print(f" Incorrect. The right answer is: {correct_answer}\n")

            incorrect_count += 1
            # Add th wrong answers list with details
            wrong_answers_list.append({
                "question": question,
                "user_answer": user_answer,
                "correct_answer": correct_answer
            })
    # Display final results
    print("QUIZ RESULT SUMMARY")
    print("=" * 30)
    print(f"Total Questions: {total_questions}")
    print(f"Correct Answers: {correct_count}")
    print(f"Incorrect Answers: {incorrect_count}")

    percentage = (correct_count / total_questions) * 100
    print(f"Percentage: {percentage:.1f}%")

    # Display wrong answers if any
    if wrong_answers_list:
        print(f"\n Questions you got wrong ({len(wrong_answers_list)}):")
        print("-" * 50)
        for i, wrong in enumerate(wrong_answers_list, 1):
            print(f"{i}. Question: {wrong['question']}")
            print(f"    Your answer: {wrong['user_answer']}")
            print(f"    Correct answer: {wrong['correct_answer']}")
            print("-" * 30)
    else:
        print("\n Amazing! You got all questions correct!")  

    # Ask to play again if more than 3 wrong answers
    if incorrect_count > 3:
        print("\n You had more than 3 wrong answers. Would you like to play again?")
        play_again = input("Play again? (yes/no): ").strip().lower()
        if play_again in ['yes', 'y', 'yeah', 'yep']:
            print("\n" + "="*50)
            print("STARTING NEW QUIZ SESSION")
            print("="*50 + "\n")
            return star_war_quiz() # Call the function to play again

    # Return the results as a dictionary
    return {
        "total_questions": total_questions,
        "correct_answers": correct_count,
        "incorrect_answers": incorrect_count,
        "percentage": percentage,
        "wrong_answers": wrong_answers_list
    }

# Launch the function
if __name__ == "__main__":
    # Run the quiz and get results
    quiz_results = star_war_quiz()

    # You can access the individual results :
    print(f"\n Results dictionary available for further processing:")
    print(f"Correct answers: {quiz_results['correct_answers']}")
    print(f"Wrong answers count: {quiz_results['incorrect_answers']}")
    print(f"Wrong answers details: {len(quiz_results['wrong_answers'])} items in list")
