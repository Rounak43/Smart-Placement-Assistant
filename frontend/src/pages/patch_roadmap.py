import re
import json

questions = [
    {
        "id": 1,
        "questions": [
            {"question": "What is the correct extension for a Python file?", "options": [".pt", ".py", ".pyt", ".python"], "answerIndex": 1},
            {"question": "Which of these is not a core data type in Python?", "options": ["List", "Dictionary", "Class", "Tuple"], "answerIndex": 2},
            {"question": "What keyword is used to define a function in Python?", "options": ["func", "def", "function", "define"], "answerIndex": 1},
            {"question": "How do you insert comments in Python code?", "options": ["// comment", "/* comment */", "# comment", "<!-- comment -->"], "answerIndex": 2},
            {"question": "Which function is used to output text to the console in Python?", "options": ["echo()", "console.log()", "print()", "output()"], "answerIndex": 2},
            {"question": "What is the output of 3 * 'A' in Python?", "options": ["3A", "AAA", "Error", "A A A"], "answerIndex": 1},
            {"question": "How do you create a list in Python?", "options": ["[]", "{}", "()", "<>"], "answerIndex": 0},
            {"question": "Which operator is used to check if two values are equal?", "options": ["=", "==", "===", "!="], "answerIndex": 1},
            {"question": "How to start a conditionally checked block of code?", "options": ["if (x > y):", "if x > y:", "if x > y then:", "if x > y {"], "answerIndex": 1},
            {"question": "What is a dictionary in Python?", "options": ["A list of items", "A set of unique elements", "A collection of key-value pairs", "A tuple of immutable items"], "answerIndex": 2}
        ]
    },
    {
        "id": 2,
        "questions": [
            {"question": "Which library is primary used for data manipulation and analysis?", "options": ["NumPy", "Pandas", "Matplotlib", "Seaborn"], "answerIndex": 1},
            {"question": "What is a 2-dimensional labeled data structure in Pandas called?", "options": ["Series", "DataFrame", "Panel", "Array"], "answerIndex": 1},
            {"question": "Which method is used to read a CSV file in Pandas?", "options": ["read_csv()", "load_csv()", "open_csv()", "get_csv()"], "answerIndex": 0},
            {"question": "What does df.head() do?", "options": ["Returns the last 5 rows", "Returns the first 5 rows", "Returns the column names", "Returns the index"], "answerIndex": 1},
            {"question": "How do you drop missing values in a DataFrame?", "options": ["df.drop()", "df.dropna()", "df.remove_na()", "df.clear()"], "answerIndex": 1},
            {"question": "Which library provides support for large, multi-dimensional arrays?", "options": ["Pandas", "SciPy", "NumPy", "TensorFlow"], "answerIndex": 2},
            {"question": "What is the primary object in NumPy?", "options": ["DataFrame", "ndarray", "Series", "Tensor"], "answerIndex": 1},
            {"question": "How do you get the number of rows and columns in a DataFrame?", "options": ["df.size", "df.shape", "df.dim", "df.length"], "answerIndex": 1},
            {"question": "Which method is used to fill missing values?", "options": ["fillna()", "replace()", "insert()", "update()"], "answerIndex": 0},
            {"question": "What does the groupby() method do in Pandas?", "options": ["Sorts the data", "Splits the data into groups based on some criteria", "Joins two dataframes", "Filters data"], "answerIndex": 1}
        ]
    },
    {
        "id": 3,
        "questions": [
            {"question": "Which mathematical branch deals with vectors and matrices?", "options": ["Calculus", "Linear Algebra", "Probability", "Discrete Math"], "answerIndex": 1},
            {"question": "What represents the middle value in a sorted dataset?", "options": ["Mean", "Median", "Mode", "Variance"], "answerIndex": 1},
            {"question": "Which rule helps in finding the probability of an event based on prior knowledge?", "options": ["Bayes' Theorem", "Law of Large Numbers", "Central Limit Theorem", "Markov's Inequality"], "answerIndex": 0},
            {"question": "What does variance measure?", "options": ["The average value", "The spread of data points from the mean", "The most frequent value", "The geometric mean"], "answerIndex": 1},
            {"question": "What is the standard deviation?", "options": ["Square of variance", "Square root of variance", "Inverse of variance", "Same as variance"], "answerIndex": 1},
            {"question": "What matrix operation changes rows to columns?", "options": ["Inversion", "Multiplication", "Transposition", "Addition"], "answerIndex": 2},
            {"question": "Two vectors are orthogonal if their dot product is:", "options": ["1", "-1", "0", "Infinity"], "answerIndex": 2},
            {"question": "What is an eigenvalue?", "options": ["A scalar associated with a linear system of equations", "A vector that does not change direction upon transformation", "The determinant of a matrix", "The inverse of a matrix"], "answerIndex": 0},
            {"question": "In probability, what is an independent event?", "options": ["An event that never happens", "An event whose outcome does not affect another", "An event with 100% certainty", "An event that relies on a previous outcome"], "answerIndex": 1},
            {"question": "Continuous probability distributions use which calculus concept?", "options": ["Derivatives", "Limits", "Integrals", "Series"], "answerIndex": 2}
        ]
    },
    {
        "id": 4,
        "questions": [
            {"question": "Which plot is best for showing the distribution of a continuous variable?", "options": ["Scatter Plot", "Pie Chart", "Histogram", "Line Chart"], "answerIndex": 2},
            {"question": "Seaborn is built on top of which library?", "options": ["Plotly", "Bokeh", "Matplotlib", "ggplot"], "answerIndex": 2},
            {"question": "Which function in Matplotlib creates a scatter plot?", "options": ["plt.plot()", "plt.scatter()", "plt.bar()", "plt.hist()"], "answerIndex": 1},
            {"question": "What plot is best to show a relationship between two continuous variables?", "options": ["Bar Chart", "Scatter Plot", "Pie Chart", "Box Plot"], "answerIndex": 1},
            {"question": "Which library allows for interactive web-based data visualizations easily?", "options": ["Matplotlib", "Seaborn", "Plotly", "Pandas"], "answerIndex": 2},
            {"question": "What does a box plot prominently display?", "options": ["The mean and standard deviation", "The median and quartiles (IQR)", "All individual data points", "The line of best fit"], "answerIndex": 1},
            {"question": "How do you add a title to a Matplotlib chart?", "options": ["plt.heading()", "plt.title()", "plt.header()", "plt.label()"], "answerIndex": 1},
            {"question": "What Seaborn function creates a matrix showing correlations between variables?", "options": ["sns.heatmap()", "sns.pairplot()", "sns.boxplot()", "sns.lineplot()"], "answerIndex": 0},
            {"question": "Which plot is often discouraged for comparing quantities properly?", "options": ["Bar Chart", "Line Chart", "Pie Chart", "Histogram"], "answerIndex": 2},
            {"question": "How do you show a Matplotlib figure?", "options": ["plt.display()", "plt.print()", "plt.show()", "plt.draw()"], "answerIndex": 2}
        ]
    },
    {
        "id": 5,
        "questions": [
            {"question": "Which learning method uses labeled data?", "options": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Self-supervised Learning"], "answerIndex": 0},
            {"question": "Clustering is a type of...", "options": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"], "answerIndex": 1},
            {"question": "Why do we split data into training and testing sets?", "options": ["To speed up training", "To evaluate model performance on unseen data", "To increase data size", "To reduce memory usage"], "answerIndex": 1},
            {"question": "Predicting house prices (continuous numbers) is an example of:", "options": ["Classification", "Clustering", "Regression", "Dimensionality Reduction"], "answerIndex": 2},
            {"question": "Which type of learning involves an agent learning through rewards and penalties?", "options": ["Supervised Learning", "Semi-supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], "answerIndex": 3},
            {"question": "What is the term for inputs or variables used to make a prediction?", "options": ["Labels", "Targets", "Features", "Outputs"], "answerIndex": 2},
            {"question": "What is a 'label' in ML?", "options": ["The variable we are trying to predict", "A descriptive string for a plot", "A feature of the input data", "A type of algorithm"], "answerIndex": 0},
            {"question": "Overfitting happens when a model:", "options": ["Learns the training data too well, failing on unseen data", "Fails to learn the training data", "Is too simple for the data", "Requires more epochs"], "answerIndex": 0},
            {"question": "What does 'Underfitting' mean?", "options": ["The model performs well on training data only", "The model captures noise in the data", "The model is too simple to capture underlying patterns", "The dataset is too small"], "answerIndex": 2},
            {"question": "Which of these is NOT a step in a typical ML pipeline?", "options": ["Data cleaning", "Feature engineering", "Hardware manufacturing", "Model deployment"], "answerIndex": 2}
        ]
    },
    {
        "id": 6,
        "questions": [
            {"question": "Which algorithm is typically used for Binary Classification?", "options": ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], "answerIndex": 2},
            {"question": "Random Forest is an example of what type of method?", "options": ["Clustering", "Ensemble Learning", "Dimensionality Reduction", "Neural Network"], "answerIndex": 1},
            {"question": "In KNN, what does 'K' represent?", "options": ["Number of classes", "Number of clusters", "Number of nearest neighbors", "Number of features"], "answerIndex": 2},
            {"question": "Which algorithm assumes independence between features?", "options": ["Decision Trees", "SVM", "Naive Bayes", "K-Means"], "answerIndex": 2},
            {"question": "What does SVM stand for?", "options": ["Simple Vector Mechanism", "Support Vector Machine", "Standard Virtual Model", "Subtractive Vector Method"], "answerIndex": 1},
            {"question": "What is the goal of a Decision Tree algorithm?", "options": ["Find a global minimum", "Split data to maximize information gain", "Find principal components", "Cluster unlabelled data"], "answerIndex": 1},
            {"question": "Which is an unsupervised algorithm?", "options": ["Linear Regression", "Logistic Regression", "K-Means Clustering", "Random Forest"], "answerIndex": 2},
            {"question": "What technique combines weak learners into a strong learner sequentially?", "options": ["Bagging", "Boosting", "Stacking", "Voting"], "answerIndex": 1},
            {"question": "What function is used in Logistic Regression to crush values between 0 and 1?", "options": ["ReLU", "Sigmoid", "Tanh", "Softmax"], "answerIndex": 1},
            {"question": "PCA (Principal Component Analysis) is primarily used for:", "options": ["Classification", "Regression", "Dimensionality Reduction", "Clustering"], "answerIndex": 2}
        ]
    },
    {
        "id": 7,
        "questions": [
            {"question": "The harmonic mean of precision and recall is called:", "options": ["Accuracy", "F1 Score", "ROC-AUC", "Specificity"], "answerIndex": 1},
            {"question": "Which metric is most crucial when false positives are highly costly?", "options": ["Recall", "Precision", "Accuracy", "F1 Score"], "answerIndex": 1},
            {"question": "In Scikit-learn, which method is typically used to train a model?", "options": ["train()", "fit()", "predict()", "transform()"], "answerIndex": 1},
            {"question": "Which method applies the trained model to new data to make predictions?", "options": ["predict()", "transform()", "fit_predict()", "evaluate()"], "answerIndex": 0},
            {"question": "What does a confusion matrix display?", "options": ["Network weights", "Hyperparameters", "True positives, false positives, true negatives, false negatives", "Loss function values"], "answerIndex": 2},
            {"question": "Which Scikit-Learn function is used to split data into training and testing sets?", "options": ["split_data()", "train_test_split()", "KFold()", "cross_val_score()"], "answerIndex": 1},
            {"question": "What does Cross-Validation help prevent?", "options": ["Overfitting", "Slow execution", "Data leakage", "Memory errors"], "answerIndex": 0},
            {"question": "RMSE stands for:", "options": ["Root Mean Squared Error", "Ratio Median Scalar Error", "Range Mean Standard Error", "Root Median Squared Entity"], "answerIndex": 0},
            {"question": "Which evaluation metric is typically used for Regression problems?", "options": ["Accuracy", "F1 Score", "Mean Absolute Error (MAE)", "Precision"], "answerIndex": 2},
            {"question": "Hyperparameter tuning is the process of:", "options": ["Cleaning data", "Optimizing model configuration variables not learned during training", "Updating network weights", "Deploying the model"], "answerIndex": 1}
        ]
    },
    {
        "id": 8,
        "questions": [
            {"question": "Which process updates weights in a neural network?", "options": ["Forward propagation", "Backpropagation", "Convolution", "Max pooling"], "answerIndex": 1},
            {"question": "Which is a common activation function?", "options": ["ReLU", "SVM", "KNN", "PCA"], "answerIndex": 0},
            {"question": "What is 'epochs' in the context of neural network training?", "options": ["Number of layers", "Number of neurons", "Number of complete passes through the dataset", "Learning rate"], "answerIndex": 2},
            {"question": "A CNN is specifically designed to perform well on:", "options": ["Tabular data", "Image data", "Time series data", "Text data"], "answerIndex": 1},
            {"question": "What does RNN stand for?", "options": ["Random Neural Network", "Recurrent Neural Network", "Rapid Neural Node", "Reversed Neural Net"], "answerIndex": 1},
            {"question": "What is the purpose of the loss function?", "options": ["To update weights", "To calculate the error between predictions and actual targets", "To initialize parameters", "To speed up computation"], "answerIndex": 1},
            {"question": "Which popular open-source library was developed by Google for deep learning?", "options": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn"], "answerIndex": 1},
            {"question": "What does 'dropout' do in a neural network?", "options": ["Deletes the dataset", "Randomly disables neurons during training to prevent overfitting", "Halts the training loop", "Decreases learning rate"], "answerIndex": 1},
            {"question": "The learning rate controls:", "options": ["The number of epochs", "The batch size", "The size of the step taken towards the minimum of the loss function", "The number of hidden layers"], "answerIndex": 2},
            {"question": "An output layer activation function for multi-class classification is typically:", "options": ["Sigmoid", "ReLU", "Softmax", "Linear"], "answerIndex": 2}
        ]
    },
    {
        "id": 9,
        "questions": [
            {"question": "House price prediction is typically framed as a...", "options": ["Classification problem", "Regression problem", "Clustering problem", "Reinforcement learning problem"], "answerIndex": 1},
            {"question": "Spam filtering often uses which probability-based algorithm?", "options": ["K-Means", "Naive Bayes", "Linear Regression", "PCA"], "answerIndex": 1},
            {"question": "Collaborative filtering is commonly used in:", "options": ["Image classification", "Recommendation systems", "Speech recognition", "Predicting stock prices"], "answerIndex": 1},
            {"question": "Analyzing customer sentiments from reviews is an example of:", "options": ["Computer Vision", "Natural Language Processing (NLP)", "Reinforcement Learning", "Time Series Forecasting"], "answerIndex": 1},
            {"question": "Object detection involves:", "options": ["Translating languages", "Identifying and bounding objects within an image", "Predicting text sequences", "Clustering user behavior"], "answerIndex": 1},
            {"question": "A chatbot uses algorithms from which domain?", "options": ["Computer Vision", "Robotics", "Natural Language Processing (NLP)", "Signal Processing"], "answerIndex": 2},
            {"question": "Predicting future stock prices based on past data is called:", "options": ["Time Series Analysis", "Image Segmentation", "A/B Testing", "Clustering"], "answerIndex": 0},
            {"question": "Which project commonly uses CNNs?", "options": ["Fraud detection in credit cards", "Classifying dogs vs cats from images", "Predicting housing prices", "Customer segmentation"], "answerIndex": 1},
            {"question": "Churn prediction aims to identify:", "options": ["New potential customers", "Customers likely to stop using a service", "The most profitable products", "Inventory shortages"], "answerIndex": 1},
            {"question": "In a Recommendation System, what is Content-Based Filtering based on?", "options": ["User similarities", "Item attributes and features", "Random guessing", "Popularity only"], "answerIndex": 1}
        ]
    },
    {
        "id": 10,
        "questions": [
            {"question": "What is overfitting?", "options": ["Model performs well on test data but poorly on training data", "Model performs well on training data but poorly on test data", "Model performs poorly on both", "Model performs perfectly on both"], "answerIndex": 1},
            {"question": "Which technique helps prevent overfitting?", "options": ["Adding more layers", "Regularization", "Increasing learning rate", "Using smaller datasets"], "answerIndex": 1},
            {"question": "A common format to save and deploy Scikit-learn models is:", "options": [".csv", ".pkl (Pickle)", ".txt", ".json"], "answerIndex": 1},
            {"question": "What does a data scientist spend most of their time doing?", "options": ["Training models", "Deploying APIs", "Data cleaning and preparation", "Presenting to stakeholders"], "answerIndex": 2},
            {"question": "What is an API?", "options": ["Application Programming Interface", "Automated Prediction Instance", "Algorithmic Process Integration", "Applied Python Interface"], "answerIndex": 0},
            {"question": "Which framework is often used to build a web API for ML models in Python?", "options": ["React", "Flask / FastAPI", "Pandas", "PyTorch"], "answerIndex": 1},
            {"question": "During an ML interview, what is a crucial non-technical skill to demonstrate?", "options": ["Typing speed", "Explaining complex concepts simply", "Memorizing whole libraries", "Using multiple keyboards"], "answerIndex": 1},
            {"question": "What is Model Drift?", "options": ["When a model physically moves servers", "When the predictive performance degrades over time as data changes", "When a model learns too fast", "When you switch from Scikit-Learn to TensorFlow"], "answerIndex": 1},
            {"question": "Which of these is a metric to explain a model's feature importance?", "options": ["SHAP values", "R-squared", "Cronbach's alpha", "P-value"], "answerIndex": 0},
            {"question": "Docker is primarily used in ML for:", "options": ["Writing faster code", "Containerizing dependencies and environment for consistent deployment", "Training larger models natively", "Visualizing complex datasets"], "answerIndex": 1}
        ]
    }
]

file_path = "roadmap.jsx"
with open(file_path, "r", encoding='utf-8') as f:
    content = f.read()

# I will find each section like:
# id: 1,
# ...
# questions: [ ... ]
for step in questions:
    step_id = step["id"]
    new_questions_str = "questions: " + json.dumps(step["questions"], indent=12)
    # The regex approach works, I will replace the questions array of that specific step id.
    # regex matches: id: {step_id}, ... questions: [ ... ]
    # A bit tricky across multiple lines.
    
    # Simpler: regex that matches questions: [ ... ], but we need to match the specific step.
    
    # Or just replace the whole ROADMAP_STEPS = [ ... ];
    pass

# Easiest way is to define a regex that captures all ROADMAP_STEPS block 
# and recreates it. But we don't have all the exact icon names and text easily without parsing.
# We CAN just parse the js!

import re

for step in questions:
    step_id = step["id"]
    new_questions = json.dumps(step["questions"], indent=12)
    
    pattern = rf"(id:\s*{step_id},.*?questions:\s*\[).*?(\n\s*\])"
    
    # this might fail with DOTALL if not careful
    content = re.sub(pattern, rf"\1\n            {new_questions[12:-1]}\2", content, flags=re.DOTALL)

with open(file_path, "w", encoding='utf-8') as f:
    f.write(content)

print("Done")
