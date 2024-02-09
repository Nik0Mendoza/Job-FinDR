# Load necessary libraries
library(C50)

# Function for prediction using C5.0 model
custom_predict_function <- function(model, new_data) {
    # Perform predictions
    predictions <- predict(model, new_data)
    return(toString(predictions))
}
