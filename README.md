# Caremerge Express Test

This repository contains a Node.js project that implements a specific server task using various asynchronous control flow strategies. The server responds to a single route (`GET /I/want/title`) and processes a list of website addresses provided in the query string. The task is to request each website, parse the HTML for the `<title>` tag, and return a formatted HTML response with the titles.

## Description

The project showcases different methods of handling asynchronous operations in Node.js and Express.js, including:
- Plain callbacks
- The `async` library
- Promises
- The `step` library
- The `Q` library

Each method is implemented in a separate file for easy comparison and testing.

## Installation

To get started with this project, clone the repository and install the dependencies.

```bash
git clone https://github.com/SulemanAli303/CaremergeExpress.git
cd CaremergeExpress
npm install
```
## Running Files

To run the server using different asynchronous control strategies, you can use the npm run script commands defined in the `package.json` file. Each command corresponds to a different strategy:
for run the project plain-callbacks
```bash 
npm run dev1  
```
for run the project using-async
```bash
npm run dev2  
```
for run the project using-promises
```bash
npm run dev3  
```
for run the project using-step
```bash
npm run dev4  
```
For Express
for run the project using-Q
```bash
npm run dev5 
```
for run the project plain-callbacks
```bash
npm run dev6  
```
for run the project using-async
```bash
npm run dev7  
```
for run the project using-promises
```bash
npm run dev8  
```
for run the project using-step
```bash
npm run dev9  
```
for run the project using-Q
```bash
npm run dev10 
```

