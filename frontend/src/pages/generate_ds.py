import json
import os

STEPS = [
    {
        "id": 1,
        "title": "Python Programming Basics",
        "description": "Topics: variables, data types, loops, functions, lists, dictionaries, basic scripting.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which of the following is a mutable data type in Python?",
                "options": ["Tuple", "String", "List", "Integer"],
                "answerIndex": 2
            },
            {
                "question": "What keyword is used to define a function in Python?",
                "options": ["func", "def", "function", "define"],
                "answerIndex": 1
            },
            {
                "question": "How do you create a dictionary in Python?",
                "options": ["{}", "[]", "()", "<>"],
                "answerIndex": 0
            },
            {
                "question": "Which method adds an element to the end of a list?",
                "options": ["insert()", "add()", "append()", "extend()"],
                "answerIndex": 2
            },
            {
                "question": "What does the 'len()' function do?",
                "options": ["Finds the length of a string or list", "Calculates the logarithm", "Converts a list to a dictionary", "Loops through items"],
                "answerIndex": 0
            },
            {
                "question": "How do you start a 'for' loop in Python?",
                "options": ["for i = 1 to 10:", "for i in range(10):", "for (i = 0; i < 10; i++)", "loop(10):"],
                "answerIndex": 1
            },
            {
                "question": "What is the output of type(10.5)?",
                "options": ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'decimal'>"],
                "answerIndex": 1
            },
            {
                "question": "Which operator is used for exponentiation in Python?",
                "options": ["^", "**", "//", "%%"],
                "answerIndex": 1
            },
            {
                "question": "How do you comment out a single line in Python?",
                "options": ["//", "/*", "<!--", "#"],
                "answerIndex": 3
            },
            {
                "question": "What will 3 // 2 return in Python 3?",
                "options": ["1.5", "1", "2", "Error"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 2,
        "title": "Python for Data Analysis",
        "description": "Topics: NumPy, Pandas, DataFrames, reading CSV files, data cleaning and preprocessing.",
        "icon": "AnalyticsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does Pandas use to represent 2-dimensional data?",
                "options": ["Series", "Array", "DataFrame", "Matrix"],
                "answerIndex": 2
            },
            {
                "question": "How do you import the Pandas library using standard conventions?",
                "options": ["import pandas as pd", "import pd from pandas", "require pandas as pd", "include pandas"],
                "answerIndex": 0
            },
            {
                "question": "Which NumPy function is used to create an array evenly spaced over a specified interval?",
                "options": ["np.array()", "np.linspace()", "np.zeros()", "np.matrix()"],
                "answerIndex": 1
            },
            {
                "question": "How do you read a CSV file using Pandas?",
                "options": ["pd.read_excel('file.csv')", "pd.open_csv('file.csv')", "pd.read_csv('file.csv')", "pd.load_csv('file.csv')"],
                "answerIndex": 2
            },
            {
                "question": "What attribute gives the dimensions (rows, columns) of a Pandas DataFrame?",
                "options": [".shape", ".size", ".dimensions", ".len"],
                "answerIndex": 0
            },
            {
                "question": "What does the method df.head() do?",
                "options": ["Shows the column headers only", "Shows the first 5 rows of the DataFrame by default", "Shows the top values", "Sorts the DataFrame"],
                "answerIndex": 1
            },
            {
                "question": "How do you handle missing values in a DataFrame by dropping them?",
                "options": ["df.fillnull()", "df.remove_na()", "df.dropna()", "df.deletenull()"],
                "answerIndex": 2
            },
            {
                "question": "Which NumPy method creates an array filled with zeros?",
                "options": ["np.empty()", "np.null()", "np.zeros()", "np.blank()"],
                "answerIndex": 2
            },
            {
                "question": "What is a Pandas Series?",
                "options": ["A 1-dimensional labeled array", "A multi-dimensional table", "A NumPy matrix", "A SQL database table"],
                "answerIndex": 0
            },
            {
                "question": "How do you select a single column 'Age' from a DataFrame 'df'?",
                "options": ["df('Age')", "df['Age']", "df.select('Age')", "df[Age]"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 3,
        "title": "Statistics Fundamentals",
        "description": "Topics: mean, median, mode, probability, distributions, standard deviation.",
        "icon": "FunctionsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the Mean of a dataset?",
                "options": ["The middle value", "The most frequent value", "The average of all values", "The difference between max and min"],
                "answerIndex": 2
            },
            {
                "question": "Which measure of central tendency is least affected by outliers?",
                "options": ["Mean", "Median", "Mode", "Variance"],
                "answerIndex": 1
            },
            {
                "question": "What does Standard Deviation measure?",
                "options": ["The total sum of data", "The spread or dispersion of data around the mean", "The peak of the distribution", "The median value"],
                "answerIndex": 1
            },
            {
                "question": "In a Normal Distribution, approximately what percentage of data falls within one standard deviation of the mean?",
                "options": ["50%", "68%", "95%", "99.7%"],
                "answerIndex": 1
            },
            {
                "question": "What is the Mode of this dataset: [2, 4, 4, 6, 8]?",
                "options": ["4.8", "4", "6", "2"],
                "answerIndex": 1
            },
            {
                "question": "What is Variance?",
                "options": ["The square root of standard deviation", "The square of standard deviation", "The difference between mean and median", "The ratio of maximum to minimum"],
                "answerIndex": 1
            },
            {
                "question": "Which distribution describes the probability of an event (success/failure) occurring exactly k times in n independent trials?",
                "options": ["Normal Distribution", "Poisson Distribution", "Binomial Distribution", "Exponential Distribution"],
                "answerIndex": 2
            },
            {
                "question": "What is a p-value in hypothesis testing?",
                "options": ["The probability of making a Type I error", "The probability of making a Type II error", "The probability of observing the test results given that the null hypothesis is true", "The power of the test"],
                "answerIndex": 2
            },
            {
                "question": "What does a negative correlation coefficient (-1) imply?",
                "options": ["No relationship between variables", "Perfect positive linear relationship", "Perfect negative linear relationship", "A weak negative relationship"],
                "answerIndex": 2
            },
            {
                "question": "What is the Median of this dataset: [1, 3, 3, 6, 7, 8, 9]?",
                "options": ["4", "5", "6", "3"],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 4,
        "title": "Data Visualization",
        "description": "Topics: Matplotlib, Seaborn, charts, graphs, dashboards, storytelling with data.",
        "icon": "InsertChartIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which Python library is the foundational plotting library upon which Seaborn is built?",
                "options": ["Plotly", "Bokeh", "Matplotlib", "ggplot2"],
                "answerIndex": 2
            },
            {
                "question": "Which chart type is best for showing the distribution of a single continuous variable?",
                "options": ["Pie Chart", "Histogram", "Scatter Plot", "Bar Chart"],
                "answerIndex": 1
            },
            {
                "question": "In Matplotlib, what command is typical to display the plot?",
                "options": ["plt.plot()", "plt.show()", "plt.display()", "plt.render()"],
                "answerIndex": 1
            },
            {
                "question": "Which chart type is best for visualizing the relationship (correlation) between two numerical variables?",
                "options": ["Scatter Plot", "Bar Chart", "Box Plot", "Pie Chart"],
                "answerIndex": 0
            },
            {
                "question": "What does a Box Plot (Box-and-Whisker plot) effectively show?",
                "options": ["Individual data points over time", "The exact mean of the data", "Quartiles, median, and potential outliers", "The total count of categories"],
                "answerIndex": 2
            },
            {
                "question": "Which Seaborn function easily creates a matrix of scatter plots for pairwise relationships in a dataset?",
                "options": ["sns.heatmap()", "sns.pairplot()", "sns.boxplot()", "sns.scatterplot()"],
                "answerIndex": 1
            },
            {
                "question": "What is the primary advantage of Seaborn over pure Matplotlib?",
                "options": ["It processes data faster", "It uses 3D hardware acceleration", "It provides beautiful default styles and high-level interfaces for statistical graphics", "It can write data directly to databases"],
                "answerIndex": 2
            },
            {
                "question": "Which visualization is best to show proportion or composition as a whole (though often critiqued by data scientists)?",
                "options": ["Histogram", "Pie Chart", "Line Chart", "Violin Plot"],
                "answerIndex": 1
            },
            {
                "question": "How do you add a title to a Matplotlib plot?",
                "options": ["plt.title('My Title')", "plt.header('My Title')", "plt.name('My Title')", "plt.top('My Title')"],
                "answerIndex": 0
            },
            {
                "question": "What is a Heatmap primarily used for in Data Science?",
                "options": ["Measuring CPU temperature", "Visualizing 3D models", "Visualizing a correlation matrix or 2D density", "Plotting time series forecasting"],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 5,
        "title": "Data Wrangling and Preprocessing",
        "description": "Topics: handling missing values, feature scaling, normalization, encoding categorical data.",
        "icon": "AccountTreeIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the purpose of One-Hot Encoding?",
                "options": ["To compress image data", "To convert categorical data into a binary matrix format suitable for ML algorithms", "To encrypt sensitive data", "To normalize numerical data to a 0-1 scale"],
                "answerIndex": 1
            },
            {
                "question": "What does 'Imputation' refers to in data preprocessing?",
                "options": ["Deleting rows with missing values", "Filling in missing data with estimated values (like mean or median)", "Detecting outliers", "Scaling features"],
                "answerIndex": 1
            },
            {
                "question": "What is Feature Scaling?",
                "options": ["Increasing the number of features using polynomial expansion", "Standardizing or normalizing the range of independent variables or features", "Selecting the most important features", "Encoding categorical text to numbers"],
                "answerIndex": 1
            },
            {
                "question": "Which scaling technique scales data so it has a mean of 0 and standard deviation of 1?",
                "options": ["Min-Max Scaling", "Normalization", "Standardization (Z-score scaling)", "Robust Scaling"],
                "answerIndex": 2
            },
            {
                "question": "Which scaling technique usually rescale features to [0, 1] range?",
                "options": ["Min-Max Scaling", "Standardization", "Log Transformation", "Z-score scaling"],
                "answerIndex": 0
            },
            {
                "question": "What is an Outlier in a dataset?",
                "options": ["A missing value", "A data point that differs significantly from other observations", "A categorical variable that cannot be encoded", "A duplicate record"],
                "answerIndex": 1
            },
            {
                "question": "Why is it important to scale features before applying algorithms like K-Nearest Neighbors (KNN)?",
                "options": ["It converts strings to numbers", "Algorithms based on distance metrics perform poorly if features have vastly different scales", "It removes missing values automatically", "It prevents overfitting by reducing dimensions"],
                "answerIndex": 1
            },
            {
                "question": "What is Label Encoding?",
                "options": ["Creating binary columns for each category", "Assigning a unique integer to each category label", "Labeling outliers dynamically", "Removing all labels from a DataFrame"],
                "answerIndex": 1
            },
            {
                "question": "When might Label Encoding be problematic for nominal (unordered) categorical variables (e.g., Colors)?",
                "options": ["It creates too many columns", "It takes up too much memory", "ML algorithms might misinterpret the integer values as having a mathematical order/hierarchy", "It cannot assign Negative numbers"],
                "answerIndex": 2
            },
            {
                "question": "What does PCA (Principal Component Analysis) primarily achieve?",
                "options": ["Handling missing values", "Dimensionality reduction while keeping most of the variance", "Clustering similar data points", "Classifying images"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 6,
        "title": "Machine Learning Basics",
        "description": "Topics: supervised learning, unsupervised learning, training vs testing data, model evaluation.",
        "icon": "ModelTrainingIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is Supervised Learning?",
                "options": ["Learning without any human intervention", "Training a model on labeled data mapping inputs to known outputs", "Clustering data based on hidden patterns without labels", "Learning via reward/punishment feedback"],
                "answerIndex": 1
            },
            {
                "question": "Which of these is an example of Unsupervised Learning?",
                "options": ["Predicting house prices", "Classifying spam emails", "Customer segmentation using Clustering", "Recognizing handwritten digits"],
                "answerIndex": 2
            },
            {
                "question": "Why do we split data into Training and Testing sets?",
                "options": ["To double the amount of data", "To evaluate how well the model generalizes to new, unseen data", "Because databases can't hold all the data", "To train two different models simultaneously"],
                "answerIndex": 1
            },
            {
                "question": "What is Overfitting?",
                "options": ["When a model learns the training data too well, capturing noise, but performs poorly on test data", "When a model is too simple to capture underlying patterns", "When training data is too large for memory", "When the model correctly fits the test data perfectly"],
                "answerIndex": 0
            },
            {
                "question": "What is Underfitting?",
                "options": ["When the model performs perfectly on training data", "When a model is too simple to learn the underlying patterns in the training data", "When test data has fewer features than training data", "When there is overfitting but on a smaller scale"],
                "answerIndex": 1
            },
            {
                "question": "Which libraries are most commonly used for Machine Learning in Python?",
                "options": ["React & Vue", "Requests & BeautifulSoup", "Scikit-Learn, TensorFlow, PyTorch", "Django & Flask"],
                "answerIndex": 2
            },
            {
                "question": "What is Reinforcement Learning?",
                "options": ["Grouping similar objects together", "Training models using labeled datasets", "Training an agent to make decisions by rewarding desired behaviors and punishing undesired ones", "Translating text from English to French"],
                "answerIndex": 2
            },
            {
                "question": "Which scenario is considered a Classification problem?",
                "options": ["Predicting tomorrow's temperature in degrees", "Predicting whether an email is 'Spam' or 'Not Spam'", "Grouping customers by purchasing behavior", "Predicting the stock market price"],
                "answerIndex": 1
            },
            {
                "question": "Which scenario is considered a Regression problem?",
                "options": ["Predicting the price of a house based on its attributes", "Classifying images of dogs vs cats", "Clustering users by demographics", "Identifying credit card fraud (Yes/No)"],
                "answerIndex": 0
            },
            {
                "question": "What is the typical split ratio for Train/Test datasets?",
                "options": ["50% Train / 50% Test", "10% Train / 90% Test", "80% Train / 20% Test", "100% Train / 0% Test"],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 7,
        "title": "Machine Learning Algorithms",
        "description": "Topics: linear regression, logistic regression, decision trees, KNN, clustering algorithms.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Linear Regression is used for which type of problem?",
                "options": ["Clustering", "Classification", "Regression (predicting continuous numerical values)", "Dimensionality Reduction"],
                "answerIndex": 2
            },
            {
                "question": "Despite its name, Logistic Regression is primarily used for:",
                "options": ["Regression tasks", "Binary Classification tasks", "Clustering tasks", "Unsupervised Learning"],
                "answerIndex": 1
            },
            {
                "question": "What does K represent in the K-Nearest Neighbors (KNN) algorithm?",
                "options": ["The number of iterations", "The learning rate", "The number of nearest data points considered to determine the class/value of a new point", "The number of clusters"],
                "answerIndex": 2
            },
            {
                "question": "Which algorithm splits data iteratively using if-then rules based on feature values?",
                "options": ["Linear Regression", "Decision Tree", "K-Means Clustering", "Support Vector Machines"],
                "answerIndex": 1
            },
            {
                "question": "What is K-Means?",
                "options": ["An unsupervised clustering algorithm that partitions data into K distinct groups", "A supervised classification algorithm", "A regression strategy for time-series", "A neural network optimizer"],
                "answerIndex": 0
            },
            {
                "question": "Which algorithmic ensemble method creates multiple decision trees and combines their outputs to improve accuracy and prevent overfitting?",
                "options": ["Logistic Regression", "Naive Bayes", "Random Forest", "K-Nearest Neighbors"],
                "answerIndex": 2
            },
            {
                "question": "Support Vector Machines (SVM) aim to find the optimal what?",
                "options": ["Hyperplane that best separates classes with maximum margin", "Average of all inputs", "Cluster center", "Correlation coefficient"],
                "answerIndex": 0
            },
            {
                "question": "Naive Bayes is based on which mathematical rule/theorem?",
                "options": ["Pythagorean Theorem", "Bayes' Theorem of conditional probability", "Central Limit Theorem", "Fermat's Last Theorem"],
                "answerIndex": 1
            },
            {
                "question": "What is a major advantage of Decision Trees?",
                "options": ["They never overfit", "They only work with numerical data", "They are highly interpretable and easy to visualize", "They don't require any memory"],
                "answerIndex": 2
            },
            {
                "question": "Which algorithm is highly sensitive to the scale of the data and thus usually requires feature standardization beforehand?",
                "options": ["Decision Trees", "K-Nearest Neighbors (KNN)", "Random Forest", "Naive Bayes"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 8,
        "title": "Model Evaluation and Optimization",
        "description": "Topics: accuracy, precision, recall, F1 score, cross validation, hyperparameter tuning.",
        "icon": "AssignmentIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the formula for Accuracy in classification?",
                "options": ["(True Positives + False Positives) / Total", "(True Positives + True Negatives) / Total Predictions", "True Positives / (True Positives + False Negatives)", "False Positives / True Negatives"],
                "answerIndex": 1
            },
            {
                "question": "What does 'Precision' measure?",
                "options": ["How many of the actual positive cases were caught", "The proportion of positive identifications that were actually correct", "The overall correctness of the model", "The speed of the algorithm"],
                "answerIndex": 1
            },
            {
                "question": "What does 'Recall' (or Sensitivity) measure?",
                "options": ["The proportion of actual positives that were identified correctly", "The proportion of true negatives", "The average time it takes to classify", "Accuracy on the training set"],
                "answerIndex": 0
            },
            {
                "question": "What is the F1 Score?",
                "options": ["The arithmetic mean of accuracy and precision", "The harmonic mean of Precision and Recall", "The maximum of Precision and Recall", "A score between 1 and 100"],
                "answerIndex": 1
            },
            {
                "question": "When is Accuracy a misleading metric?",
                "options": ["When classes are perfectly balanced", "When dealing with highly imbalanced datasets (e.g., 99% Negative, 1% Positive)", "When using Deep Learning", "When dealing with linear regression"],
                "answerIndex": 1
            },
            {
                "question": "What is Cross-Validation (e.g., K-Fold Cross-Validation)?",
                "options": ["Validating code syntax across different IDEs", "Splitting data into K subsets, training on K-1, testing on the remaining, and repeating K times", "Validating that data types are correct across columns", "Crossing features together to make new ones"],
                "answerIndex": 1
            },
            {
                "question": "What are Hyperparameters?",
                "options": ["Parameters whose values are learned strictly during training (like weights)", "Settings that control the learning process and model architecture picked BEFORE training begins (e.g., learning rate, K in KNN)", "The RAM and CPU of the server", "Metrics like accuracy and F1 score"],
                "answerIndex": 1
            },
            {
                "question": "What is Grid Search?",
                "options": ["A method for searching SQL databases", "An exhaustive search over specified parameter values for an estimator to find the best hyperparameter combination", "A frontend UI methodology", "A hashing algorithm finding grid coordinates"],
                "answerIndex": 1
            },
            {
                "question": "What does a Confusion Matrix display?",
                "options": ["A table showing True Positives, True Negatives, False Positives, and False Negatives", "A mathematical bug in code", "A matrix of uncleaned text data", "The weights of a Neural Network"],
                "answerIndex": 0
            },
            {
                "question": "In a medical test detecting a fatal disease, which metric is usually most critical to maximize?",
                "options": ["Precision (minimize false alarms)", "Recall (minimize missing actual sick cases)", "R-squared metric", "Mean Squared Error (MSE)"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 9,
        "title": "Data Science Projects",
        "description": "Examples: sales prediction, customer segmentation, recommendation systems, fraud detection.",
        "icon": "HubIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Predicting future monthly sales based on historical data is an example of:",
                "options": ["Clustering", "Time Series Forecasting / Regression", "Dimensionality Reduction", "Binary Classification"],
                "answerIndex": 1
            },
            {
                "question": "Customer Segmentation is typically solved using:",
                "options": ["Unsupervised Clustering Algorithms (like K-Means)", "Linear Regression", "Decision Trees", "Convolutional Neural Networks"],
                "answerIndex": 0
            },
            {
                "question": "Which algorithm paradigm is heavily used in building Recommendation Systems (like Netflix)?",
                "options": ["Collaborative Filtering / Matrix Factorization", "K-Means Clustering", "Support Vector Machines", "Logistic Regression"],
                "answerIndex": 0
            },
            {
                "question": "Credit Card Fraud Detection is primarily an example of:",
                "options": ["Anomaly/Outlier Detection or Binary Classification", "Multi-class classification", "Time Series Forecasting", "Clustering"],
                "answerIndex": 0
            },
            {
                "question": "What is a major challenge when building a Fraud Detection project?",
                "options": ["The dataset is usually perfectly balanced", "The classes are highly imbalanced (fraud events are very rare compared to normal transactions)", "It requires 3D visualization", "It relies entirely on image data"],
                "answerIndex": 1
            },
            {
                "question": "Natural Language Processing (NLP) is central to which project?",
                "options": ["House Price Prediction", "Customer Churn Prediction", "Sentiment Analysis of Tweets", "Customer Segmentation"],
                "answerIndex": 2
            },
            {
                "question": "Predicting whether a customer will cancel their subscription is known as:",
                "options": ["Customer Segmentation", "Customer Churn Prediction", "Collaborative Filtering", "Reinforcement Learning"],
                "answerIndex": 1
            },
            {
                "question": "Computer Vision techniques are central to which project type?",
                "options": ["Predicting stock market trends", "Facial Emotion Recognition or Image Classification", "Analyzing CSV spreadsheets", "Building a REST API"],
                "answerIndex": 1
            },
            {
                "question": "What does a 'Content-Based Filtering' recommendation system do?",
                "options": ["Recommends items based on user-to-user similarity", "Recommends items based on item attributes similar to what the user liked before", "Randomly suggests trending content", "Creates new content dynamically using AI"],
                "answerIndex": 1
            },
            {
                "question": "In an End-to-End Data Science project, what is Model Deployment?",
                "options": ["Making the model accessible in production (e.g., via a REST API) so others can use it to make predictions", "Deleting the model", "Training the model on local hardware", "Creating visualizations in a notebook"],
                "answerIndex": 0
            }
        ]
    },
    {
        "id": 10,
        "title": "Data Science Interview Preparation",
        "description": "Topics: data science interview questions, case studies, project explanation, business analytics thinking.",
        "icon": "PeopleIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "In a Data Science interview, if asked to explain a ML concept to a non-technical stakeholder, you should:",
                "options": ["Use heavy math and formulas to prove your expertise", "Speak entirely in code syntax", "Use analogies and explain the business impact and simple intuition behind the concept", "Tell them they wouldn't understand"],
                "answerIndex": 2
            },
            {
                "question": "What is a 'Case Study' in a DS Interview?",
                "options": ["A multi-hour coding test in C++", "An open-ended business problem where you discuss how you would structure data, choose metrics, and build a solution", "A test on your knowledge of computer hardware", "A typing speed test"],
                "answerIndex": 1
            },
            {
                "question": "If asked about a project on your resume, which framework is best for structuring your answer?",
                "options": ["The STAR Method (Situation, Task, Action, Result)", "Ranting about how messy the data was for 10 minutes", "Only talking about the final code implementation line-by-line", "Skip it because they already read your resume"],
                "answerIndex": 0
            },
            {
                "question": "Why do interviewers ask 'How would you handle missing data?'",
                "options": ["To test if you know Python", "To assess your problem-solving skills and understanding that imputation methods depend on the data context (e.g. mean vs median vs ML imputation)", "To see if you know how to delete columns", "To trick you into an error"],
                "answerIndex": 1
            },
            {
                "question": "An interviewer asks: 'Your model has 99% accuracy but isn't useful.' What might be the reason?",
                "options": ["The algorithm isn't Deep Learning", "The dataset is highly imbalanced and it's just predicting the majority class", "Your computer is too slow", "Data science doesn't work"],
                "answerIndex": 1
            },
            {
                "question": "What is the primary goal of A/B testing in a business context?",
                "options": ["Testing if code compiles (A or B)", "Statistically determining which of two variants (e.g., website layouts) leads to a better conversion rate/metric", "Testing server speeds in isolated environments", "Teaching two models and keeping the older one"],
                "answerIndex": 1
            },
            {
                "question": "How should you answer: 'Explain the Trade-off between Bias and Variance'?",
                "options": ["High bias causes underfitting (too simple), high variance causes overfitting (captures noise), the goal is a balance.", "Both should always be zero.", "Bias means discrimination, variance means math.", "High variance is always better."],
                "answerIndex": 0
            },
            {
                "question": "When explaining your SQL skills in an interview, you should emphasize your ability to:",
                "options": ["Memorize all keyword capitalizations", "Write complex queries (JOINs, Window Functions, Subqueries) to extract meaningful insights", "Only write SELECT *", "Use NoSQL databases instead"],
                "answerIndex": 1
            },
            {
                "question": "If an interviewer asks you to optimize a slow Pandas script, you might suggest:",
                "options": ["Using standard 'for' loops entirely", "Using apply() or vectorization instead of iterating via completely unoptimized loops, or switching to chunks/Spark for massive data.", "Writing to CSV repeatedly", "Restarting the computer"],
                "answerIndex": 1
            },
            {
                "question": "Why is Business Acumen important for a Data Scientist?",
                "options": ["To become the CEO", "Models have no value unless they solve a real business problem or improve decision-making KPIs", "So they can do accounting alongside programming", "Because statistics tests require it"],
                "answerIndex": 1
            }
        ]
    }
]


template = """import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useOutletContext } from "react-router-dom";
import "../styles/roadmap.css";
import QuizModal from "../components/QuizModal";

import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FunctionsIcon from '@mui/icons-material/Functions';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PsycholgyIcon from '@mui/icons-material/Psychology';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import HubIcon from '@mui/icons-material/Hub';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';

const ROADMAP_STEPS = DATA_PLACEHOLDER;

// Assign material icons based on the string name
const iconMapping = {
    "DeveloperBoardIcon": DeveloperBoardIcon,
    "AnalyticsIcon": AnalyticsIcon,
    "FunctionsIcon": FunctionsIcon,
    "InsertChartIcon": InsertChartIcon,
    "PsycholgyIcon": PsycholgyIcon,
    "AccountTreeIcon": AccountTreeIcon,
    "ModelTrainingIcon": ModelTrainingIcon,
    "HubIcon": HubIcon,
    "AssignmentIcon": AssignmentIcon,
    "PeopleIcon": PeopleIcon,
    "CheckCircleIcon": CheckCircleIcon
};

ROADMAP_STEPS.forEach(step => {
    step.icon = iconMapping[step.icon];
});

export default function DataScienceRoadmap() {
    const { user } = useOutletContext() || {};
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeStepData, setActiveStepData] = useState(null);
    const [dataScienceRoadmap, setDataScienceRoadmap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().dataScienceRoadmap) {
                        setDataScienceRoadmap(docSnap.data().dataScienceRoadmap);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleStepClick = (step) => {
        const isCompleted = dataScienceRoadmap[`step${step.id}Passed`] === true;
        const isUnlocked = step.id === 1 || dataScienceRoadmap[`step${step.id - 1}Passed`] === true;

        if (isUnlocked && !isCompleted) {
            setActiveStepData(step);
            setIsQuizOpen(true);
        } else if (isCompleted) {
            setActiveStepData(step);
            setIsQuizOpen(true);
        }
    };

    const handleQuizComplete = async (stepId, score, total) => {
        setIsQuizOpen(false);
        const isPassed = (score / total) >= 0.5;

        const updatedRoadmap = {
            ...dataScienceRoadmap,
            [`step${stepId}Score`]: score,
            [`step${stepId}Total`]: total,
        };

        if (isPassed) {
            updatedRoadmap[`step${stepId}Passed`] = true;
        } else {
            updatedRoadmap[`step${stepId}Passed`] = dataScienceRoadmap[`step${stepId}Passed`] || false;
        }

        setDataScienceRoadmap(updatedRoadmap);

        if (user?.uid) {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    dataScienceRoadmap: updatedRoadmap
                });
            } catch (error) {
                console.error("Error updating roadmap progress in Firebase:", error);
            }
        }
    };

    if (loading) {
        return <div className="roadmap-loading">Generating your Data Science roadmap...</div>;
    }

    const completedCount = ROADMAP_STEPS.filter(step => dataScienceRoadmap[`step${step.id}Passed`] === true).length;
    const readinessPercentage = Math.round((completedCount / ROADMAP_STEPS.length) * 100);

    return (
        <div className="roadmap-container">
            <motion.div
                className="roadmap-header glass-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className="roadmap-title">Data Science Learning Roadmap</h1>
                    <p className="roadmap-subtitle">
                        Complete these 10 steps to reach a moderate level in Data Science. Score at least 50% on each quiz to unlock the next step.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>Data Science Readiness</span>
                        <span className="progress-percent">{readinessPercentage}% ({completedCount}/10)</span>
                    </div>
                    <div className="progress-track">
                        <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${readinessPercentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>

            <div className="roadmap-path-container">
                <div className="roadmap-timeline-line"></div>

                {ROADMAP_STEPS.map((step, index) => {
                    const isCompleted = dataScienceRoadmap[`step${step.id}Passed`] === true;
                    const isUnlocked = step.id === 1 || dataScienceRoadmap[`step${step.id - 1}Passed`] === true;
                    const isCurrent = isUnlocked && !isCompleted;
                    const isLocked = !isUnlocked;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    const previousScore = dataScienceRoadmap[`step${step.id}Score`];
                    const previousTotal = dataScienceRoadmap[`step${step.id}Total`];
                    const scoreText = previousScore !== undefined ? `Best Score: ${previousScore}/${previousTotal}` : null;

                    return (
                        <motion.div
                            key={step.id}
                            className={`roadmap-step-wrapper ${alignmentClass}`}
                            initial={{ opacity: 0, x: alignmentClass === 'step-left' ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        >
                            <div className={`roadmap-marker ${statusClass}`}>
                                {isCompleted ? <CheckCircleIcon fontSize="small" /> : (isLocked ? <LockIcon fontSize="small" /> : step.id)}
                            </div>

                            <div className={`roadmap-card glass-panel ${statusClass}`}>
                                <div className="roadmap-card-header">
                                    <div className={`roadmap-icon-circle ${statusClass}`}>
                                        <IconComponent />
                                    </div>
                                    <span className={`roadmap-status-badge ${statusClass}`}>
                                        {isCompleted ? 'Completed' : isCurrent ? 'Unlocked' : 'Locked'}
                                    </span>
                                </div>

                                <h3 className="roadmap-card-title">Step {step.id}: {step.title}</h3>
                                <p className="roadmap-card-desc">{step.description}</p>

                                {scoreText && (
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: '500' }}>
                                        {scoreText} {isCompleted ? '✅' : '❌'}
                                    </p>
                                )}

                                <button
                                    className={`roadmap-action-btn ${statusClass}`}
                                    disabled={isLocked}
                                    onClick={() => handleStepClick(step)}
                                >
                                    {isLocked ? 'Locked' : (isCompleted ? 'Retake Quiz' : step.action)}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <QuizModal
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                stepData={activeStepData}
                onComplete={handleQuizComplete}
            />

        </div>
    );
}
"""

# Generate file content
final_code = template.replace('DATA_PLACEHOLDER', json.dumps(STEPS, indent=4))

# Write to file
with open("DataScienceRoadmap.jsx", "w", encoding="utf-8") as f:
    f.write(final_code)
