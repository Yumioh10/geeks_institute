import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from flask import Flask, request, jsonify

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
def connect_db():
    """ Connect to the database """

    try:
        conn = psycopg2.connect(
            host=os.getenv("DATABASE_HOST"),
            port=os.getenv("DATABASE_PORT"),
            database=os.getenv("DATABASE_DB"),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            cursor_factory=RealDictCursor
        )
    except psycopg2.OperationalError as e:
        print(e)
        return None
    # pylint: disable=W0718
    except Exception as e:
        print(e)
        return None

    return conn

@app.route("/menu", methods=['GET'])
def get_menu():
    """ Index route """

    conn = connect_db()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM Menu_Items")
    menu_items = cursor.fetchall()

    conn.close()

    return jsonify({"Menu_Items": menu_items})

@app.route("/menu/<int:item_id>", methods=['GET'])
def get_item(item_id):
    """ Get an item by id """

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Menu_Items WHERE item_id = %s", (item_id,))
    item = cursor.fetchone()
    conn.close()

    return jsonify({"item": item})

@app.route("/menu", methods=["POST"])
def create_item():
    """ Create an item """

    data = request.json
    conn = connect_db()
    cursor = conn.cursor()

    values = (
        data.get("item_name"),
        data.get("item_price")
    )

    query = """
                INSERT INTO Menu_Items 
                (item_name, item_price) 
                VALUES (%s, %s)
                RETURNING *
            """

    cursor.execute(
        query,
        values
    )

    conn.commit()

    item = cursor.fetchone()

    conn.close()

    return jsonify({"message": "item created successfully", "item": item})


@app.route("/menu/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    """ Update an item """

    data = request.json
    
    if not data:
        # Handle case where no JSON is sent
      return jsonify({"error": "Missing JSON data in request"}), 400
    
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT item_id, item_name, item_price FROM Menu_Items WHERE item_id = %s", (item_id,))
    item = cursor.fetchone()
    if item is None:
    # Item not found
        conn.close()
        return jsonify({"message": f"Item with ID {item_id} not found"}), 404
    
    item_name = data.get("item_name")
    item_price = data.get("item_price")
    
    values = (
        item_name,
        item_price,
        item_id
        )

    query = """
        UPDATE Menu_Items 
        SET 
            item_name = %s, 
            item_price = %s 
        WHERE item_id = %s
        RETURNING item_id, item_name, item_price
        """
    cursor.execute(
        query,
        values
        )

    conn.commit()

    item = cursor.fetchone()

    conn.close()

    return jsonify({
        "message": "item updated successfully",
        "item": item
    })


@app.route("//menu/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    """ Delete an item """
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Menu_Items WHERE item_id = %s", (item_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Item deleted successfully"})


if __name__ == "__main__":
    app.run(debug=True)
