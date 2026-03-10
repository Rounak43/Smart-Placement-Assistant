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
        "id": 1,
        "title": "Python Programming Basics",
        "description": "Topics: variables, data types, loops, functions, lists, dictionaries.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the correct way to output a string to the console in Python?",
                "options": [
                    "console.log('Hello')",
                    "echo 'Hello'",
                    "print('Hello')",
                    "system.out.println('Hello')"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which of these data types is immutable in Python?",
                "options": [
                    "List",
                    "Dictionary",
                    "Tuple",
                    "Set"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you start a 'while' loop in Python?",
                "options": [
                    "while (x > 5)",
                    "while x > 5:",
                    "for while x > 5",
                    "loop while x > 5:"
                ],
                "answerIndex": 1
            },
            {
                "question": "What keyword is used to stop a loop prematurely?",
                "options": [
                    "stop",
                    "pause",
                    "exit",
                    "break"
                ],
                "answerIndex": 3
            },
            {
                "question": "How do you access the value associated with the key 'name' in a dictionary 'person'?",
                "options": [
                    "person.name",
                    "person['name']",
                    "person(name)",
                    "person.get('name', None) followed by only choice 2 or both being correct but standard bracket is common -> person['name'] is correct."
                ],
                "answerIndex": 1
            },
            {
                "question": "Which operator is used for integer division (floor division)?",
                "options": [
                    "/",
                    "//",
                    "%",
                    "**"
                ],
                "answerIndex": 1
            },
            {
                "question": "What will len(['a', 'b', 'c']) evaluate to?",
                "options": [
                    "0",
                    "1",
                    "2",
                    "3"
                ],
                "answerIndex": 3
            },
            {
                "question": "How do you define a function in Python?",
                "options": [
                    "function myFunc():",
                    "def myFunc():",
                    "declare myFunc():",
                    "func myFunc():"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the index of the first element in a Python list?",
                "options": [
                    "0",
                    "1",
                    "-1",
                    "Depends on the list"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you concatenate two strings 'A' and 'B'?",
                "options": [
                    "'A' . 'B'",
                    "'A' & 'B'",
                    "'A' + 'B'",
                    "concat('A', 'B')"
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 2,
        "title": "Excel for Data Analysis",
        "description": "Topics: formulas, pivot tables, charts, data cleaning, filtering.",
        "icon": "InsertChartIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is VLOOKUP used for in Excel?",
                "options": [
                    "To vertically sort data",
                    "To search for a value in the first column of a table array and return a value in the same row",
                    "To add up vertical columns",
                    "To create a chart vertically"
                ],
                "answerIndex": 1
            },
            {
                "question": "What function adds all numbers in a range of cells?",
                "options": [
                    "TOTAL()",
                    "ADD()",
                    "SUM()",
                    "COUNT()"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the primary use of a Pivot Table?",
                "options": [
                    "To color-code cells automatically",
                    "To summarize, analyze, explore, and present summary data",
                    "To write custom VBA macros",
                    "To translate text to another language"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you write a formula that checks if a cell A1 is greater than 10?",
                "options": [
                    "=IF(A1>10, 'Yes', 'No')",
                    "CHECK(A1>10)",
                    "EVAL(A1>10)",
                    "=WHEN(A1>10, 'Yes', 'No')"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which tool removes duplicate rows based on identical data?",
                "options": [
                    "Text to Columns",
                    "Remove Duplicates",
                    "Data Validation",
                    "Consolidate"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which feature helps restrict the type of data that can be entered into a cell?",
                "options": [
                    "Data Validation",
                    "Conditional Formatting",
                    "Goal Seek",
                    "Scenario Manager"
                ],
                "answerIndex": 0
            },
            {
                "question": "What keyboard shortcut is commonly used to create a table out of a data range?",
                "options": [
                    "Ctrl + C",
                    "Ctrl + T",
                    "Ctrl + P",
                    "Ctrl + S"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does conditional formatting do?",
                "options": [
                    "Changes the data values automatically",
                    "Changes the appearance of cells based on specific conditions",
                    "Freezes panes",
                    "Creates a pivot table"
                ],
                "answerIndex": 1
            },
            {
                "question": "If you want to count cells that contain numbers only, which function do you use?",
                "options": [
                    "COUNTA()",
                    "COUNTIF()",
                    "COUNT()",
                    "COUNTBLANK()"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which Excel error implies that a formula references a cell that does not exist or was deleted?",
                "options": [
                    "#DIV/0!",
                    "#VALUE!",
                    "#N/A",
                    "#REF!"
                ],
                "answerIndex": 3
            }
        ]
    },
    {
        "id": 3,
        "title": "SQL Fundamentals",
        "description": "Topics: SELECT queries, filtering, joins, aggregations, grouping.",
        "icon": "AccountTreeIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which SQL statement is used to extract data from a database?",
                "options": [
                    "GET",
                    "EXTRACT",
                    "SELECT",
                    "PULL"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which keyword is used to filter records in SQL?",
                "options": [
                    "WHERE",
                    "FILTER",
                    "SEARCH",
                    "CONDITION"
                ],
                "answerIndex": 0
            },
            {
                "question": "What does a LEFT JOIN do?",
                "options": [
                    "Returns all records from the right table, and matched records from the left",
                    "Returns only the records that have matches in both tables",
                    "Returns all records from the left table, and the matched records from the right table",
                    "Randomly joins columns from left side"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which SQL function is used to count the number of rows?",
                "options": [
                    "SUM()",
                    "TOTAL()",
                    "COUNT()",
                    "NUM()"
                ],
                "answerIndex": 2
            },
            {
                "question": "What clause is typically used with aggregate functions (like COUNT, MAX) to group the result-set?",
                "options": [
                    "SORT BY",
                    "GROUP BY",
                    "ORDER BY",
                    "ARRANGE BY"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you select all columns from a table named 'Customers'?",
                "options": [
                    "SELECT All FROM Customers",
                    "SELECT * FROM Customers",
                    "SELECT Columns FROM Customers",
                    "GET * FROM Customers"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which clause is used to filter the results of a GROUP BY clause?",
                "options": [
                    "WHERE",
                    "FILTER",
                    "HAVING",
                    "LIMIT"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you sort the results of a SELECT query in descending order?",
                "options": [
                    "ORDER BY column_name DESC",
                    "SORT column_name DOWN",
                    "ORDER DESC column_name",
                    "GROUP BY column_name DESC"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which operator is used to search for a specified pattern in a column?",
                "options": [
                    "MATCH",
                    "LIKE",
                    "SEARCH",
                    "PATTERN"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does the SQL DISTINCT keyword do?",
                "options": [
                    "Sorts the output",
                    "Deletes duplicates permanently",
                    "Returns only different (unique) values",
                    "Changes the table structure"
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 4,
        "title": "Data Cleaning and Preparation",
        "description": "Topics: handling missing values, removing duplicates, transforming datasets.",
        "icon": "AssignmentIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Why is data cleaning essential before analysis?",
                "options": [
                    "It makes the file size larger",
                    "To ensure conclusions are based on accurate and high-quality data",
                    "Because databases require it",
                    "To compress the data"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does 'Imputation' mean in the context of missing values?",
                "options": [
                    "Deleting the rows with missing data",
                    "Filling missing values with a substitute value like mean or median",
                    "Finding outliers",
                    "Standardizing text data"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which of these is NOT an effective way to handle missing numeric data?",
                "options": [
                    "Dropping the column if 99% of values are missing",
                    "Replacing with the mean of the column",
                    "Replacing with a random string of text",
                    "Replacing with the median of the column"
                ],
                "answerIndex": 2
            },
            {
                "question": "What does it mean to remove duplicates?",
                "options": [
                    "Deleting records that appear more than once in the dataset",
                    "Removing all copies of the dataset from your hard drive",
                    "Deleting columns that have similar names",
                    "Splitting the data into two files"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is data transformation?",
                "options": [
                    "Transferring data over the internet",
                    "Changing data format, scale, or structure to facilitate analysis",
                    "Encrypting passwords",
                    "Translating textual data to another language"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the common term for inconsistent text formatting (e.g., 'New York', 'new york', 'NY') during cleaning?",
                "options": [
                    "Outliers",
                    "Formatting inconsistencies / Dirty data",
                    "Data redundancy",
                    "Missing values"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is an Outlier?",
                "options": [
                    "A data point that differs significantly from other observations",
                    "A missing data point",
                    "A newly generated table",
                    "A perfectly average data point"
                ],
                "answerIndex": 0
            },
            {
                "question": "How can you standardize a date column that has formats like 'MM/DD/YYYY' and 'YYYY-MM-DD'?",
                "options": [
                    "Delete the column",
                    "Parse and convert all dates to a single unified format (e.g. ISO 8601)",
                    "Average the dates",
                    "Sum the dates"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does 'Parsing' mean in data preparation?",
                "options": [
                    "Extracting specific data elements from a string or file",
                    "Sending data to a database",
                    "Sorting the data",
                    "Deleting missing values"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which of these might indicate dirty data?",
                "options": [
                    "A user's age listed as 150",
                    "Uniformly formatted dates",
                    "All numerical values within a normal range",
                    "No missing data"
                ],
                "answerIndex": 0
            }
        ]
    },
    {
        "id": 5,
        "title": "Data Visualization",
        "description": "Topics: charts, dashboards, storytelling with data, visualization best practices.",
        "icon": "InsertChartIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which chart type is best for showing a trend over time?",
                "options": [
                    "Pie Chart",
                    "Scatter Plot",
                    "Line Chart",
                    "Histogram"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is a Bar Chart commonly used for?",
                "options": [
                    "Showing distributions of continuous data",
                    "Comparing quantities across categorical variables",
                    "Showing proportions of a whole",
                    "Visualizing geographic data"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is a major criticism of using Pie Charts?",
                "options": [
                    "They are too colorful",
                    "They can only show one variable",
                    "It is difficult for the human eye to accurately compare angles/areas, making differences hard to read",
                    "They take too long to render"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the goal of 'Storytelling with Data'?",
                "options": [
                    "To write fictional stories about databases",
                    "To communicate insights clearly, using context and visualizations to drive action or understanding",
                    "To make numbers look more complicated",
                    "To replace SQL with English"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which plot is ideal for identifying the correlation between two numeric variables?",
                "options": [
                    "Box Plot",
                    "Line Chart",
                    "Scatter Plot",
                    "Pie Chart"
                ],
                "answerIndex": 2
            },
            {
                "question": "What does a Dashboard typically contain?",
                "options": [
                    "Only one massive chart",
                    "A collection of visualizations tracking KPIs and metrics in a single view",
                    "Source code for the data model",
                    "A text-heavy report with no images"
                ],
                "answerIndex": 1
            },
            {
                "question": "In visualization best practices, what is 'Chart Junk'?",
                "options": [
                    "Unnecessary visual elements that distract from the data (e.g. 3D effects, heavy gridlines)",
                    "Charts that are deleted",
                    "The legend of a chart",
                    "Data that is inaccurate"
                ],
                "answerIndex": 0
            },
            {
                "question": "A Histogram is primarily used to display:",
                "options": [
                    "The relationship between two variables",
                    "Categorical comparisons",
                    "Geographical mapping",
                    "The frequency distribution of a continuous variable"
                ],
                "answerIndex": 3
            },
            {
                "question": "What color scale should you use for showing variation in temperature (e.g., cold to hot)?",
                "options": [
                    "A single solid color",
                    "A diverging color palette (e.g., Blue to Red)",
                    "A random color palette",
                    "Grayscale only"
                ],
                "answerIndex": 1
            },
            {
                "question": "When presenting data to executives, what is the best approach?",
                "options": [
                    "Show them massive raw data tables",
                    "Provide a clear summary, actionable insights, and highlight key metrics immediately",
                    "Explain the SQL queries in detail",
                    "Use 15 different chart types to look smart"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 6,
        "title": "Python Libraries for Data Analysis",
        "description": "Topics: NumPy, Pandas, data manipulation, exploratory data analysis.",
        "icon": "AnalyticsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the core data structure of Pandas?",
                "options": [
                    "NumPy array",
                    "DataFrame",
                    "Dictionary",
                    "List"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the primary purpose of the NumPy library?",
                "options": [
                    "Web scraping",
                    "Creating web servers",
                    "Providing support for large, multi-dimensional arrays and mathematical functions",
                    "Building UI dashboards"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which Pandas function is used to get summary statistics of numerical columns?",
                "options": [
                    "df.describe()",
                    "df.info()",
                    "df.stats()",
                    "df.summary()"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which Pandas function provides a concise summary of a DataFrame, including data types and non-null counts?",
                "options": [
                    "df.describe()",
                    "df.info()",
                    "df.head()",
                    "df.shape"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you filter a Pandas DataFrame 'df' for rows where 'Age' > 30?",
                "options": [
                    "df.filter(Age > 30)",
                    "df[Age > 30]",
                    "df[df['Age'] > 30]",
                    "df(Age > 30)"
                ],
                "answerIndex": 2
            },
            {
                "question": "What does the Pandas method 'groupby()' accomplish?",
                "options": [
                    "Sorts the DataFrame",
                    "Splits data into groups based on some criteria, applies a function, and combines the results",
                    "Deletes grouped columns",
                    "Joins two DataFrames"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is Exploratory Data Analysis (EDA)?",
                "options": [
                    "Analyzing data using machine learning to predict the future",
                    "An approach to analyzing datasets to summarize their main characteristics, often using visual methods",
                    "Deploying data to the cloud",
                    "Writing raw SQL queries"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which method fills missing values in a Pandas DataFrame?",
                "options": [
                    "df.fill()",
                    "df.replace_null()",
                    "df.fillna()",
                    "df.dropna()"
                ],
                "answerIndex": 2
            },
            {
                "question": "In Pandas, what does the method df.merge() do?",
                "options": [
                    "Calculates the average of the DataFrame",
                    "Joins two DataFrames together, similar to a SQL JOIN",
                    "Deletes identical rows",
                    "Appends a list to the DataFrame"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you select the first row of a DataFrame by its integer location?",
                "options": [
                    "df.iloc[0]",
                    "df.loc[0]",
                    "df.first()",
                    "df.row(0)"
                ],
                "answerIndex": 0
            }
        ]
    },
    {
        "id": 7,
        "title": "Business Data Analysis",
        "description": "Topics: KPIs, business metrics, interpreting trends, decision making.",
        "icon": "PsycholgyIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does KPI stand for?",
                "options": [
                    "Key Process Integration",
                    "Key Performance Indicator",
                    "Key Product Information",
                    "Known Problem Identifier"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is meant by 'Customer Churn Rate'?",
                "options": [
                    "The rate at which new customers are acquired",
                    "The percentage of customers that stop using a company's product or service during a certain time frame",
                    "The cost of creating a product",
                    "The overall revenue per customer"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does ROI stand for?",
                "options": [
                    "Return on Investment",
                    "Rate of Interest",
                    "Return on Income",
                    "Revenue Over Inflation"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is the purpose of A/B Testing?",
                "options": [
                    "To check if the database compiles",
                    "To randomly delete data and see if the app crashes",
                    "To compare two versions of a webpage or app to determine which one performs better",
                    "To test alphabetical sorting algorithms"
                ],
                "answerIndex": 2
            },
            {
                "question": "If monthly revenue increases but profit decreases, what might be happening?",
                "options": [
                    "Costs/expenses are increasing faster than revenue",
                    "Taxes disappeared",
                    "The data is definitely wrong",
                    "The number of customers dropped to zero"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is Year-over-Year (YoY) growth?",
                "options": [
                    "Comparing data from one month to the next",
                    "Comparing a financial metric for a period against the comparable period of the prior year",
                    "A measure of daily stock changes",
                    "A tech stack upgrade"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which business metric helps understand the total expected revenue from a single customer over the relationship?",
                "options": [
                    "CAC (Customer Acquisition Cost)",
                    "Bounce Rate",
                    "LTV (Lifetime Value)",
                    "CTR (Click-Through Rate)"
                ],
                "answerIndex": 2
            },
            {
                "question": "What does a funnel analysis typically show?",
                "options": [
                    "The physical shape of a product",
                    "The hardware load on servers",
                    "The steps users take to complete a goal and where they drop off",
                    "Network latency graphs"
                ],
                "answerIndex": 2
            },
            {
                "question": "What does CTR stand for in marketing analytics?",
                "options": [
                    "Cost To Retain",
                    "Conversion Target Ratio",
                    "Click-Through Rate",
                    "Customer Tracker Record"
                ],
                "answerIndex": 2
            },
            {
                "question": "Why are actionable metrics better than vanity metrics?",
                "options": [
                    "Because they look better in presentations",
                    "Because actionable metrics tie directly to business processes and guide decision making, while vanity metrics just look good without context",
                    "Vanity metrics take longer to calculate",
                    "Actionable metrics are generated by AI"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 8,
        "title": "Data Visualization Tools",
        "description": "Topics: Power BI, Tableau basics, building dashboards, reports.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which of these is a core feature of BI tools like Tableau and Power BI?",
                "options": [
                    "Writing complex operating systems",
                    "Building interactive dashboards and connected reports without heavy coding",
                    "Compiling C++ code automatically",
                    "Providing deep learning neural network training environments"
                ],
                "answerIndex": 1
            },
            {
                "question": "In Power BI, what is DAX?",
                "options": [
                    "Data Analysis Expressions - a formula language used to create custom calculations",
                    "A database engine",
                    "A visualization chart type",
                    "A server management tool"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you connect data to Tableau or Power BI?",
                "options": [
                    "By typing all the data manually into the UI",
                    "Through Data Connectors allowing linking to Excel, SQL databases, Cloud Services, etc.",
                    "By uploading code only",
                    "By sending a text message to the server"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does 'Drill Down' mean in the context of interactive dashboards?",
                "options": [
                    "Scrolling down the web page",
                    "Exploring data in more detail by moving from a summary view to a more granular view",
                    "Deleting underlying data",
                    "Exporting the dashboard to a PDF"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is a major difference between a Dashboard and a Report?",
                "options": [
                    "A report is always printed; dashboards are only on mobile",
                    "Reports are typically detailed and multi-page, whereas dashboards provide a high-level, single-screen overview covering key KPIs",
                    "Dashboards don't use charts",
                    "Reports can't use databases"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is 'ETL' in Business Intelligence?",
                "options": [
                    "Extract, Transform, Load",
                    "Execute, Track, Learn",
                    "Enterprise Tech Language",
                    "Estimate, Task, Logic"
                ],
                "answerIndex": 0
            },
            {
                "question": "In Tableau, what are Dimensions and Measures?",
                "options": [
                    "Screen resolutions",
                    "Dimensions are qualitative data (categories), Measures are quantitative numeric data that can be aggregated",
                    "Both mean exactly the same thing",
                    "Dimensions are rows, Measures are columns"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which feature is essential for ensuring a dashboard remains up-to-date automatically?",
                "options": [
                    "Manually re-importing CSVs every day",
                    "Scheduled Data Refreshes connected to a live or updating database",
                    "Changing the colors frequently",
                    "Exporting to PowerPoint"
                ],
                "answerIndex": 1
            },
            {
                "question": "In Power BI, what is the 'Power Query Editor' primarily used for?",
                "options": [
                    "Creating visualizations",
                    "Publishing reports to the web",
                    "Data shaping, cleaning, and transformation before it's loaded into the model",
                    "Writing Python code"
                ],
                "answerIndex": 2
            },
            {
                "question": "What makes a dashboard 'interactive'?",
                "options": [
                    "It uses animations",
                    "Users can filter, slice, or click elements to dynamically update the visualizations",
                    "It requires a password to view",
                    "It is hosted on the cloud"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 9,
        "title": "Data Analysis Projects",
        "description": "Examples: sales analysis dashboard, customer behavior analysis, marketing campaign analysis.",
        "icon": "HubIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the typical first step in starting a data analysis project?",
                "options": [
                    "Building the dashboard UI",
                    "Understanding the business objective and formulating the right questions",
                    "Applying complex machine learning algorithms",
                    "Writing SQL Joins"
                ],
                "answerIndex": 1
            },
            {
                "question": "In a Sales Analysis Dashboard, which metric is usually most critical?",
                "options": [
                    "Average server uptime",
                    "Total Revenue and Revenue Growth",
                    "Number of lines of code written",
                    "Cost of API calls"
                ],
                "answerIndex": 1
            },
            {
                "question": "What kind of analysis determines why a metric suddenly dropped (e.g., a drop in website traffic)?",
                "options": [
                    "Descriptive Analysis",
                    "Diagnostic Analysis (Root Cause Analysis)",
                    "Predictive Analysis",
                    "Prescriptive Analysis"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is a Cohort Analysis?",
                "options": [
                    "An analysis of web scraping techniques",
                    "A behavioral analytics method that breaks data into related groups (cohorts) before analysis, often tracking retention over time",
                    "Analyzing data only from the current month",
                    "Encrypting cohort data"
                ],
                "answerIndex": 1
            },
            {
                "question": "In a Marketing Campaign Analysis, what does an 'Attribution Model' do?",
                "options": [
                    "Calculates server load costs",
                    "Determines which marketing channels (e.g., Email, Ads) get credit for a conversion or sale",
                    "Generates the ad graphics",
                    "Assigns tasks to marketing employees"
                ],
                "answerIndex": 1
            },
            {
                "question": "RFM analysis is used for customer segmentation. What does it stand for?",
                "options": [
                    "Revenue, Finance, Marketing",
                    "Recency, Frequency, Monetary Value",
                    "Rate, Factor, Margin",
                    "Reach, Feedback, Measure"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the primary value of a 'Customer Journey Map' analysis?",
                "options": [
                    "Drawing physical maps for shipping",
                    "Understanding the series of interactions a customer has with a brand to identify friction points and improve UX",
                    "A database schema map",
                    "Writing Python loops"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the output of 'Market Basket Analysis' (e.g. Apriori algorithm)?",
                "options": [
                    "A physical shopping cart",
                    "Finding associations between products (e.g. customers who buy bread often buy milk)",
                    "Forecasting completely new products to invent",
                    "Analyzing the stock market"
                ],
                "answerIndex": 1
            },
            {
                "question": "What characterizes 'Prescriptive Analytics'?",
                "options": [
                    "It tells you what happened in the past",
                    "It predicts what will happen in the future",
                    "It suggests specific actions you should take to achieve a desired outcome",
                    "It prints a prescription format report"
                ],
                "answerIndex": 2
            },
            {
                "question": "Why is documentation crucial at the end of a Data Analysis project?",
                "options": [
                    "To make the file larger",
                    "So others can understand the methodology, reproduce the results, and maintain the dashboard",
                    "To hide trade secrets",
                    "To impress HR algorithms"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 10,
        "title": "Data Analyst Interview Preparation",
        "description": "Topics: SQL interview questions, case studies, data interpretation problems.",
        "icon": "PeopleIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "How do you prepare for an SQL technical interview?",
                "options": [
                    "Memorize the history of SQL",
                    "Practice writing queries for aggregations, JOINs, subqueries, and Window Functions",
                    "Learn how to build servers",
                    "Read about NoSQL databases"
                ],
                "answerIndex": 1
            },
            {
                "question": "If an interviewer gives you a business case study outlining a drop in user engagement, what shouldn't you do?",
                "options": [
                    "Ask clarifying questions to narrow the scope",
                    "Immediately conclude it's a bug without exploring segments or metrics",
                    "Break down the metric into possible components (e.g. regional, platform-specific)",
                    "Define exactly what 'engagement' means in this context"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is a 'Window Function' in SQL (e.g. ROW_NUMBER(), RANK())?",
                "options": [
                    "A function that creates an OS window",
                    "A function that performs calculations across a set of table rows that are somehow related to the current row, without collapsing the result set",
                    "A function that displays data visually",
                    "A string formatting function"
                ],
                "answerIndex": 1
            },
            {
                "question": "An interviewer asks you to explain 'p-value' to a non-technical manager. What is the best strategy?",
                "options": [
                    "Give the exact mathematical formula",
                    "Refuse to answer",
                    "Explain it simply: It's the probability that your results happened just by random chance. A low score means the results are significant, not luck.",
                    "Use extreme statistical jargon to sound smart"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is typically expected when asked 'Tell me about a time you found an insight that drove impact'?",
                "options": [
                    "You name a Python library",
                    "You use the STAR method to describe the data you analyzed, the hidden trend you found, and how the business profited from your recommendation",
                    "You complain about your previous manager",
                    "You describe a tutorial you watched"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you handle a scenario where the interviewer asks you to analyze a table with very dirty data?",
                "options": [
                    "Panic and give up",
                    "State your assumptions, mention how you would clean/impute the data first, and then proceed with the analysis",
                    "Delete all the dirty data rows immediately",
                    "Tell them the data is bad and can't be used"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which of these is a classic SQL interview question concept?",
                "options": [
                    "Finding the second highest salary using subqueries or rank",
                    "Writing the source code for a database engine",
                    "Uploading an image to SQL",
                    "Styling a web page"
                ],
                "answerIndex": 0
            },
            {
                "question": "In a metrics interpretation interview, you're told Revenue goes up but Profit goes down. Why?",
                "options": [
                    "This is mathematically impossible",
                    "Customer acquisition costs or operational expenses rose faster than the new revenue generated",
                    "Someone modified the database",
                    "The revenue is fake"
                ],
                "answerIndex": 1
            },
            {
                "question": "Why would an interviewer ask you which visualization to choose for a given dataset?",
                "options": [
                    "To test your visual arts skills",
                    "To ensure you know how to effectively communicate the specific relationship or metric to a stakeholder clearly",
                    "To check if you know all the libraries",
                    "To test if you like Pie Charts"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is the most important soft skill for a Data Analyst to demonstrate during an interview?",
                "options": [
                    "Typing speed",
                    "Communication\u2014especially the ability to translate technical findings into non-technical business recommendations",
                    "Programming in 5 languages",
                    "Memorizing equations"
                ],
                "answerIndex": 1
            }
        ]
    }
];

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

export default function DataAnalysisRoadmap() {
    const { user } = useOutletContext() || {};
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeStepData, setActiveStepData] = useState(null);
    const [dataAnalysisRoadmap, setDataAnalysisRoadmap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().dataAnalysisRoadmap) {
                        setDataAnalysisRoadmap(docSnap.data().dataAnalysisRoadmap);
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
        const isCompleted = dataAnalysisRoadmap[`step${step.id}Passed`] === true;
        const isUnlocked = step.id === 1 || dataAnalysisRoadmap[`step${step.id - 1}Passed`] === true;

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
            ...dataAnalysisRoadmap,
            [`step${stepId}Score`]: score,
            [`step${stepId}Total`]: total,
        };

        if (isPassed) {
            updatedRoadmap[`step${stepId}Passed`] = true;
        } else {
            updatedRoadmap[`step${stepId}Passed`] = dataAnalysisRoadmap[`step${stepId}Passed`] || false;
        }

        setDataAnalysisRoadmap(updatedRoadmap);

        if (user?.uid) {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    dataAnalysisRoadmap: updatedRoadmap
                });
            } catch (error) {
                console.error("Error updating roadmap progress in Firebase:", error);
            }
        }
    };

    if (loading) {
        return <div className="roadmap-loading">Generating your Data Analysis roadmap...</div>;
    }

    const completedCount = ROADMAP_STEPS.filter(step => dataAnalysisRoadmap[`step${step.id}Passed`] === true).length;
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
                    <h1 className="roadmap-title">Data Analysis Learning Roadmap</h1>
                    <p className="roadmap-subtitle">
                        Complete these 10 steps to reach a moderate level in Data Analysis. Score at least 50% on each quiz to unlock the next step.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>Data Analysis Readiness</span>
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
                    const isCompleted = dataAnalysisRoadmap[`step${step.id}Passed`] === true;
                    const isUnlocked = step.id === 1 || dataAnalysisRoadmap[`step${step.id - 1}Passed`] === true;
                    const isCurrent = isUnlocked && !isCompleted;
                    const isLocked = !isUnlocked;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    const previousScore = dataAnalysisRoadmap[`step${step.id}Score`];
                    const previousTotal = dataAnalysisRoadmap[`step${step.id}Total`];
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
