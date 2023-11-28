from flask import Flask, render_template, request
import os
import subprocess
import pandas as pd
import preprocessing as pre


app = Flask(__name__)

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
    

@app.route("/submit", methods=['POST'])
def submit():
    age = request.json['age']
    degree = request.json['program']
    certifications = request.json['certifications']
    training = request.json['training']
    hard_skills = request.json['hard_skills']
    soft_skills = request.json['soft_skills']
    experience_role = request.json['experience_role']
    experience_years = request.json['experience_years']
    experience = request.json['experience_description']

    # Now you can use this data for predictions or any other processing in R
    
    # Placeholder for sending data to R (Replace this with your actual R logic)
    r_data = {
        'age': [age],
        'degree': [degree],
        'certifications': [certifications],
        'training': [training],
        'hard_skills': [hard_skills],
        'soft_skills': [soft_skills],
        'experience_role': [experience_role],
        'experience_years': [experience_years],
        'experience': [experience]
    }
    # You can send this data to your R model for predictions here
    
    print(r_data)
    pre.prepare_features(r_data)

    predictions = subprocess.check_output(["python", "trained_c50.py"]).decode('utf-8')
    print("hello")
    print(predictions)

    return render_template('results.html', predictions=predictions)


if __name__ == "__main__":
    app.run(debug=True)