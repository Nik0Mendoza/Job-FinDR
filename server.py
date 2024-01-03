import api
from flask import Flask, render_template, request, redirect, url_for

import json
import os
import pandas as pd
import preprocessing as pre
import requests
import string
import subprocess
import time

import preprocessing as pre

app = Flask(__name__)

# Store features so that it could be used site-wide
features = {}

# Store prediction in a variable so it could be used site-wide
common_prediction = ""
added_prediction = ""

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

@app.route("/results")
def result():
    return render_template("results.html", common=common_prediction, added=added_prediction)

@app.route("/job-posts")
def get_job_posts():
    """
    Retrieve job posts from Adzuna and SerpAPI according to the predicted job role
    recorded after running the `submit` method.

    Normally, this should not be how a usual RESTful API be documented (and created).
    But since this is a special case anyway, one should just be mindful instead of 
    the industry standard.

    The usual behavior should be to GET something from the server with a QUERY; that is,
    the predicted job role as the keyword.
    """

    common_posts = api.get_serp_posts(common_prediction) + api.get_adzuna_posts(common_prediction)
    added_posts = api.get_serp_posts(added_prediction) + api.get_adzuna_posts(added_prediction)

    return json.dumps({
        "status": 200,
        "common": common_posts,
        "added": added_posts
    })

@app.route("/parsed-data", methods=['POST'])
def get_parsed_data():
    """Tap into Resume Parser API and parse the file through the link passed."""
    uploaded_file = request.files['file']
    return api.get_parsed_data(uploaded_file)

@app.route("/submit", methods=['POST'])
def submit():
    global common_prediction, added_prediction, features, rules, job_field

    features["age"] = request.json['age']
    features["sex"] = request.json['sex']
    features["degree"] = request.json['program']
    features["certifications"] = request.json['certifications']
    features["training"] = request.json['training']
    features["hard_skills"] = request.json['hard_skills']
    features["soft_skills"] = request.json['soft_skills']
    features["experience_role"] = request.json['experience_role']
    features["experience_years"] = request.json['experience_years']
    features["experience"] = request.json['experience_description']
    features["job_field"] = request.json['job_field']
    
    job_field = features["job_field"]
    job_field_lower = job_field[0].lower()

    print(job_field_lower)

    pre.prepare_features(features, field=job_field_lower)

    print(features)
    
    added_prediction = subprocess.check_output(["python", "additional_trained_c50.py"]).decode('utf-8')
    common_prediction = subprocess.check_output(["python", "common_trained_c50.py"]).decode('utf-8')
    rules = subprocess.check_output(["python", "print_rules.py"]).decode('utf-8')
    print("hello")

    print(rules)
    # print(prediction)

    #common_prediction = "Computer Engineer"
    #added_prediction = "Developer"

    while "'" in common_prediction:
        common_prediction = common_prediction.strip(string.punctuation + string.whitespace)

    while "'" in added_prediction:
        added_prediction = added_prediction.strip(string.punctuation + string.whitespace)


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

@app.route('/results/index.html')
def result_index():
    return render_template('./index.html')

@app.route('/results/get-started-forms.html')
def result_get_started():
    return render_template('./get-started-forms.html')

if __name__ == "__main__":
    app.run(debug=True)