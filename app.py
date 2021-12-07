import os
import json

from flask import Flask
from flask import render_template, request, redirect, url_for
from urllib.request import urlopen

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route("/2d.html")
def Render2D():
    return render_template("2d.html")

@app.route("/3d.html")
def Render3D():
    return render_template("3d.html")

if __name__ == "__main__":
    app.run(debug=True)
