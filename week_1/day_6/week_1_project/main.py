import json
from flask import Flask, request, jsonify, abort
from werkzeug.exceptions import HTTPException

main = Flask(__name__)

# Initial Data
students = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 20,
        "gender": "male",
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 21,
        "gender": "female",
    },
    {
        "id": 3,
        "name": "Jim Doe",
        "email": "jim.doe@example.com",
        "age": 22,
        "gender": "male",
    },
    {
        "id": 4,
        "name": "Jill Doe",
        "email": "jill.doe@example.com",
        "age": 23,
        "gender": "female",
    },
    {
        "id": 5,
        "name": "Jack Doe",
        "email": "jack.doe@example.com",
        "age": 24,
        "gender": "male",
    }
]

# get the next available id
next_id = len(students) + 1

# --- API Endpoints ---     
@main.route("/students", methods=["GET"])
def get_all_students():
    """Retrieve all students with pagination"""
    try:
        page = request.args.get("page", 1, type=int)
        limit = request.args.get("limit", 10, type=int)

        if page < 1 or limit < 1:
            abort(400, "Page and limit must be positive integers.")
            
        start_index = (page - 1) * limit
        end_index = start_index + limit
        paginated_students = students[start_index:end_index]
            
        return jsonify({
            "students": paginated_students,
            "page": page,
            "limit": limit
        })
    except Exception as e:
        abort(500, description="Failed to retrieve students.")
 
@main.route("/students/<int:id>", methods=["GET"])
def get_student(id):
    """Retrieve a specific student by id"""
    student = next((s for s in students if s["id"] == id), None)
    if student is None:
        abort(404)
        return jsonify(student)

@main.route("/students", methods=["POST"])
def create_student():
    """Create a new student"""
    global next_id
    data = request.json

    if not data or any(field not in data for field in ["name", "email", "age", "gender"]):
        abort(400, description="Invalid student data. Missing required fields.")

    new_student = {
        "id": next_id,
        "name": data["name"],
        "email": data["email"],
        "age": data["age"],
        "gender": data["gender"],
    }
    students.append(new_student)
    next_id += 1

    return jsonify(new_student), 201

@main.route("/student/<int:id>", methods=["PUT"])
def update_student(id):
    """Update an existing student student by id"""
    data = request.json
    student = next((s for s in students if s["id"] == id), None)

    if student is None:
        abort(404)
    if not data:
        abort(400, description="No data provided for update.")

    student["name"] = data.get("name", student["name"])
    student["email"] = data.get("email", student["email"])
    student["age"] = data.get("age", student["age"])
    student["gender"] = data.get("gender", student["gender"])

    return jsonify(student), 200

@main.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    """Deletes a student by id"""
    global students
    student_to_delete = next((s for s in students if s["id"] == id), None)
    
    if student_to_delete is None:
        abort(404)

    students= [s for s in students if s["id"] != id]
    return jsonify(student_to_delete), 200

#--- Error Handlers ---
@main.errorhandler(404)
def page_not_found(e):
    """Handles 404 Not found errors, returning a JSON response"""
    return jsonify({"error": "Not found"}), 404

@main.errorhandler(Exception)
def handle_exception(e):
    """Handles all exception, returning a generic JSON response with error details"""
    # Pass throught HTTP errors
    if isinstance(e, HTTPException):
        return e

    # Handle other exceptions
    main.logger.error(f"An unexpected error occurred: {e}", exc_info=True)
    return jsonify({
        "error": "An error occurred",
        "message": str(e)
    }), 500


    
if __name__ == "__main__":
   main.run(host="0.0.0.0", port=5000, debug=True)
