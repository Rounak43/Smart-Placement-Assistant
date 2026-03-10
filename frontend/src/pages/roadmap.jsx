import React, { useEffect, useState } from "react";
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

const ROADMAP_STEPS = [
    {
        id: 1,
        title: "Python Basics",
        description: "Topics: variables, data types, loops, functions, lists, dictionaries, conditional statements.",
        icon: DeveloperBoardIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "What is the correct extension for a Python file?",
                        "options": [
                                    ".pt",
                                    ".py",
                                    ".pyt",
                                    ".python"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which of these is not a core data type in Python?",
                        "options": [
                                    "List",
                                    "Dictionary",
                                    "Class",
                                    "Tuple"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What keyword is used to define a function in Python?",
                        "options": [
                                    "func",
                                    "def",
                                    "function",
                                    "define"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How do you insert comments in Python code?",
                        "options": [
                                    "// comment",
                                    "/* comment */",
                                    "# comment",
                                    "<!-- comment -->"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which function is used to output text to the console in Python?",
                        "options": [
                                    "echo()",
                                    "console.log()",
                                    "print()",
                                    "output()"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What is the output of 3 * 'A' in Python?",
                        "options": [
                                    "3A",
                                    "AAA",
                                    "Error",
                                    "A A A"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How do you create a list in Python?",
                        "options": [
                                    "[]",
                                    "{}",
                                    "()",
                                    "<>"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Which operator is used to check if two values are equal?",
                        "options": [
                                    "=",
                                    "==",
                                    "===",
                                    "!="
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How to start a conditionally checked block of code?",
                        "options": [
                                    "if (x > y):",
                                    "if x > y:",
                                    "if x > y then:",
                                    "if x > y {"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is a dictionary in Python?",
                        "options": [
                                    "A list of items",
                                    "A set of unique elements",
                                    "A collection of key-value pairs",
                                    "A tuple of immutable items"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 2,
        title: "Python for Data Science",
        description: "Topics: NumPy, Pandas, DataFrames, reading CSV files, data cleaning.",
        icon: AnalyticsIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which library is primary used for data manipulation and analysis?",
                        "options": [
                                    "NumPy",
                                    "Pandas",
                                    "Matplotlib",
                                    "Seaborn"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is a 2-dimensional labeled data structure in Pandas called?",
                        "options": [
                                    "Series",
                                    "DataFrame",
                                    "Panel",
                                    "Array"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which method is used to read a CSV file in Pandas?",
                        "options": [
                                    "read_csv()",
                                    "load_csv()",
                                    "open_csv()",
                                    "get_csv()"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What does df.head() do?",
                        "options": [
                                    "Returns the last 5 rows",
                                    "Returns the first 5 rows",
                                    "Returns the column names",
                                    "Returns the index"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How do you drop missing values in a DataFrame?",
                        "options": [
                                    "df.drop()",
                                    "df.dropna()",
                                    "df.remove_na()",
                                    "df.clear()"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which library provides support for large, multi-dimensional arrays?",
                        "options": [
                                    "Pandas",
                                    "SciPy",
                                    "NumPy",
                                    "TensorFlow"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What is the primary object in NumPy?",
                        "options": [
                                    "DataFrame",
                                    "ndarray",
                                    "Series",
                                    "Tensor"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How do you get the number of rows and columns in a DataFrame?",
                        "options": [
                                    "df.size",
                                    "df.shape",
                                    "df.dim",
                                    "df.length"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which method is used to fill missing values?",
                        "options": [
                                    "fillna()",
                                    "replace()",
                                    "insert()",
                                    "update()"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What does the groupby() method do in Pandas?",
                        "options": [
                                    "Sorts the data",
                                    "Splits the data into groups based on some criteria",
                                    "Joins two dataframes",
                                    "Filters data"
                        ],
                        "answerIndex": 1
            }

        ]
    },
    {
        id: 3,
        title: "Mathematics for Machine Learning",
        description: "Topics: vectors, matrices, probability, statistics, mean, median, standard deviation.",
        icon: FunctionsIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which mathematical branch deals with vectors and matrices?",
                        "options": [
                                    "Calculus",
                                    "Linear Algebra",
                                    "Probability",
                                    "Discrete Math"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What represents the middle value in a sorted dataset?",
                        "options": [
                                    "Mean",
                                    "Median",
                                    "Mode",
                                    "Variance"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which rule helps in finding the probability of an event based on prior knowledge?",
                        "options": [
                                    "Bayes' Theorem",
                                    "Law of Large Numbers",
                                    "Central Limit Theorem",
                                    "Markov's Inequality"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What does variance measure?",
                        "options": [
                                    "The average value",
                                    "The spread of data points from the mean",
                                    "The most frequent value",
                                    "The geometric mean"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is the standard deviation?",
                        "options": [
                                    "Square of variance",
                                    "Square root of variance",
                                    "Inverse of variance",
                                    "Same as variance"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What matrix operation changes rows to columns?",
                        "options": [
                                    "Inversion",
                                    "Multiplication",
                                    "Transposition",
                                    "Addition"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Two vectors are orthogonal if their dot product is:",
                        "options": [
                                    "1",
                                    "-1",
                                    "0",
                                    "Infinity"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What is an eigenvalue?",
                        "options": [
                                    "A scalar associated with a linear system of equations",
                                    "A vector that does not change direction upon transformation",
                                    "The determinant of a matrix",
                                    "The inverse of a matrix"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "In probability, what is an independent event?",
                        "options": [
                                    "An event that never happens",
                                    "An event whose outcome does not affect another",
                                    "An event with 100% certainty",
                                    "An event that relies on a previous outcome"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Continuous probability distributions use which calculus concept?",
                        "options": [
                                    "Derivatives",
                                    "Limits",
                                    "Integrals",
                                    "Series"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 4,
        title: "Data Visualization",
        description: "Topics: Matplotlib, Seaborn, charts, graphs, data insights.",
        icon: InsertChartIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which plot is best for showing the distribution of a continuous variable?",
                        "options": [
                                    "Scatter Plot",
                                    "Pie Chart",
                                    "Histogram",
                                    "Line Chart"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Seaborn is built on top of which library?",
                        "options": [
                                    "Plotly",
                                    "Bokeh",
                                    "Matplotlib",
                                    "ggplot"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which function in Matplotlib creates a scatter plot?",
                        "options": [
                                    "plt.plot()",
                                    "plt.scatter()",
                                    "plt.bar()",
                                    "plt.hist()"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What plot is best to show a relationship between two continuous variables?",
                        "options": [
                                    "Bar Chart",
                                    "Scatter Plot",
                                    "Pie Chart",
                                    "Box Plot"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which library allows for interactive web-based data visualizations easily?",
                        "options": [
                                    "Matplotlib",
                                    "Seaborn",
                                    "Plotly",
                                    "Pandas"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What does a box plot prominently display?",
                        "options": [
                                    "The mean and standard deviation",
                                    "The median and quartiles (IQR)",
                                    "All individual data points",
                                    "The line of best fit"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "How do you add a title to a Matplotlib chart?",
                        "options": [
                                    "plt.heading()",
                                    "plt.title()",
                                    "plt.header()",
                                    "plt.label()"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What Seaborn function creates a matrix showing correlations between variables?",
                        "options": [
                                    "sns.heatmap()",
                                    "sns.pairplot()",
                                    "sns.boxplot()",
                                    "sns.lineplot()"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Which plot is often discouraged for comparing quantities properly?",
                        "options": [
                                    "Bar Chart",
                                    "Line Chart",
                                    "Pie Chart",
                                    "Histogram"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "How do you show a Matplotlib figure?",
                        "options": [
                                    "plt.display()",
                                    "plt.print()",
                                    "plt.show()",
                                    "plt.draw()"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 5,
        title: "Machine Learning Basics",
        description: "Topics: supervised learning, unsupervised learning, reinforcement learning, training vs testing data.",
        icon: PsycholgyIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which learning method uses labeled data?",
                        "options": [
                                    "Supervised Learning",
                                    "Unsupervised Learning",
                                    "Reinforcement Learning",
                                    "Self-supervised Learning"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Clustering is a type of...",
                        "options": [
                                    "Supervised Learning",
                                    "Unsupervised Learning",
                                    "Reinforcement Learning",
                                    "Deep Learning"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Why do we split data into training and testing sets?",
                        "options": [
                                    "To speed up training",
                                    "To evaluate model performance on unseen data",
                                    "To increase data size",
                                    "To reduce memory usage"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Predicting house prices (continuous numbers) is an example of:",
                        "options": [
                                    "Classification",
                                    "Clustering",
                                    "Regression",
                                    "Dimensionality Reduction"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which type of learning involves an agent learning through rewards and penalties?",
                        "options": [
                                    "Supervised Learning",
                                    "Semi-supervised Learning",
                                    "Unsupervised Learning",
                                    "Reinforcement Learning"
                        ],
                        "answerIndex": 3
            },
            {
                        "question": "What is the term for inputs or variables used to make a prediction?",
                        "options": [
                                    "Labels",
                                    "Targets",
                                    "Features",
                                    "Outputs"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What is a 'label' in ML?",
                        "options": [
                                    "The variable we are trying to predict",
                                    "A descriptive string for a plot",
                                    "A feature of the input data",
                                    "A type of algorithm"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Overfitting happens when a model:",
                        "options": [
                                    "Learns the training data too well, failing on unseen data",
                                    "Fails to learn the training data",
                                    "Is too simple for the data",
                                    "Requires more epochs"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What does 'Underfitting' mean?",
                        "options": [
                                    "The model performs well on training data only",
                                    "The model captures noise in the data",
                                    "The model is too simple to capture underlying patterns",
                                    "The dataset is too small"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which of these is NOT a step in a typical ML pipeline?",
                        "options": [
                                    "Data cleaning",
                                    "Feature engineering",
                                    "Hardware manufacturing",
                                    "Model deployment"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 6,
        title: "Machine Learning Algorithms",
        description: "Topics: linear regression, logistic regression, decision trees, KNN, naive bayes, random forest.",
        icon: AccountTreeIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which algorithm is typically used for Binary Classification?",
                        "options": [
                                    "Linear Regression",
                                    "K-Means",
                                    "Logistic Regression",
                                    "PCA"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Random Forest is an example of what type of method?",
                        "options": [
                                    "Clustering",
                                    "Ensemble Learning",
                                    "Dimensionality Reduction",
                                    "Neural Network"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "In KNN, what does 'K' represent?",
                        "options": [
                                    "Number of classes",
                                    "Number of clusters",
                                    "Number of nearest neighbors",
                                    "Number of features"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which algorithm assumes independence between features?",
                        "options": [
                                    "Decision Trees",
                                    "SVM",
                                    "Naive Bayes",
                                    "K-Means"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What does SVM stand for?",
                        "options": [
                                    "Simple Vector Mechanism",
                                    "Support Vector Machine",
                                    "Standard Virtual Model",
                                    "Subtractive Vector Method"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is the goal of a Decision Tree algorithm?",
                        "options": [
                                    "Find a global minimum",
                                    "Split data to maximize information gain",
                                    "Find principal components",
                                    "Cluster unlabelled data"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which is an unsupervised algorithm?",
                        "options": [
                                    "Linear Regression",
                                    "Logistic Regression",
                                    "K-Means Clustering",
                                    "Random Forest"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What technique combines weak learners into a strong learner sequentially?",
                        "options": [
                                    "Bagging",
                                    "Boosting",
                                    "Stacking",
                                    "Voting"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What function is used in Logistic Regression to crush values between 0 and 1?",
                        "options": [
                                    "ReLU",
                                    "Sigmoid",
                                    "Tanh",
                                    "Softmax"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "PCA (Principal Component Analysis) is primarily used for:",
                        "options": [
                                    "Classification",
                                    "Regression",
                                    "Dimensionality Reduction",
                                    "Clustering"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 7,
        title: "Model Training and Evaluation",
        description: "Topics: scikit-learn, train-test split, accuracy, precision, recall, F1 score.",
        icon: ModelTrainingIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "The harmonic mean of precision and recall is called:",
                        "options": [
                                    "Accuracy",
                                    "F1 Score",
                                    "ROC-AUC",
                                    "Specificity"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which metric is most crucial when false positives are highly costly?",
                        "options": [
                                    "Recall",
                                    "Precision",
                                    "Accuracy",
                                    "F1 Score"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "In Scikit-learn, which method is typically used to train a model?",
                        "options": [
                                    "train()",
                                    "fit()",
                                    "predict()",
                                    "transform()"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which method applies the trained model to new data to make predictions?",
                        "options": [
                                    "predict()",
                                    "transform()",
                                    "fit_predict()",
                                    "evaluate()"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What does a confusion matrix display?",
                        "options": [
                                    "Network weights",
                                    "Hyperparameters",
                                    "True positives, false positives, true negatives, false negatives",
                                    "Loss function values"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Which Scikit-Learn function is used to split data into training and testing sets?",
                        "options": [
                                    "split_data()",
                                    "train_test_split()",
                                    "KFold()",
                                    "cross_val_score()"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What does Cross-Validation help prevent?",
                        "options": [
                                    "Overfitting",
                                    "Slow execution",
                                    "Data leakage",
                                    "Memory errors"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "RMSE stands for:",
                        "options": [
                                    "Root Mean Squared Error",
                                    "Ratio Median Scalar Error",
                                    "Range Mean Standard Error",
                                    "Root Median Squared Entity"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Which evaluation metric is typically used for Regression problems?",
                        "options": [
                                    "Accuracy",
                                    "F1 Score",
                                    "Mean Absolute Error (MAE)",
                                    "Precision"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Hyperparameter tuning is the process of:",
                        "options": [
                                    "Cleaning data",
                                    "Optimizing model configuration variables not learned during training",
                                    "Updating network weights",
                                    "Deploying the model"
                        ],
                        "answerIndex": 1
            }

        ]
    },
    {
        id: 8,
        title: "Deep Learning Basics",
        description: "Topics: neural networks, activation functions, TensorFlow, Keras, forward propagation.",
        icon: HubIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "Which process updates weights in a neural network?",
                        "options": [
                                    "Forward propagation",
                                    "Backpropagation",
                                    "Convolution",
                                    "Max pooling"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which is a common activation function?",
                        "options": [
                                    "ReLU",
                                    "SVM",
                                    "KNN",
                                    "PCA"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "What is 'epochs' in the context of neural network training?",
                        "options": [
                                    "Number of layers",
                                    "Number of neurons",
                                    "Number of complete passes through the dataset",
                                    "Learning rate"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "A CNN is specifically designed to perform well on:",
                        "options": [
                                    "Tabular data",
                                    "Image data",
                                    "Time series data",
                                    "Text data"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What does RNN stand for?",
                        "options": [
                                    "Random Neural Network",
                                    "Recurrent Neural Network",
                                    "Rapid Neural Node",
                                    "Reversed Neural Net"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is the purpose of the loss function?",
                        "options": [
                                    "To update weights",
                                    "To calculate the error between predictions and actual targets",
                                    "To initialize parameters",
                                    "To speed up computation"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which popular open-source library was developed by Google for deep learning?",
                        "options": [
                                    "PyTorch",
                                    "TensorFlow",
                                    "Keras",
                                    "Scikit-learn"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What does 'dropout' do in a neural network?",
                        "options": [
                                    "Deletes the dataset",
                                    "Randomly disables neurons during training to prevent overfitting",
                                    "Halts the training loop",
                                    "Decreases learning rate"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "The learning rate controls:",
                        "options": [
                                    "The number of epochs",
                                    "The batch size",
                                    "The size of the step taken towards the minimum of the loss function",
                                    "The number of hidden layers"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "An output layer activation function for multi-class classification is typically:",
                        "options": [
                                    "Sigmoid",
                                    "ReLU",
                                    "Softmax",
                                    "Linear"
                        ],
                        "answerIndex": 2
            }

        ]
    },
    {
        id: 9,
        title: "AI/ML Projects",
        description: "Examples: house price prediction, recommendation system, spam detection.",
        icon: AssignmentIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "House price prediction is typically framed as a...",
                        "options": [
                                    "Classification problem",
                                    "Regression problem",
                                    "Clustering problem",
                                    "Reinforcement learning problem"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Spam filtering often uses which probability-based algorithm?",
                        "options": [
                                    "K-Means",
                                    "Naive Bayes",
                                    "Linear Regression",
                                    "PCA"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Collaborative filtering is commonly used in:",
                        "options": [
                                    "Image classification",
                                    "Recommendation systems",
                                    "Speech recognition",
                                    "Predicting stock prices"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Analyzing customer sentiments from reviews is an example of:",
                        "options": [
                                    "Computer Vision",
                                    "Natural Language Processing (NLP)",
                                    "Reinforcement Learning",
                                    "Time Series Forecasting"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Object detection involves:",
                        "options": [
                                    "Translating languages",
                                    "Identifying and bounding objects within an image",
                                    "Predicting text sequences",
                                    "Clustering user behavior"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "A chatbot uses algorithms from which domain?",
                        "options": [
                                    "Computer Vision",
                                    "Robotics",
                                    "Natural Language Processing (NLP)",
                                    "Signal Processing"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "Predicting future stock prices based on past data is called:",
                        "options": [
                                    "Time Series Analysis",
                                    "Image Segmentation",
                                    "A/B Testing",
                                    "Clustering"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Which project commonly uses CNNs?",
                        "options": [
                                    "Fraud detection in credit cards",
                                    "Classifying dogs vs cats from images",
                                    "Predicting housing prices",
                                    "Customer segmentation"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Churn prediction aims to identify:",
                        "options": [
                                    "New potential customers",
                                    "Customers likely to stop using a service",
                                    "The most profitable products",
                                    "Inventory shortages"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "In a Recommendation System, what is Content-Based Filtering based on?",
                        "options": [
                                    "User similarities",
                                    "Item attributes and features",
                                    "Random guessing",
                                    "Popularity only"
                        ],
                        "answerIndex": 1
            }

        ]
    },
    {
        id: 10,
        title: "AI/ML Interview Preparation",
        description: "Topics: interview questions, model optimization, deployment basics.",
        icon: PeopleIcon,
        action: "Take Quiz",
        questions: [
              {
                        "question": "What is overfitting?",
                        "options": [
                                    "Model performs well on test data but poorly on training data",
                                    "Model performs well on training data but poorly on test data",
                                    "Model performs poorly on both",
                                    "Model performs perfectly on both"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which technique helps prevent overfitting?",
                        "options": [
                                    "Adding more layers",
                                    "Regularization",
                                    "Increasing learning rate",
                                    "Using smaller datasets"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "A common format to save and deploy Scikit-learn models is:",
                        "options": [
                                    ".csv",
                                    ".pkl (Pickle)",
                                    ".txt",
                                    ".json"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What does a data scientist spend most of their time doing?",
                        "options": [
                                    "Training models",
                                    "Deploying APIs",
                                    "Data cleaning and preparation",
                                    "Presenting to stakeholders"
                        ],
                        "answerIndex": 2
            },
            {
                        "question": "What is an API?",
                        "options": [
                                    "Application Programming Interface",
                                    "Automated Prediction Instance",
                                    "Algorithmic Process Integration",
                                    "Applied Python Interface"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Which framework is often used to build a web API for ML models in Python?",
                        "options": [
                                    "React",
                                    "Flask / FastAPI",
                                    "Pandas",
                                    "PyTorch"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "During an ML interview, what is a crucial non-technical skill to demonstrate?",
                        "options": [
                                    "Typing speed",
                                    "Explaining complex concepts simply",
                                    "Memorizing whole libraries",
                                    "Using multiple keyboards"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "What is Model Drift?",
                        "options": [
                                    "When a model physically moves servers",
                                    "When the predictive performance degrades over time as data changes",
                                    "When a model learns too fast",
                                    "When you switch from Scikit-Learn to TensorFlow"
                        ],
                        "answerIndex": 1
            },
            {
                        "question": "Which of these is a metric to explain a model's feature importance?",
                        "options": [
                                    "SHAP values",
                                    "R-squared",
                                    "Cronbach's alpha",
                                    "P-value"
                        ],
                        "answerIndex": 0
            },
            {
                        "question": "Docker is primarily used in ML for:",
                        "options": [
                                    "Writing faster code",
                                    "Containerizing dependencies and environment for consistent deployment",
                                    "Training larger models natively",
                                    "Visualizing complex datasets"
                        ],
                        "answerIndex": 1
            }

        ]
    }
];

export default function Roadmap() {
    const { user } = useOutletContext();
    const [aimlRoadmap, setAimlRoadmap] = useState({});
    const [loading, setLoading] = useState(true);

    // Quiz State
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeStepData, setActiveStepData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.aimlRoadmap) {
                            setAimlRoadmap(data.aimlRoadmap);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching roadmap user data:", error);
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, [user]);

    const handleStepClick = (step) => {
        // Only allow clicking if it's unlocked
        const isCompleted = aimlRoadmap[`step${step.id}Passed`] === true;
        const isUnlocked = step.id === 1 || aimlRoadmap[`step${step.id - 1}Passed`] === true;

        if (isUnlocked && !isCompleted) {
            setActiveStepData(step);
            setIsQuizOpen(true);
        } else if (isCompleted) {
            // Already completed, optionally show a toast or allow retaking
            setActiveStepData(step);
            setIsQuizOpen(true);
        }
    };

    const handleQuizComplete = async (stepId, score, total) => {
        setIsQuizOpen(false);
        const isPassed = (score / total) >= 0.5;

        // Optimistically update local state
        const updatedRoadmap = {
            ...aimlRoadmap,
            [`step${stepId}Score`]: score,
            [`step${stepId}Total`]: total,
        };

        if (isPassed) {
            updatedRoadmap[`step${stepId}Passed`] = true;
        } else {
            // If already passed previously, don't overwrite with false
            updatedRoadmap[`step${stepId}Passed`] = aimlRoadmap[`step${stepId}Passed`] || false;
        }

        setAimlRoadmap(updatedRoadmap);

        // Update Firebase
        if (user?.uid) {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    aimlRoadmap: updatedRoadmap
                });
            } catch (error) {
                console.error("Error updating roadmap progress in Firebase:", error);
            }
        }
    };

    if (loading) {
        return <div className="roadmap-loading">Generating your AI/ML roadmap...</div>;
    }

    const completedCount = ROADMAP_STEPS.filter(step => aimlRoadmap[`step${step.id}Passed`] === true).length;
    const readinessPercentage = Math.round((completedCount / ROADMAP_STEPS.length) * 100);

    return (
        <div className="roadmap-container">
            {/* Header / Progress Bar */}
            <motion.div
                className="roadmap-header glass-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className="roadmap-title">AI/ML Learning Roadmap</h1>
                    <p className="roadmap-subtitle">
                        Complete these 10 steps to reach a moderate level in AI/ML. Score at least 50% on each quiz to unlock the next step.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>AI/ML Readiness</span>
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

            {/* Zig-Zag Path */}
            <div className="roadmap-path-container">
                <div className="roadmap-timeline-line"></div>

                {ROADMAP_STEPS.map((step, index) => {
                    const isCompleted = aimlRoadmap[`step${step.id}Passed`] === true;
                    // It's the current step if it's the first one locked AFTER the completed ones
                    const isUnlocked = step.id === 1 || aimlRoadmap[`step${step.id - 1}Passed`] === true;
                    const isCurrent = isUnlocked && !isCompleted;
                    const isLocked = !isUnlocked;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    // Display previous score if available
                    const previousScore = aimlRoadmap[`step${step.id}Score`];
                    const previousTotal = aimlRoadmap[`step${step.id}Total`];
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
                            {/* The Marker Dot logic */}
                            <div className={`roadmap-marker ${statusClass}`}>
                                {isCompleted ? <CheckCircleIcon fontSize="small" /> : (isLocked ? <LockIcon fontSize="small" /> : step.id)}
                            </div>

                            {/* The Card */}
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

            {/* Quiz Modal */}
            <QuizModal
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                stepData={activeStepData}
                onComplete={handleQuizComplete}
            />

        </div>
    );
}