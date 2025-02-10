/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutline = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for python for exam and level of difficulty easy with summary of course. List of chapters along with summary for each chapter, topic list in each chapter, all results in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_title": "Introduction to Python Programming (Easy Level)",\n  "course_summary": "This course provides a fundamental understanding of Python programming. It covers essential concepts such as variables, data types, control flow, functions, and basic input/output operations. The focus is on building a strong foundation for future Python learning without delving into advanced topics. No prior programming experience is required. You will learn to write simple Python scripts to solve basic problems.",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "Introduction to Python",\n      "chapter_summary": "This chapter introduces Python and its features, including why it\'s a popular language for beginners. It covers the basic installation process on different operating systems and introduces a simple Integrated Development Environment (IDE) or text editor for writing and running Python code.",\n      "topics": [\n        "What is Python?",\n        "Why Python is a good language for beginners",\n        "Features of Python",\n        "Installation of Python on Windows, macOS, and Linux",\n        "Setting up a text editor or IDE (e.g., VS Code, Thonny)",\n        "Running your first Python program (Hello, World!)"\n      ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "Variables, Data Types, and Operators",\n      "chapter_summary": "This chapter covers the basics of storing data using variables. It introduces fundamental data types like integers, floats, strings, and booleans, along with various operators to perform operations on these data types.",\n      "topics": [\n        "Variables: Naming rules and assignment",\n        "Data Types: Integers (int), Floating-point numbers (float), Strings (str), Booleans (bool)",\n        "Type conversion (casting)",\n        "Arithmetic Operators: +, -, *, /, %, **",\n        "Comparison Operators: ==, !=, >, <, >=, <=",\n        "Logical Operators: and, or, not",\n        "Assignment Operators: =, +=, -=, *=, /="\n      ]\n    },\n    {\n      "chapter_number": 3,\n      "chapter_title": "Control Flow: Conditional Statements",\n      "chapter_summary": "This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution based on certain conditions. It enables programs to make decisions based on input or calculations.",\n      "topics": [\n        "The `if` statement",\n        "The `if-else` statement",\n        "The `if-elif-else` statement",\n        "Nested `if` statements (briefly)",\n        "Using comparison and logical operators in conditional statements",\n        "Truthiness and Falsiness"\n      ]\n    },\n    {\n      "chapter_number": 4,\n      "chapter_title": "Control Flow: Loops",\n      "chapter_summary": "This chapter introduces the concept of loops (`for` and `while`) to repeat blocks of code. You will learn how to iterate over sequences (like strings) and how to repeat actions until a specific condition is met.",\n      "topics": [\n        "The `for` loop: iterating over strings and ranges",\n        "The `while` loop",\n        "The `break` statement",\n        "The `continue` statement",\n        "Nested loops (briefly)",\n        "Using loops with conditional statements"\n      ]\n    },\n    {\n      "chapter_number": 5,\n      "chapter_title": "Functions",\n      "chapter_summary": "This chapter explains how to define and use functions to organize code into reusable blocks. You will learn about function arguments, return values, and the importance of modularity.",\n      "topics": [\n        "Defining a function: `def` keyword",\n        "Calling a function",\n        "Function arguments (parameters): positional and keyword arguments",\n        "Return values: the `return` statement",\n        "Scope of variables (local vs. global)",\n        "Default argument values"\n      ]\n    },\n    {\n      "chapter_number": 6,\n      "chapter_title": "Input and Output",\n      "chapter_summary": "This chapter teaches you how to get input from the user using the `input()` function and how to display output using the `print()` function. You will also learn how to format strings for better readability.",\n      "topics": [\n        "The `print()` function: displaying output",\n        "The `input()` function: getting input from the user",\n        "String formatting: using f-strings and .format() method",\n        "Type conversion: converting strings to numbers (int(), float())",\n        "Basic file I/O (reading from and writing to text files)"\n      ]\n    }\n  ],\n    "exam_tips": [\n        "Pay attention to the syntax, especially indentation.",\n        "Understand the difference between the different data types and operators.",\n        "Practice writing simple programs using control flow statements.",\n        "Know how to define and call functions.",\n        "Be able to read input from the user and display output."\n    ],\n  "example_questions": [\n    "What is the output of the following code?\\n```python\\nx = 5\\ny = 10\\nif x < y:\\n    print(\'x is less than y\')\\nelse:\\n    print(\'x is greater than or equal to y\')\\n```",\n    "Write a Python program that takes two numbers as input and prints their sum.",\n    "Explain the difference between a `for` loop and a `while` loop. Give an example of when you might use each.",\n    "Write a function that takes a string as input and returns the length of the string.",\n    "How do you get input from the user in Python?"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await courseOutline.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
