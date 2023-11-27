from flask import Flask, render_template, jsonify, request
import pandas as pd
import rpy2.robjects as robjects
import os

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

@app.route('/results.html', methods=['POST'])
def results():
    gender = request.form['gender']
    birthdate = request.form['birthdate']
    degree = request.form['degree']
    program = request.form['program']
    certifications = request.form['certifications']
    hard_skills = request.form['hard_skills']
    soft_skills = request.form['soft_skills']
    experience_role = request.form['experience_role']
    experience_years = request.form['experience_years']
    experience_description = request.form['experience_description']

    # Now you can use this data for predictions or any other processing in R
    
    # Placeholder for sending data to R (Replace this with your actual R logic)
    r_data = {
        'gender': gender,
        'birthdate': birthdate,
        'degree': degree,
        'program': program,
        'certifications': certifications,
        'hard_skills': hard_skills,
        'soft_skills': soft_skills,
        'experience_role': experience_role,
        'experience_years': experience_years,
        'experience_description': experience_description
    }

    # You can send this data to your R model for predictions here
    # ...

    # For now, just returning the received data for demonstration purposes
    return render_template('results.html', data=r_data)

if __name__ == "__main__":
    app.run(debug=True)