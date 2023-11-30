from api import *
from flask import Flask, render_template, request, redirect, url_for

import json
import os
import pandas as pd
import preprocessing as pre
import string
import subprocess
import time

app = Flask(__name__)

# Store features so that it could be used site-wide
features = {}

# Store prediction in a variable so it could be used site-wide
prediction = ""

# Check if R_HOME is set, if not, set it
if not os.environ.get('R_HOME'):
    os.environ['R_HOME'] = 'C:\\Program Files\\R\\R-4.3.0'  # Adjust this to your R installation path

@app.route("/")
@app.route("/index.html")
def home():
    return render_template("index.html")

@app.route("/get-started.html")
def get_started():
    return render_template("get-started.html")

@app.route("/get-started-forms.html")
def get_started_forms():
    return render_template("get-started-forms.html")

@app.route('/results')
def result():
    return render_template('results.html')

@app.route('/job-posts/<job>')
def get_job_posts(job):
    return get_adzuna_posts(job) + get_serp_posts(job)
    
@app.route("/submit", methods=['POST'])
def submit():
    global prediction, features

    features["age"] = request.json['age']
    features["degree"] = request.json['program']
    features["certifications"] = request.json['certifications']
    features["training"] = request.json['training']
    features["hard_skills"] = request.json['hard_skills']
    features["soft_skills"] = request.json['soft_skills']
    features["experience_role"] = request.json['experience_role']
    features["experience_years"] = request.json['experience_years']
    features["experience"] = request.json['experience_description']

    prediction = "Computer Engineer"

    return json.dumps({
        "status": 201,
        "message": "Submission success!"
    })

    # Placeholder for sending data to R (Replace this with your actual R logic)
    # r_data = {
    #     'age': [age],
    #     'degree': [degree],
    #     'certifications': [certifications],
    #     'training': [training],
    #     'hard_skills': [hard_skills],
    #     'soft_skills': [soft_skills],
    #     'experience_role': [experience_role],
    #     'experience_years': [experience_years],
    #     'experience': [experience]
    # }
    # You can send this data to your R model for predictions here
    
    # print(r_data)
    # pre.prepare_features(r_data)

    # prediction = subprocess.check_output(["python", "trained_c50.py"]).decode('utf-8')
    # print("hello")
    # print(prediction)
    
    # while "'" in prediction:
    #     prediction = prediction.strip(string.punctuation + string.whitespace)

if __name__ == "__main__":
    app.run(debug=True)