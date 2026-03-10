import json
import os

STEPS = [
    {
        "id": 1,
        "title": "Programming Fundamentals",
        "description": "Topics: variables, data types, loops, functions, conditional statements, basic problem solving.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is a variable in programming?",
                "options": ["A math concept", "A type of loop", "A container for storing data values", "A function"],
                "answerIndex": 2
            },
            {
                "question": "Which of these is NOT a primitive data type in most languages?",
                "options": ["Integer", "String", "Object/Class", "Boolean"],
                "answerIndex": 2
            },
            {
                "question": "What is the purpose of a 'for' loop?",
                "options": ["To define a function", "To execute a block of code a specific number of times", "To handle errors", "To import libraries"],
                "answerIndex": 1
            },
            {
                "question": "What does a 'return' statement do inside a function?",
                "options": ["Exits the program", "Restarts the loop", "Sends a value back to where the function was called", "Prints text to the console"],
                "answerIndex": 2
            },
            {
                "question": "Which operator is used to check for equality in most C-based languages (JS, Java, C++)?",
                "options": ["=", "==", "=>", "!=="],
                "answerIndex": 1
            },
            {
                "question": "An 'if-else' block allows the program to:",
                "options": ["Repeat indefinitely", "Store an array", "Make decisions based on conditions", "Connect to a database"],
                "answerIndex": 2
            },
            {
                "question": "What is the main purpose of writing 'functions'?",
                "options": ["Code reusability and modularity", "Making the code run faster", "Encrypting passwords", "Adding styles to a webpage"],
                "answerIndex": 0
            },
            {
                "question": "Which loop executes at least once before checking its condition?",
                "options": ["for loop", "while loop", "do-while loop", "nested loop"],
                "answerIndex": 2
            },
            {
                "question": "If x=5, what is x++?",
                "options": ["5 (then becomes 6)", "6", "error", "x doesn't change"],
                "answerIndex": 0
            },
            {
                "question": "What is 'Pseudocode'?",
                "options": ["A type of malware", "Fake code that doesn't compile", "A plain language description of the steps in an algorithm", "A specific programming language"],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 2,
        "title": "Object-Oriented Programming",
        "description": "Topics: classes, objects, inheritance, polymorphism, encapsulation, abstraction.",
        "icon": "AccountTreeIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is a Class in OOP?",
                "options": ["A variable", "A blueprint for creating objects", "An instance of an object", "A database table"],
                "answerIndex": 1
            },
            {
                "question": "What is an Object?",
                "options": ["A blueprint", "A loop structure", "An instance of a class", "A reserved keyword"],
                "answerIndex": 2
            },
            {
                "question": "Which OOP principle hides the internal realization details of an object?",
                "options": ["Polymorphism", "Abstraction", "Inheritance", "Inheritance"],
                "answerIndex": 1
            },
            {
                "question": "What does 'Encapsulation' refer to?",
                "options": ["Inheriting properties from a parent", "Bundling data and methods that operate on that data into a single unit", "Having multiple forms", "Hiding internal complexity"],
                "answerIndex": 1
            },
            {
                "question": "What is Inheritance?",
                "options": ["A mechanism where one class acquires the properties and methods of another", "Binding variables dynamically", "Hiding the data", "Creating interfaces"],
                "answerIndex": 0
            },
            {
                "question": "What does 'Polymorphism' mean in OOP?",
                "options": ["Single variable holding multiple values", "A function processing multiple primitive types only", "The ability of different objects to respond to the same method call in their own way", "Hiding complexity"],
                "answerIndex": 2
            },
            {
                "question": "What is a Constructor?",
                "options": ["A method for destroying objects", "A special method used to initialize objects", "A design pattern", "A library script"],
                "answerIndex": 1
            },
            {
                "question": "Can a child class override a method inherited from its parent class?",
                "options": ["Yes, this is known as Method Overriding", "No, inherited methods are final", "Only in procedural programming", "Yes, but it's called Overloading"],
                "answerIndex": 0
            },
            {
                "question": "What is Method Overloading?",
                "options": ["Overriding a parent method", "Having multiple methods with the same name but different parameters within the same class", "Running a method too many times", "Inheriting attributes"],
                "answerIndex": 1
            },
            {
                "question": "Which keyword is typically used to inherit from a parent class (e.g. in Java/ES6)?",
                "options": ["inherits", "extends", "implements", "overrides"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 3,
        "title": "Data Structures",
        "description": "Topics: arrays, linked lists, stacks, queues, hash tables.",
        "icon": "FunctionsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Which data structure uses LIFO (Last-In-First-Out)?",
                "options": ["Queue", "Array", "Stack", "Tree"],
                "answerIndex": 2
            },
            {
                "question": "Which data structure uses FIFO (First-In-First-Out)?",
                "options": ["Stack", "Hash Table", "Queue", "Set"],
                "answerIndex": 2
            },
            {
                "question": "What is a key difference between an Array and a Linked List?",
                "options": ["Arrays store elements consecutively in memory; Linked lists use pointers", "Linked lists are faster for random access", "Arrays can grow dynamically without reallocation", "They are identical in C++"],
                "answerIndex": 0
            },
            {
                "question": "In a Hash Table, what maps a key to an index?",
                "options": ["A loop", "A Hash Function", "An Array Pointer", "A Node"],
                "answerIndex": 1
            },
            {
                "question": "What happens in a Hash Table when two keys hash to the same index?",
                "options": ["Memory leak", "Stack overflow", "A Collision occurs", "The table resets"],
                "answerIndex": 2
            },
            {
                "question": "Which of these is best for quickly looking up items by a unique key?",
                "options": ["Linked List", "Queue", "Hash Table", "Stack"],
                "answerIndex": 2
            },
            {
                "question": "What does a Node in a Singly Linked List contain?",
                "options": ["A pointer to the parent and left child", "Data and a reference/pointer to the next node", "Data only", "Pointers to both next and previous nodes"],
                "answerIndex": 1
            },
            {
                "question": "Which operation is O(1) in a standard Stack?",
                "options": ["Searching for an element", "Popping the top element", "Sorting the elements", "Accessing the bottom element"],
                "answerIndex": 1
            },
            {
                "question": "What data structure is typically used for Breadth-First Search (BFS)?",
                "options": ["Queue", "Stack", "Hash Table", "Binary Search Tree"],
                "answerIndex": 0
            },
            {
                "question": "What data structure is typically used for Depth-First Search (DFS)?",
                "options": ["Queue", "Stack", "Priority Queue", "Heap"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 4,
        "title": "Algorithms",
        "description": "Topics: searching algorithms, sorting algorithms, time complexity, space complexity, Big-O notation.",
        "icon": "AnalyticsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does Big-O notation describe?",
                "options": ["The programming language version", "The worst-case theoretical time or space complexity of an algorithm", "The amount of lines of code", "The compile time"],
                "answerIndex": 1
            },
            {
                "question": "What is the time complexity of Binary Search?",
                "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                "answerIndex": 2
            },
            {
                "question": "In which scenario can Binary Search be applied?",
                "options": ["On any array", "On a sorted array", "On a Linked List only", "On a Hash Table"],
                "answerIndex": 1
            },
            {
                "question": "Which sorting algorithm has a worst-case time complexity of O(n log n)?",
                "options": ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
                "answerIndex": 2
            },
            {
                "question": "What is the average time complexity of Quick Sort?",
                "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                "answerIndex": 1
            },
            {
                "question": "Which sort algorithm continuously steps through the list, swapping adjacent elements if they are in the wrong order?",
                "options": ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
                "answerIndex": 2
            },
            {
                "question": "Space complexity measures:",
                "options": ["How long the code takes to run", "How many bits are in a byte", "How much memory/RAM an algorithm requires during execution", "The size of the source code file"],
                "answerIndex": 2
            },
            {
                "question": "Which algorithmic paradigm does Merge Sort use?",
                "options": ["Dynamic Programming", "Greedy Approach", "Divide and Conquer", "Backtracking"],
                "answerIndex": 2
            },
            {
                "question": "What is the Big-O for accessing an element in an Array by its index?",
                "options": ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
                "answerIndex": 1
            },
            {
                "question": "What is Memoization?",
                "options": ["Memory leak detection", "Storing the results of expensive function calls and returning the cached result when the same inputs occur", "Writing code from memory", "Sorting by memory address"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 5,
        "title": "Database Fundamentals",
        "description": "Topics: SQL basics, database design, normalization, CRUD operations.",
        "icon": "InsertChartIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does CRUD stand for?",
                "options": ["Create, Run, Update, Delete", "Copy, Read, Undo, Drop", "Create, Read, Update, Delete", "Compile, Run, User, Database"],
                "answerIndex": 2
            },
            {
                "question": "Which SQL statement is used to extract data from a database?",
                "options": ["GET", "OPEN", "EXTRACT", "SELECT"],
                "answerIndex": 3
            },
            {
                "question": "What is a Primary Key?",
                "options": ["A key to encrypt the database", "A unique identifier for a record in a table", "The first column in any database", "A password for the database"],
                "answerIndex": 1
            },
            {
                "question": "What does SQL stand for?",
                "options": ["Standard Query Language", "Structured Question Language", "Structured Query Language", "Simple Query Logic"],
                "answerIndex": 2
            },
            {
                "question": "What is Database Normalization?",
                "options": ["Making all table names lowercase", "Process of organizing data to reduce redundancy and improve data integrity", "Backing up the database", "Removing all foreign keys"],
                "answerIndex": 1
            },
            {
                "question": "Which SQL keyword is used to sort the result-set?",
                "options": ["ORDER BY", "SORT", "GROUP BY", "ALIGN"],
                "answerIndex": 0
            },
            {
                "question": "What is a Foreign Key?",
                "options": ["A key used by external software", "A field in one table that uniquely identifies a row of another table", "A backup key", "A key that is automatically generated"],
                "answerIndex": 1
            },
            {
                "question": "Which CRUD operation corresponds to the SQL 'INSERT' statement?",
                "options": ["Read", "Create", "Update", "Delete"],
                "answerIndex": 1
            },
            {
                "question": "Which command is used to remove a table entirely from the database?",
                "options": ["DROP TABLE", "REMOVE TABLE", "DELETE TABLE", "TRUNCATE TABLE"],
                "answerIndex": 0
            },
            {
                "question": "What does an INNER JOIN do?",
                "options": ["Returns all records from both tables", "Returns records that have matching values in both tables", "Deletes mismatched records", "Combines two databases"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 6,
        "title": "Version Control",
        "description": "Topics: Git basics, repositories, commits, branching, merging, GitHub workflow.",
        "icon": "HubIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is Git?",
                "options": ["A code editor", "A remote server", "A distributed version control system", "A programming language"],
                "answerIndex": 2
            },
            {
                "question": "What command initializes a new Git repository?",
                "options": ["git start", "git init", "git create", "git new"],
                "answerIndex": 1
            },
            {
                "question": "What does 'git clone' do?",
                "options": ["Duplicates a branch locally", "Creates a backup of local files", "Copies an existing Git repository from a remote server to a local machine", "Pushes local changes to remote"],
                "answerIndex": 2
            },
            {
                "question": "Which command adds files to the staging area?",
                "options": ["git stage", "git add", "git commit", "git push"],
                "answerIndex": 1
            },
            {
                "question": "What is a 'commit' in Git?",
                "options": ["A message to the team", "Uploading code to GitHub", "A snapshot of the project's files at a given point in time", "Closing a branch"],
                "answerIndex": 2
            },
            {
                "question": "What does a 'git push' do?",
                "options": ["Sends local commits to a remote repository", "Downloads remote commits to your local machine", "Forcefully merges two branches", "Deletes uncommitted files"],
                "answerIndex": 0
            },
            {
                "question": "What does a 'git pull' do?",
                "options": ["Downloads commits from remote but doesn't merge them", "Fetches and immediately merges remote changes into the current branch", "Reverts the last commit", "Requests a code review"],
                "answerIndex": 1
            },
            {
                "question": "Why use branching in Git?",
                "options": ["To compress the codebase", "To create a secure login for developers", "To isolate experimental or feature work from the main codebase", "To deploy to AWS"],
                "answerIndex": 2
            },
            {
                "question": "What happens in a Merge Conflict?",
                "options": ["Git automatically deletes one file", "GitHub locks your account", "Git stops the merge because there are competing changes that it cannot resolve automatically", "The Internet connection to the remote repo is lost"],
                "answerIndex": 2
            },
            {
                "question": "What is a Pull Request (PR) on platforms like GitHub?",
                "options": ["A request to download the codebase", "A request asking the repo owner to review and merge your changes into their branch", "An error report", "A command line Git tool"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 7,
        "title": "Software Development Principles",
        "description": "Topics: SDLC, agile methodology, clean code principles, debugging techniques.",
        "icon": "PsycholgyIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does SDLC stand for?",
                "options": ["System Design Life Cycle", "Software Development Life Cycle", "Standard Data Language Compiler", "Software Distribution Life Cycle"],
                "answerIndex": 1
            },
            {
                "question": "Which of these is NOT a typical phase in the SDLC?",
                "options": ["Requirement Analysis", "Design", "Marketing", "Maintenance"],
                "answerIndex": 2
            },
            {
                "question": "What is Agile Methodology?",
                "options": ["A linear, sequential approach to software design", "An iterative and incremental approach favoring flexibility and collaboration", "Writing all code before designing", "Hiring fast developers"],
                "answerIndex": 1
            },
            {
                "question": "In Agile Scrum, what is a 'Sprint'?",
                "options": ["Typing code as fast as possible", "A set period (e.g., 2 weeks) during which specific work has to be completed and made ready for review", "A daily meeting", "The final release of the software"],
                "answerIndex": 1
            },
            {
                "question": "What does DRY stand for in software engineering?",
                "options": ["Do Repeat Yourself", "Don't Repeat Yourself", "Direct Routing Yield", "Data Representation Yield"],
                "answerIndex": 1
            },
            {
                "question": "What is the primary goal of writing 'Clean Code'?",
                "options": ["Making the code run faster", "Minimizing the file size", "Ensuring code is readable, understandable, and maintainable by humans", "Using the newest syntax"],
                "answerIndex": 2
            },
            {
                "question": "What is debugging?",
                "options": ["Writing bug reports", "Process of finding and resolving defects or problems within a program", "Deploying software to a server", "Testing UX features"],
                "answerIndex": 1
            },
            {
                "question": "What does SOLID stand for in OOP principles?",
                "options": ["A brand of databases", "Principles for object-oriented design intended to make software more understandable, flexible, and maintainable", "Security, Optimization, Logging, Integration, Deployment", "Standard Operational Logic Integration Design"],
                "answerIndex": 1
            },
            {
                "question": "Which is an example of 'technical debt'?",
                "options": ["Paying for AWS servers", "Taking shortcuts in code implementation that will cost more effort to fix/maintain later", "Failing to pay developer salaries", "Purchasing software licenses"],
                "answerIndex": 1
            },
            {
                "question": "What is Continuous Integration (CI)?",
                "options": ["Merging all developer working copies to a shared mainline several times a day with automated testing", "Continuously talking to customers", "Writing code without taking breaks", "Leaving bugs in the code on purpose"],
                "answerIndex": 0
            }
        ]
    },
    {
        "id": 8,
        "title": "APIs and Backend Basics",
        "description": "Topics: REST APIs, HTTP methods, request and response structure, backend logic.",
        "icon": "ModelTrainingIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does API stand for?",
                "options": ["Advanced Programming Interface", "Application Programming Interface", "Automated Protocol Interaction", "Asynchronous Programming Integration"],
                "answerIndex": 1
            },
            {
                "question": "What does REST stand for?",
                "options": ["Reliable Execution Standard Transfer", "Representational State Transfer", "Request Execution Standard Tool", "Response Event System Transfer"],
                "answerIndex": 1
            },
            {
                "question": "Which HTTP method is typically used to retrieve data from a REST API?",
                "options": ["POST", "PUT", "DELETE", "GET"],
                "answerIndex": 3
            },
            {
                "question": "Which HTTP method is commonly used to send data to create a new resource?",
                "options": ["GET", "POST", "DELETE", "OPTIONS"],
                "answerIndex": 1
            },
            {
                "question": "What does an HTTP 404 status code mean?",
                "options": ["Internal Server Error", "Created Successfully", "Not Found", "Unauthorized"],
                "answerIndex": 2
            },
            {
                "question": "What does an HTTP 200 status code mean?",
                "options": ["OK / Success", "Bad Request", "Forbidden", "Server Timeout"],
                "answerIndex": 0
            },
            {
                "question": "What format is commonly used to transfer data in modern REST APIs?",
                "options": ["XML", "JSON", "CSV", "HTML"],
                "answerIndex": 1
            },
            {
                "question": "What is an API endpoint?",
                "options": ["The final line of a script", "A specific URL where an API can be accessed by a client application", "Where the database lives", "The physical server hardware"],
                "answerIndex": 1
            },
            {
                "question": "Which HTTP method is used for updating an existing resource entirely?",
                "options": ["PATCH", "POST", "GET", "PUT"],
                "answerIndex": 3
            },
            {
                "question": "What is the purpose of a Backend Server?",
                "options": ["To style the webpage using CSS", "To run browser animations", "To handle business logic, process data, and securely interact with databases", "To display images"],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 9,
        "title": "System Design Basics",
        "description": "Topics: scalability, load balancing, database architecture, microservices overview.",
        "icon": "AssignmentIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is 'Scalability' in system design?",
                "options": ["The visual size of a website", "The ability of a system to handle a growing amount of work or its potential to be enlarged", "Measuring the file size of the codebase", "Scaling images automatically"],
                "answerIndex": 1
            },
            {
                "question": "What is Vertical Scaling (Scaling Up)?",
                "options": ["Adding more individual servers to a pool", "Adding more power (CPU, RAM) to an existing machine", "Opening new data centers", "Deploying microservices"],
                "answerIndex": 1
            },
            {
                "question": "What is Horizontal Scaling (Scaling Out)?",
                "options": ["Making a server's motherboard physically wider", "Adding more power to a single machine", "Adding more machines into your pool of resources", "Using horizontal monitors"],
                "answerIndex": 2
            },
            {
                "question": "What is the role of a Load Balancer?",
                "options": ["To balance the electrical load of the server room", "To compress HTTP requests", "To distribute incoming network traffic across multiple servers", "To encrypt database passwords"],
                "answerIndex": 2
            },
            {
                "question": "What is a 'Monolithic' architecture?",
                "options": ["A database type", "A system where all components are tightly coupled and run as a single unified application", "A highly distributed AI system", "A cloud-only architecture"],
                "answerIndex": 1
            },
            {
                "question": "What is 'Microservices' architecture?",
                "options": ["Developing on very small computers", "A monolithic app with tiny functions", "Structuring an application as a collection of loosely coupled, independently deployable services", "A single massive server handling everything"],
                "answerIndex": 2
            },
            {
                "question": "What is Caching in system design?",
                "options": ["Paying for APIs", "Storing copies of frequently accessed data in a fast-access storage layer to speed up retrieval", "Deleting old data", "Encrypting user passwords"],
                "answerIndex": 1
            },
            {
                "question": "What is a Content Delivery Network (CDN)?",
                "options": ["A television network for developers", "A distributed group of servers delivering web content based on the geographic locations of the user", "A local database layer", "A code hosting platform like GitHub"],
                "answerIndex": 1
            },
            {
                "question": "In databases, what does Sharding mean?",
                "options": ["Deleting tables", "Horizontal partitioning of a database to split large tables across multiple servers", "Indexing columns", "Creating a backup copy"],
                "answerIndex": 1
            },
            {
                "question": "What does 'High Availability' mean?",
                "options": ["Developers are always online", "A system operating continuously without failing for a designated period", "Software that costs a lot of money", "A database that responds in 1ms"],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 10,
        "title": "Software Engineering Interview Preparation",
        "description": "Topics: coding interview questions, behavioral questions, system design basics, problem-solving strategies.",
        "icon": "PeopleIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is a common strategy for approaching algorithmic coding interviews?",
                "options": ["Start coding immediately without thinking", "Clarify the problem, think out loud, come up with an approach, write code, then test it", "Only use brute force", "Ask the interviewer for the answer"],
                "answerIndex": 1
            },
            {
                "question": "What does the STAR method stand for in behavioral interviews?",
                "options": ["Start, Tell, Answer, Review", "Strategy, Timing, Action, Result", "Situation, Task, Action, Result", "Situation, Technique, Approach, Reply"],
                "answerIndex": 2
            },
            {
                "question": "What is the purpose of behavioral interview questions?",
                "options": ["To test how fast you code", "To see if you know syntax", "To understand your past behavior, communication skills, and cultural fit", "To ask you to balance a load balancer"],
                "answerIndex": 2
            },
            {
                "question": "Which of these is considered a 'Brute Force' solution?",
                "options": ["The most optimized, linear time solution", "A solution that heavily relies on caching", "A straightforward but usually slow solution that checks all possible candidates", "A microservices design"],
                "answerIndex": 2
            },
            {
                "question": "Why do interviewers ask you to determine the Time Complexity (Big O)?",
                "options": ["To waste time", "To see if you understand the efficiency and scalability of your solution", "To see if you can do complex calculus", "To check how many lines of code you wrote"],
                "answerIndex": 1
            },
            {
                "question": "What should you do if you get stuck on an interview coding problem?",
                "options": ["Stay completely silent", "Give up and walk out", "Communicate your thought process and ask for hints or clarify constraints", "Start randomly typing"],
                "answerIndex": 2
            },
            {
                "question": "What is 'Whiteboarding' in the context of SWE interviews?",
                "options": ["Erasing a hard drive", "Solving a problem by writing code/diagrams on a whiteboard without an IDE", "Designing a UI using white space", "Writing tests first"],
                "answerIndex": 1
            },
            {
                "question": "Which of these topics is rarely asked in Junior/New Grad interviews but heavily in Senior interviews?",
                "options": ["Basic string manipulation", "Arrays and Loops", "In-depth distributed System Design", "Object-Oriented basics"],
                "answerIndex": 2
            },
            {
                "question": "A good way to handle edge cases during an interview is:",
                "options": ["Ignore them", "Write a completely separate app", "Identify them early during the clarify stage and write unit tests for them at the end", "Tell the interviewer edge cases don't matter"],
                "answerIndex": 2
            },
            {
                "question": "In a System Design interview, before drawing any architecture, you should first:",
                "options": ["Gather requirements (functional and non-functional) and clarify scale/constraints", "Draw a load balancer", "Write SQL schemas", "Choose between AWS and GCP instantly"],
                "answerIndex": 0
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

export default function SoftwareEngRoadmap() {
    const { user } = useOutletContext() || {};
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeStepData, setActiveStepData] = useState(null);
    const [softwareEngineeringRoadmap, setSoftwareEngRoadmap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().softwareEngineeringRoadmap) {
                        setSoftwareEngRoadmap(docSnap.data().softwareEngineeringRoadmap);
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
        const isCompleted = softwareEngineeringRoadmap[`step${step.id}Passed`] === true;
        const isUnlocked = step.id === 1 || softwareEngineeringRoadmap[`step${step.id - 1}Passed`] === true;

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
            ...softwareEngineeringRoadmap,
            [`step${stepId}Score`]: score,
            [`step${stepId}Total`]: total,
        };

        if (isPassed) {
            updatedRoadmap[`step${stepId}Passed`] = true;
        } else {
            updatedRoadmap[`step${stepId}Passed`] = softwareEngineeringRoadmap[`step${stepId}Passed`] || false;
        }

        setSoftwareEngRoadmap(updatedRoadmap);

        if (user?.uid) {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    softwareEngineeringRoadmap: updatedRoadmap
                });
            } catch (error) {
                console.error("Error updating roadmap progress in Firebase:", error);
            }
        }
    };

    if (loading) {
        return <div className="roadmap-loading">Generating your Software Engineering roadmap...</div>;
    }

    const completedCount = ROADMAP_STEPS.filter(step => softwareEngineeringRoadmap[`step${step.id}Passed`] === true).length;
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
                    <h1 className="roadmap-title">Software Engineering Learning Roadmap</h1>
                    <p className="roadmap-subtitle">
                        Complete these 10 steps to reach a moderate level in SWE. Score at least 50% on each quiz to unlock the next step.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>SWE Readiness Score</span>
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
                    const isCompleted = softwareEngineeringRoadmap[`step${step.id}Passed`] === true;
                    const isUnlocked = step.id === 1 || softwareEngineeringRoadmap[`step${step.id - 1}Passed`] === true;
                    const isCurrent = isUnlocked && !isCompleted;
                    const isLocked = !isUnlocked;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    const previousScore = softwareEngineeringRoadmap[`step${step.id}Score`];
                    const previousTotal = softwareEngineeringRoadmap[`step${step.id}Total`];
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
}"""

# Generate file content
final_code = template.replace('DATA_PLACEHOLDER', json.dumps(STEPS, indent=4))

# Write to file
with open("SoftwareEngRoadmap.jsx", "w", encoding="utf-8") as f:
    f.write(final_code)
