import csv
import os
import pandas as pd
import time

#### CONSTANTS ####

# replace with actual file name
CSV = "[file name here]"

TEMP_DIR = "temp"
TEMP_PATH = "temp.csv"

METRICS_PATH = "metrics"
METRICS_DIR = "metrics.csv"

CLASSIFICATIONS = [
    # put job positions here
]


#### START OF PROCESS ####
start = time.perf_counter()

df = pd.read_csv(CSV)
df_dict = df.apply(lambda x: x.to_dict(), axis=1).tolist()

if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

# matrix
confusion_matrix = [ [ 0 for _ in range(len(CLASSIFICATIONS)) ] for _ in range(len(CLASSIFICATIONS)) ]

# performance metrics
metrics_per_fold = {}

count = 0

# prediction phase of test set
for resume_data in df_dict:
    # track prediction count
    count += 1

    # target value
    target = resume_data["job_position"]

    # create csv file for the model to use in prediction
    path = os.path.join(TEMP_DIR, TEMP_PATH)
    with open(path, "w", newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        to_csv = [ 
            list(resume_data.keys()),
            [ value for value in resume_data.values() ]
        ]
        for row in to_csv:
            csv_writer.writerow(row)
    
    #### PREDICT HERE #####
    # prediction = ??? # R code here
            
    # increment prediction in confusion matrix
    target_index = CLASSIFICATIONS.index(target)
    prediction_index = CLASSIFICATIONS.index(prediction)
    confusion_matrix[target_index][prediction_index] += 1

    # calculate metrics for each fold
    if count % 40 == 0 or count == len(df_dict) - 1:
        tp = 0
        tn = 0
        fp = 0
        fn = 0

        for index in range(len(confusion_matrix)):
            tp += confusion_matrix[index][index]
            fn += sum([ confusion_matrix[index][i] for i in range(len(confusion_matrix)) if i != index ])
            fp += sum([ confusion_matrix[i][index] for i in range(len(confusion_matrix)) if i != index ])
            tn += sum(
                [ sum([ confusion_matrix[i][j] for j in range(len(confusion_matrix)) if j != index ]) ]
                for i in range(len(confusion_matrix)) if i != index
            )

            # calculate metrics
            precision = tp / (tp + fp)
            recall = tp / (tp + fn)
            f1_score = 2 * (precision * recall / (precision + recall))

            # prepare fold update
            fold = count // 40 if count != len(df_dict) - 1 else count // 40 + 1
            metrics_per_fold[fold] = {
                "TP": tp,
                "TN": tn,
                "FP": fp,
                "FN": fn,
                "Precision": precision,
                "Recall": recall,
                "F1-Score": f1_score
            }
        
        # reset confusion matrix for each fold
        for i in range(len(confusion_matrix)):
            for j in range(len(confusion_matrix)):
                confusion_matrix[i][j] = 0

#### FINALIZE ####
os.remove(path=os.path.join(TEMP_DIR, TEMP_PATH))
os.rmdir(path=TEMP_DIR)

# create results csv
os.mkdir(METRICS_PATH)
path = os.path.join(METRICS_DIR, METRICS_PATH)
with open(path, "w", newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    
    total_metrics = [ "TOTAL", 0, 0, 0, 0, 0.0, 0.0, 0.0 ]
    for metric in metrics_per_fold.values():
        total_metrics[1] += metric["TP"]
        total_metrics[2] += metric["TN"]
        total_metrics[3] += metric["FP"]
        total_metrics[4] += metric["FN"]
        total_metrics[5] += metric["Precision"]
        total_metrics[6] += metric["Recall"]
        total_metrics[7] += metric["F1-Score"]
    
    total_metrics[5] = total_metrics[5] / len(metrics_per_fold)
    total_metrics[6] = total_metrics[6] / len(metrics_per_fold)
    total_metrics[7] = total_metrics[7] / len(metrics_per_fold)

    to_csv = [
        ["fold", *metrics_per_fold.keys()],
        ([ k, *v ] for k, v in metrics_per_fold.items()),
        total_metrics
    ]

    csv_writer.writerows(to_csv)

# END OF PROCESS
elapsed = time.perf_counter() - start
minutes = int(elapsed // 60)
seconds = int(elapsed % 60)

print(f"Done! Took {minutes}m {seconds}s!")