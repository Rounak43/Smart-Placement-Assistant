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
        "title": "HTML Basics",
        "description": "Topics: HTML structure, tags, headings, paragraphs, links, images, lists, forms, semantic HTML.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does HTML stand for?",
                "options": [
                    "Hyper Text Preprocessor",
                    "Hyper Text Markup Language",
                    "Hyper Tool Multi Language",
                    "Hyperlinks and Text Markup Language"
                ],
                "answerIndex": 1
            },
            {
                "question": "Choose the correct HTML element for the largest heading:",
                "options": [
                    "<heading>",
                    "<h6>",
                    "<head>",
                    "<h1>"
                ],
                "answerIndex": 3
            },
            {
                "question": "What is the correct HTML element for inserting a line break?",
                "options": [
                    "<br>",
                    "<break>",
                    "<lb>",
                    "<newline>"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which character is used to indicate an end tag?",
                "options": [
                    "*",
                    "^",
                    "<",
                    "/"
                ],
                "answerIndex": 3
            },
            {
                "question": "How can you make a numbered list?",
                "options": [
                    "<ul>",
                    "<list>",
                    "<ol>",
                    "<dl>"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the correct HTML for creating a hyperlink?",
                "options": [
                    "<a url='http://www.w3.org'>W3C</a>",
                    "<a href='http://www.w3.org'>W3C</a>",
                    "<a>http://www.w3.org</a>",
                    "<link src='http://www.w3.org'>W3C</link>"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
                "options": [
                    "alt",
                    "title",
                    "src",
                    "longdesc"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which doctype is correct for HTML5?",
                "options": [
                    "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 5.0//EN' 'http://www.w3.org/TR/html5/strict.dtd'>",
                    "<!DOCTYPE html>",
                    "<!DOCTYPE HTML5>",
                    "<!DOCTYPE html5>"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which HTML element is used to define a form for user input?",
                "options": [
                    "<form>",
                    "<input>",
                    "<userinput>",
                    "<formbox>"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is the purpose of semantic HTML tags?",
                "options": [
                    "To style the text",
                    "To provide meaning and structure to the web content",
                    "To execute JavaScript",
                    "To add animations"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 2,
        "title": "CSS Fundamentals",
        "description": "Topics: selectors, colors, margins, padding, borders, fonts, box model.",
        "icon": "AccountTreeIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does CSS stand for?",
                "options": [
                    "Cascading Style Sheets",
                    "Creative Style System",
                    "Computer Style Sheets",
                    "Colorful Style Sheets"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which HTML attribute is used to define inline styles?",
                "options": [
                    "class",
                    "font",
                    "style",
                    "styles"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which is the correct CSS syntax?",
                "options": [
                    "body:color=black;",
                    "{body:color=black;}",
                    "body {color: black;}",
                    "{body;color:black;}"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you insert a comment in a CSS file?",
                "options": [
                    "// this is a comment //",
                    "/* this is a comment */",
                    "' this is a comment",
                    "// this is a comment"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which property is used to change the background color?",
                "options": [
                    "color",
                    "bgcolor",
                    "background-color",
                    "bg-color"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you add a background color for all <h1> elements?",
                "options": [
                    "h1 {background-color:#FFFFFF;}",
                    "h1.all {background-color:#FFFFFF;}",
                    "all.h1 {background-color:#FFFFFF;}",
                    "h1 {bgcolor:#FFFFFF;}"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which CSS property controls the text size?",
                "options": [
                    "font-style",
                    "text-size",
                    "font-size",
                    "text-style"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the correct CSS syntax for making all the <p> elements bold?",
                "options": [
                    "p {font-weight:bold;}",
                    "p {text-size:bold;}",
                    "<p style='text-size:bold;'>",
                    "<p style='font-size:bold;'>"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you display hyperlinks without an underline?",
                "options": [
                    "a {text-decoration:none;}",
                    "a {text-decoration:no-underline;}",
                    "a {underline:none;}",
                    "a {decoration:no-underline;}"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which CSS property controls the space between the element's border and its content?",
                "options": [
                    "padding",
                    "spacing",
                    "margin",
                    "border-spacing"
                ],
                "answerIndex": 0
            }
        ]
    },
    {
        "id": 3,
        "title": "CSS Layout & Responsive Design",
        "description": "Topics: flexbox, grid, media queries, responsive design principles.",
        "icon": "AccountTreeIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the default flex-direction in CSS Flexbox?",
                "options": [
                    "row",
                    "column",
                    "row-reverse",
                    "column-reverse"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which property is used to align items vertically in a flex container (row direction)?",
                "options": [
                    "justify-content",
                    "align-content",
                    "align-items",
                    "vertical-align"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which CSS Grid property specifies the number and sizes of the columns?",
                "options": [
                    "grid-template-rows",
                    "grid-template-columns",
                    "grid-column-gap",
                    "grid-template-areas"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does a media query in CSS allow you to do?",
                "options": [
                    "Import external CSS files",
                    "Apply CSS rules based on device characteristics like screen width",
                    "Create animations",
                    "Query a database from CSS"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which of the following creates a 3-column grid with equal widths?",
                "options": [
                    "grid-template-columns: 1fr 1fr 1fr;",
                    "grid-columns: 3;",
                    "grid-template-columns: 33% 33% 33%;",
                    "display: grid 3;"
                ],
                "answerIndex": 0
            },
            {
                "question": "In Flexbox, how do you distribute extra space evenly between items?",
                "options": [
                    "justify-content: center;",
                    "justify-content: space-between;",
                    "justify-content: stretch;",
                    "align-items: space-between;"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does 'mobile-first' mean in responsive web design?",
                "options": [
                    "Only creating a site for mobile devices",
                    "Designing for small screens first, then progressively enhancing for larger screens",
                    "Using mostly JavaScript for styling",
                    "Ignoring desktop users"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which unit is relative to the viewport width?",
                "options": [
                    "px",
                    "em",
                    "vh",
                    "vw"
                ],
                "answerIndex": 3
            },
            {
                "question": "What property makes an element a flex container?",
                "options": [
                    "display: flex;",
                    "display: block;",
                    "flex-wrap: wrap;",
                    "position: flex;"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you apply a media query for screens smaller than 600px?",
                "options": [
                    "@media screen < 600px {}",
                    "@media (max-width: 600px) {}",
                    "@media (min-width: 600px) {}",
                    "@screen (max-width: 600px) {}"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 4,
        "title": "JavaScript Basics",
        "description": "Topics: variables, data types, operators, loops, functions, arrays, objects.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "Inside which HTML element do we put the JavaScript?",
                "options": [
                    "<script>",
                    "<js>",
                    "<scripting>",
                    "<javascript>"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you create a function in JavaScript?",
                "options": [
                    "function myFunction()",
                    "function:myFunction()",
                    "function = myFunction()",
                    "create myFunction()"
                ],
                "answerIndex": 0
            },
            {
                "question": "How do you write 'Hello World' in an alert box?",
                "options": [
                    "msgBox('Hello World');",
                    "alertBox('Hello World');",
                    "msg('Hello World');",
                    "alert('Hello World');"
                ],
                "answerIndex": 3
            },
            {
                "question": "How do you call a function named 'myFunction'?",
                "options": [
                    "call myFunction()",
                    "myFunction()",
                    "call function myFunction()",
                    "execute myFunction()"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which variable declaration does NOT allow reassignment?",
                "options": [
                    "var",
                    "let",
                    "const",
                    "def"
                ],
                "answerIndex": 2
            },
            {
                "question": "What will `typeof []` return in JavaScript?",
                "options": [
                    "array",
                    "list",
                    "object",
                    "undefined"
                ],
                "answerIndex": 2
            },
            {
                "question": "How does a 'for' loop start?",
                "options": [
                    "for (i = 0; i <= 5)",
                    "for (i <= 5; i++)",
                    "for i = 1 to 5",
                    "for (let i = 0; i < 5; i++)"
                ],
                "answerIndex": 3
            },
            {
                "question": "What is the correct way to write a JavaScript array?",
                "options": [
                    "var colors = 1 = ('red'), 2 = ('green')",
                    "var colors = (1:'red', 2:'green')",
                    "var colors = ['red', 'green', 'blue']",
                    "var colors = 'red', 'green', 'blue'"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which operator is used to assign a value to a variable?",
                "options": [
                    "*",
                    "-",
                    "=",
                    "x"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the strict equality operator in JavaScript?",
                "options": [
                    "=",
                    "==",
                    "===",
                    "!="
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 5,
        "title": "JavaScript DOM Manipulation",
        "description": "Topics: DOM selection, event listeners, form validation, dynamic UI updates.",
        "icon": "FunctionsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is the DOM?",
                "options": [
                    "Document Object Model",
                    "Data Object Model",
                    "Digital Output Method",
                    "Dynamic Object Model"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which method selects an element based on its id?",
                "options": [
                    "querySelector()",
                    "getElementById()",
                    "getElementsByName()",
                    "selectId()"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you add an event listener to an element in JS?",
                "options": [
                    "element.addListener('click', func)",
                    "element.on('click', func)",
                    "element.addEventListener('click', func)",
                    "element.listen('click', func)"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you change the text content of a selected element?",
                "options": [
                    "element.textContent = 'text'",
                    "element.text = 'text'",
                    "element.innerHTML = 'text'",
                    "Both A and C"
                ],
                "answerIndex": 3
            },
            {
                "question": "What event is triggered when a user submits a form?",
                "options": [
                    "onclick",
                    "onsend",
                    "onsubmit",
                    "onchange"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which method is used to create a new HTML element dynamically?",
                "options": [
                    "document.createElement()",
                    "document.addElement()",
                    "document.newElement()",
                    "document.makeElement()"
                ],
                "answerIndex": 0
            },
            {
                "question": "How can you prevent a form's default submission behavior?",
                "options": [
                    "event.stopPropagation()",
                    "event.preventDefault()",
                    "form.stop()",
                    "return false"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which property gives you the value of an input field?",
                "options": [
                    "input.text",
                    "input.value",
                    "input.content",
                    "input.data"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you completely remove an element from the DOM?",
                "options": [
                    "element.hide()",
                    "element.delete()",
                    "element.remove()",
                    "element.erase()"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which method returns a NodeList containing all matching elements?",
                "options": [
                    "getElementById()",
                    "querySelector()",
                    "querySelectorAll()",
                    "getElementsByClass()"
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 6,
        "title": "Advanced JavaScript",
        "description": "Topics: ES6 features, arrow functions, promises, async/await, modules.",
        "icon": "FunctionsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does ES6 stand for?",
                "options": [
                    "ECMAScript 6",
                    "Enterprise Script 6",
                    "Essential Script 6",
                    "Extended Syntax 6"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is the correct syntax for an arrow function?",
                "options": [
                    "() => {}",
                    "=> () {}",
                    "function() => {}",
                    "() -> {}"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is a Promise in JavaScript?",
                "options": [
                    "A guarantee to execute code quickly",
                    "An object representing the eventual completion or failure of an asynchronous operation",
                    "A native math function",
                    "A database connection object"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which keyword is used to pause execution until a Promise settles?",
                "options": [
                    "wait",
                    "yield",
                    "pause",
                    "await"
                ],
                "answerIndex": 3
            },
            {
                "question": "The `async` keyword placed before a function makes it always return a...",
                "options": [
                    "Boolean",
                    "String",
                    "Promise",
                    "Object"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you import a module named 'utils' as default?",
                "options": [
                    "import { utils } from './utils';",
                    "import utils from './utils';",
                    "include utils from './utils';",
                    "require('./utils').utils;"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is object destructuring?",
                "options": [
                    "Destroying an object inside memory",
                    "Unpacking values from arrays or properties from objects into distinct variables",
                    "Deleting a property from an object",
                    "Converting an object to a string"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which syntax spreads an array into individual elements?",
                "options": [
                    "...array",
                    "array...",
                    "*array",
                    "spread(array)"
                ],
                "answerIndex": 0
            },
            {
                "question": "What ES6 feature allows embedding variables in a string easily?",
                "options": [
                    "Double Quotes",
                    "Single Quotes",
                    "Template Literals",
                    "String Formatting"
                ],
                "answerIndex": 2
            },
            {
                "question": "Which array method creates a new array populated with the results of calling a provided function on every element?",
                "options": [
                    "filter()",
                    "forEach()",
                    "reduce()",
                    "map()"
                ],
                "answerIndex": 3
            }
        ]
    },
    {
        "id": 7,
        "title": "Frontend Framework (React)",
        "description": "Topics: components, props, state, hooks, JSX, routing.",
        "icon": "DeveloperBoardIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is React?",
                "options": [
                    "A CSS framework",
                    "A JavaScript library for building user interfaces",
                    "A database management system",
                    "A backend server framework"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is JSX?",
                "options": [
                    "JavaScript XML",
                    "Java Syntax Extension",
                    "JSON extension",
                    "JavaScript Execution"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which hook is used to manage local state in a functional component?",
                "options": [
                    "useContext",
                    "useReducer",
                    "useState",
                    "useEffect"
                ],
                "answerIndex": 2
            },
            {
                "question": "What are props in React?",
                "options": [
                    "Internal state",
                    "Arguments passed into React components",
                    "Database properties",
                    "Styling classes"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which hook is best used for performing side effects (like data fetching)?",
                "options": [
                    "useState",
                    "useEffect",
                    "useMemo",
                    "useRef"
                ],
                "answerIndex": 1
            },
            {
                "question": "In React, data flows...",
                "options": [
                    "Upwards (Child to Parent)",
                    "Downwards (Parent to Child)",
                    "Bidirectionally",
                    "Randomly"
                ],
                "answerIndex": 1
            },
            {
                "question": "How do you render a list of items dynamically in React?",
                "options": [
                    "Using a for loop",
                    "Using array.map()",
                    "Using while loop",
                    "Using array.filter()"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is React Router used for?",
                "options": [
                    "Managing global state",
                    "Handling API requests",
                    "Enabling client-side routing within a React app",
                    "Optimizing CSS"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is the virtual DOM?",
                "options": [
                    "A lightweight copy of the actual DOM stored in memory",
                    "A slow, direct way to manipulate HTML",
                    "A browser plugin",
                    "A backend tool"
                ],
                "answerIndex": 0
            },
            {
                "question": "When does the useEffect hook run if its dependency array is empty []?",
                "options": [
                    "On every render",
                    "Only when state changes",
                    "Only once after the initial render",
                    "Never"
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 8,
        "title": "Backend Development",
        "description": "Topics: Node.js, Express.js, REST APIs, server logic.",
        "icon": "HubIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What is Node.js?",
                "options": [
                    "A frontend framework",
                    "A JavaScript runtime built on Chrome's V8 engine",
                    "A database system",
                    "A programming language"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is Express.js?",
                "options": [
                    "A database engine",
                    "A fast, unopinionated web framework for Node.js",
                    "A frontend UI library",
                    "An ORM tool"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which HTTP method is typically used to create new data?",
                "options": [
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which HTTP method is typically used to retrieve data without modifying it?",
                "options": [
                    "POST",
                    "GET",
                    "PATCH",
                    "DELETE"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does REST stand for?",
                "options": [
                    "Representational State Transfer",
                    "Request Status Terminal",
                    "Remote Server Transfer",
                    "Runtime Execution System Task"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is middleware in Express?",
                "options": [
                    "A database",
                    "A server type",
                    "Functions that have access to request and response objects",
                    "A styling format"
                ],
                "answerIndex": 2
            },
            {
                "question": "How do you start an Express server to listen on a port?",
                "options": [
                    "app.start(port)",
                    "app.listen(port)",
                    "app.run(port)",
                    "server.start(port)"
                ],
                "answerIndex": 1
            },
            {
                "question": "In Express, how do you access URL parameters (e.g., /users/:id)?",
                "options": [
                    "req.body",
                    "req.params.id",
                    "req.query",
                    "req.url"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does JSON stand for?",
                "options": [
                    "JavaScript Object Notation",
                    "Java Sync Output Network",
                    "JavaScript Style Object Notation",
                    "Java System Object Network"
                ],
                "answerIndex": 0
            },
            {
                "question": "What status code generally indicates a successful HTTP request?",
                "options": [
                    "404",
                    "500",
                    "200",
                    "401"
                ],
                "answerIndex": 2
            }
        ]
    },
    {
        "id": 9,
        "title": "Databases",
        "description": "Topics: MongoDB, CRUD operations, database connections.",
        "icon": "AnalyticsIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What type of database is MongoDB?",
                "options": [
                    "Relational/SQL Database",
                    "Graph Database",
                    "NoSQL Document Database",
                    "Time-series Database"
                ],
                "answerIndex": 2
            },
            {
                "question": "What data format does MongoDB use to store documents?",
                "options": [
                    "XML",
                    "CSV",
                    "SQL",
                    "BSON (Binary JSON)"
                ],
                "answerIndex": 3
            },
            {
                "question": "What does CRUD stand for?",
                "options": [
                    "Create, Read, Update, Delete",
                    "Compile, Run, Undo, Deploy",
                    "Copy, Retrieve, Upload, Download",
                    "Catch, Run, Use, Drop"
                ],
                "answerIndex": 0
            },
            {
                "question": "Which Mongoose method is used to find all documents in a collection?",
                "options": [
                    "Model.getAll()",
                    "Model.fetch()",
                    "Model.find()",
                    "Model.query()"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is a schema in Mongoose?",
                "options": [
                    "A backup file",
                    "A structure defining the shape of documents",
                    "A database server",
                    "An SQL statement"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which method deletes a single document in MongoDB?",
                "options": [
                    "remove()",
                    "deleteOne()",
                    "delete()",
                    "drop()"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is an index in a database used for?",
                "options": [
                    "To encrypt data",
                    "To slow down read operations",
                    "To improve the speed of data retrieval",
                    "To prevent unauthorized access"
                ],
                "answerIndex": 2
            },
            {
                "question": "How are relationships often handled in MongoDB?",
                "options": [
                    "Foreign keys",
                    "Embedding documents or referencing",
                    "Joins",
                    "Triggers"
                ],
                "answerIndex": 1
            },
            {
                "question": "What library is commonly used to interact with MongoDB in Node.js applications?",
                "options": [
                    "Sequelize",
                    "Prisma",
                    "SQLAlchemy",
                    "Mongoose"
                ],
                "answerIndex": 3
            },
            {
                "question": "Which command inserts a new document into a collection?",
                "options": [
                    "db.collection.add()",
                    "db.collection.insertOne()",
                    "db.collection.put()",
                    "db.collection.create()"
                ],
                "answerIndex": 1
            }
        ]
    },
    {
        "id": 10,
        "title": "Full Stack Projects & Deployment",
        "description": "Topics: building full stack applications, authentication, deployment using platforms like Vercel or Netlify.",
        "icon": "CheckCircleIcon",
        "action": "Take Quiz",
        "questions": [
            {
                "question": "What does pushing code to a 'production' environment mean?",
                "options": [
                    "Deleting the code",
                    "Making the application available to real end-users",
                    "Saving code locally",
                    "Testing the app"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which is a popular platform for deploying frontend React applications?",
                "options": [
                    "Vercel",
                    "MongoDB Atlas",
                    "Stripe",
                    "Postman"
                ],
                "answerIndex": 0
            },
            {
                "question": "What is Firebase primarily used for?",
                "options": [
                    "A frontend UI library",
                    "A backend-as-a-service (BaaS) offering authentication, database, etc.",
                    "A CSS framework",
                    "A text editor"
                ],
                "answerIndex": 1
            },
            {
                "question": "What is JWT?",
                "options": [
                    "Java Web Token",
                    "JSON Web Token",
                    "JavaScript Web Tool",
                    "Joint Web Technology"
                ],
                "answerIndex": 1
            },
            {
                "question": "What does CORS stand for?",
                "options": [
                    "Cross-Origin Resource Sharing",
                    "Central Optimization Routing System",
                    "Code Original Resourcing System",
                    "Cascading Object Rendering System"
                ],
                "answerIndex": 0
            },
            {
                "question": "Why do we use environment variables (.env files)?",
                "options": [
                    "To style our app",
                    "To write faster loops",
                    "To securely store sensitive configuration like API keys",
                    "To write HTML"
                ],
                "answerIndex": 2
            },
            {
                "question": "What is continuous integration/continuous deployment (CI/CD)?",
                "options": [
                    "Manual server reboots",
                    "A methodology to automate testing and deployment of applications",
                    "A database scaling technique",
                    "A type of firewall"
                ],
                "answerIndex": 1
            },
            {
                "question": "Which command is often used to build a production-ready React app (Vite or CRA)?",
                "options": [
                    "npm start",
                    "npm run dev",
                    "npm run test",
                    "npm run build"
                ],
                "answerIndex": 3
            },
            {
                "question": "What happens when you run `npm run build`?",
                "options": [
                    "It deletes your code",
                    "It starts a development server",
                    "It bundles and optimizes the app for production",
                    "It installs dependencies"
                ],
                "answerIndex": 2
            },
            {
                "question": "Where are environmental variables typically set on a hosting provider like Netlify or Render?",
                "options": [
                    "Inside the JS files",
                    "In the browser console",
                    "In the project settings dashboard",
                    "In the package.json file"
                ],
                "answerIndex": 2
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

export default function WebDevRoadmap() {
    const { user } = useOutletContext() || {};
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [activeStepData, setActiveStepData] = useState(null);
    const [webDevRoadmap, setWebDevRoadmap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().webDevRoadmap) {
                        setWebDevRoadmap(docSnap.data().webDevRoadmap);
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
        // Only allow clicking if it's unlocked
        const isCompleted = webDevRoadmap[`step${step.id}Passed`] === true;
        const isUnlocked = step.id === 1 || webDevRoadmap[`step${step.id - 1}Passed`] === true;

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
            ...webDevRoadmap,
            [`step${stepId}Score`]: score,
            [`step${stepId}Total`]: total,
        };

        if (isPassed) {
            updatedRoadmap[`step${stepId}Passed`] = true;
        } else {
            // If already passed previously, don't overwrite with false
            updatedRoadmap[`step${stepId}Passed`] = webDevRoadmap[`step${stepId}Passed`] || false;
        }

        setWebDevRoadmap(updatedRoadmap);

        // Update Firebase
        if (user?.uid) {
            try {
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    webDevRoadmap: updatedRoadmap
                });
            } catch (error) {
                console.error("Error updating roadmap progress in Firebase:", error);
            }
        }
    };

    if (loading) {
        return <div className="roadmap-loading">Generating your Web Development roadmap...</div>;
    }

    const completedCount = ROADMAP_STEPS.filter(step => webDevRoadmap[`step${step.id}Passed`] === true).length;
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
                    <h1 className="roadmap-title">Web Development Learning Roadmap</h1>
                    <p className="roadmap-subtitle">
                        Complete these 10 steps to reach a moderate level in Web Dev. Score at least 50% on each quiz to unlock the next step.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>Web Dev Readiness</span>
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
                    const isCompleted = webDevRoadmap[`step${step.id}Passed`] === true;
                    // It's the current step if it's the first one locked AFTER the completed ones
                    const isUnlocked = step.id === 1 || webDevRoadmap[`step${step.id - 1}Passed`] === true;
                    const isCurrent = isUnlocked && !isCompleted;
                    const isLocked = !isUnlocked;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    // Display previous score if available
                    const previousScore = webDevRoadmap[`step${step.id}Score`];
                    const previousTotal = webDevRoadmap[`step${step.id}Total`];
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
