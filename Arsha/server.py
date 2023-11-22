from flask import Flask, render_template

app = Flask(__name__)

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
  
if __name__ == "__main__":
  app.run(debug=True)