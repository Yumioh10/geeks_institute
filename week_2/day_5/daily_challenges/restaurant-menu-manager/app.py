import psycopg2
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Database configuration
DB_HOST = "localhost"
DB_NAME = "restaurant_db"
DB_USER = "postgres"
DB_PASSWORD = "Pass.postgresql"
DB_PORT = "5432"

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

@app.route('/menu')
def get_menu():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM Menu_Items;')
    items = cur.fetchall()
    return 
    return render_template('menu.html', title='Menu')

# CREATE - Adding new menu item
@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST': # Get data from form
        item_name = request.form['item_name']
        item_price = request.form['item_price']
        
        # Add a new item to the Menu_Items table using SQL
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s);",
            (item_name, item_price)
        )
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('get_menu'))
    return render_template('add_item.html', title='Add Menu Item')

# READ - Viewing Data
@app.route('/menu/<int:item_id>')
def view_item(item_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM Menu_Items WHERE item_id = %s;', (item_id,))
    item = cur.fetchone()
    cur.close()
    conn.close()
    if item is None:
        return "Item not found", 404
    return render_template('menu.html', items=[item], title='Menu')

# UPDATE - Editing existing menu item
@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM Menu_Items WHERE item_id = %s;', (item_id,))
    item = cur.fetchone()
    if request.method == 'POST':
        item_name = request.form['item_name']
        item_price = request.form['item_price']
        cur.execute(
            "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_id = %s;",
            (item_name, item_price, item_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return redirect(url_for('get_menu'))
    cur.close()
    conn.close()
    if item is None:
        return "Item not found", 404
    return render_template('update_item.html', item=item, title='Update Item')

# DELETE - Removing a menu item
@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM Menu_Items WHERE item_id = %s;', (item_id,))
    conn.commit()
    cur.close()
    conn.close()
    return redirect(url_for('get_menu'))

if __name__ == '__main__':
    app.run(debug=True)
