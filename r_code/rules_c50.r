library(partykit)
library(C50)

whole_train_r <- read.csv("./train/whole_train_r.csv")

columns_to_convert <- c("sex", "degree", "job_field", "job_position", "training", "certifications")

for (col in columns_to_convert) {
    whole_train_r[[col]] <- factor(whole_train_r[[col]])
}

whole_train_r$sex[whole_train_r$sex==""] = NA

whole_train_r$sex = droplevels(whole_train_r$sex)


whole_train_r$degree[whole_train_r$degree==""] = NA

whole_train_r$degree = droplevels(whole_train_r$degree)

pathread <- function(model, new_data) {
  if (!inherits(model, "C5.0")) {
    stop("The 'object' must be of class 'C5.0'.")
  }

  new_data$training <- factor(new_data$training)
  new_data$certifications <- factor(new_data$certifications)

  # Convert the 'C5.0' model to a 'party' object
  party_model <- C50::as.party.C5.0(model)

  # Predict the responses
  response <- predict(party_model, newdata = new_data, type = "response")

  # Get the rules for each node
  rls <- partykit:::.list.rules.party(party_model)

  # Get the predicted node and select corresponding rule
  predicted_nodes <- as.character(predict(party_model, newdata = new_data, type = "node"))
  rval <- data.frame(response = response, rule = rls[predicted_nodes])

  return(rval$rule)
}