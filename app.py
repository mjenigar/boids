import os
import json

from flask import Flask
from flask import render_template, request, redirect, url_for
from urllib.request import urlopen

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
