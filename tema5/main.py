from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mateibarlad'


database = 'database.db'


@app.route("/register", methods=["GET", "POST"])
def register():
    connection = sqlite3.connect(database)
    if request.method == "POST":
        cursor = connection.cursor()

        username = request.form.get("username")
        password = request.form.get("pass")
        password2 = request.form.get("pass2")

        if password != password2:
            flash("Passwords don't match!", 'error')
            return render_template('signup.html')
        else:
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
            connection.commit()
            cursor.close()
            connection.close()
            redirect(url_for("login"))
    return render_template('signup.html')

@app.route("/login", methods=["GET", "POST"])
def login():
    connection = sqlite3.connect(database)

    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("pass")

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
    return render_template('signin.html')

@app.route("/add_note", methods=["GET", "POST"])
def add_note():
    if request.method == "POST":
        connection = sqlite3.connect(database)
        cursor = connection.cursor()

        note_content = request.form.get("note_content")
        if note_content:
            cursor.execute("INSERT INTO notes (note_content) VALUES (?)", (note_content,))
            connection.commit()

        cursor.close()
        connection.close()

        return redirect(url_for('notes'))

    return render_template('add_note.html')



@app.route("/notes")
def notes():
    connection = sqlite3.connect(database)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM notes")
    notes = cursor.fetchall()
    cursor.close()
    connection.close()

    return render_template('notes.html', notes=notes)


if __name__ == "__main__":
    app.run(debug=True)