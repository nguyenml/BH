from flask import Flask, render_template, request, redirect

import os

import models

app = Flask(__name__)
app.config.update(DEBUG=True)

@app.route('/')
def hello_world():
    return render_template("main.html")
    return render_template("landing.html")

@app.route('/login', methods=["POST"])
def login():
    print(request.form)
    print("got a login request")
    print(request.form.get('email'))
    print(request.form.get('password'))
    return redirect('/')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
