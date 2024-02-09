import tensorflow.compat.v1 as tf
import tensorflow_hub as hub
import os

# Disable eager execution
tf.disable_eager_execution()

# Create 'elmo' directory if it doesn't exist
elmo_dir = './elmo/variables/variables_temp'
if not os.path.exists(elmo_dir):
    os.makedirs(elmo_dir)

# Load ELMo model from TensorFlow Hub
elmo = hub.Module("https://tfhub.dev/google/elmo/3", trainable=True)

# Initialize variables
init_op = tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init_op)
    # Save ELMo model to the 'elmo' directory
    elmo.export('./elmo', sess)
