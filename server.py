from flask import Flask, render_template, jsonify, request, redirect, url_for
import pandas as pd
import rpy2.robjects as robjects
import preprocessing as pre;
import os
import test_elmo

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
    birthdate = request.json['birthdate']
    degree = request.json['degree']
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
        'birthdate': [birthdate],
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
    test_elmo.receive_dictionary(r_data)
    return redirect(url_for('results'))

@app.route('/results.html')
def results():
    return render_template('results.html')

if __name__ == "__main__":
    app.run(debug=True)