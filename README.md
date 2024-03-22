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

```bash
npm run dev1  //for run the priject plain-callbacks
npm run dev2  //for run the priject using-async
npm run dev3  //for run the priject using-promises
npm run dev4  //for run the priject using-step
npm run dev5  //for run the priject using-Q
// For Express
npm run dev6  //for run the priject plain-callbacks
npm run dev7  //for run the priject using-async
npm run dev8  //for run the priject using-promises
npm run dev9  //for run the priject using-step
npm run dev10  //for run the priject using-Q

```

