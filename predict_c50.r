# Load necessary libraries
library(C50)

# Function for prediction using C5.0 model
custom_predict_function <- function(model, new_data) {
    # Perform predictions
    predictions <- predict(model, new_data)
    return(predictions)
}

# Call the function to make predictions
predictions <- custom_predict_function(model = loaded_model, new_data = new_data)

# Return predictions
predictions
