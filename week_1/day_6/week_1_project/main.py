from flask import Flask, request, jsonify

main = Flask(__name__)

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

@main.route("/", methods=["GET"])
def home_page():
   return jsonify(students)
   # --- API Endpoints ---     
@main.route("/students", methods=["GET"])
def get_students():
   """Retrieve all students with pagination"""
   try:
      page = request.args.get("page", 1, type=int)
      limit = request.args.get("limit", 10, type=int)
      start = (page - 1) * limit
      end = start + limit
      return jsonify(students[start:end])

   except Exception as e:
      return f"Error occurre {e}", 500 
 
@main.route("/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
   """Retrieve a specific student by id"""
   student = next((s for s in students if s["id"] == student_id), None)
   if student:
      return jsonify(student)
   return "error: Student not found", 404

@main.route("/students", methods=["POST"])
def create_student():
   """Create a new student."""
   data = request.get_json()
   new_student = {
      "id": students[-1]["id"] + 1 if students else 1,
      "name": data.get("name"),
      "email": data.get("email"),
      "age": data.get("age"),
      "gender": data.get("gender"),
   }

   students.append(new_student)
   return jsonify(new_student), 201
   
@main.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
   """Update an existing student by id"""
   data = request.get_json()
   student = next((s for s in students if s["id"] == student_id), None)
   if student:
      student["name"] = data.get("name", student["name"])
      student["email"] = data.get("email", student["email"])
      student["age"] = data.get("age", student["age"])
      student["gender"] = data.get("gender", student["gender"])
      return jsonify(student)
   return "error occurre: student not found", 400

@main.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
   """Delete a student by id"""
   global students
   students = [s for s in students if s["id"] != student_id]
   return jsonify({"message":"Student deleted"}), 200
   
if __name__ == "__main__":
   main.run(debug=True)
