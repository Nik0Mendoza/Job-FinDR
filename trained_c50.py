import pandas as pd
import rpy2.robjects as robjects
from rpy2.robjects import pandas2ri

# Load the trained model from R in Python
loaded_model = robjects.r['readRDS']('./static/assets/train/trained_model.rds')

# Now 'loaded_model' contains the model loaded from R, you can use it in Python as needed
# Further processing or predictions with the loaded model

# Read the CSV file into a Pandas DataFrame
new_data = pd.read_csv('./preprocessed_result/result.csv')

# Convert Pandas DataFrame to R DataFrame
pandas2ri.activate()
r_new_data = pandas2ri.py2rpy(new_data)

# Pass the loaded_model object to the R script
robjects.globalenv['loaded_model'] = loaded_model
robjects.globalenv['new_data'] = r_new_data  # Renaming for consistency with R script

# Execute the R script containing the prediction function
robjects.r['source']('./predict_c50.r')

# Make predictions using the loaded model
predictions = robjects.r['custom_predict_function'](loaded_model, new_data)


# Convert R vector to Python list or pandas DataFrame (depending on output)
predicted_values = list(predictions)  # Convert R vector to Python list
# Or if predictions are returned as a pandas DataFrame in Python
# predicted_values = pandas2ri.rpy2py(predictions)

# 'predicted_values' now holds the predictions made by the R-trained model using new_data in Python

print(predictions)