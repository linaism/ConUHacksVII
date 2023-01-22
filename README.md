# ConUHacksVII : Arbitrading

This project is our submission for the 2023 ConuHacks Hackathon at Concordia University.

## Authors

- Lina Ismail
- Kareem El Assad
- Abhinav Batra
- Alois Clerc

## Project Overview

### The Backend

The backend is written in python using the `Flask` framework. It is responsible for the following tasks:

- Top 10 Symbols by Tag: Cancelled
- Top 10 Symbols by Tag: Trade
- Top 10 Symbols by Tag per Second: Cancelled
- Top 10 Symbols by Tag per Second: Trade
- Total Trades Over Time
- Total Cancelled Over Time

A `MongoDB Atlas` cluster was utilized to store JSON files as collections. The data was then queried using the `pandas` library.

### The Frontend

The frontend is written in `React`. It is responsible for the following tasks:

- Integrates with `axios` to make requests to the backend `API`.
- Displays the data in a horizontal bar graph using `chart.js`.
- Automatically updates the data in near-real-time using `React's` state management infrastructure.
- Visualizes the data served by the backend in a user-friendly manner.

## Notable Anomalies

A fair amount of anomalies were detected throughout the project.

- Some trades were confirmed/completed without a prior request being made.
- The market is occassionally flooded with requests prior to market open at 9:30am. This is likely to secure a lower price.
- Initial attempts at a purchase tend to start with a significantly low price that is gradualy increased.

## Setup Instructions

### Backend Setup

1. Cd to the backend folder using `cd Backend`
2. Create a virtual environment using `python -m venv venv`
3. Install project requirements using `python -m pip install -r requirements.txt`
4. Run the backend using `flask run`

### Frontend Setup

1. Cd to the frontend folder using `cd Frontend`
2. Install project dependencies using `npm install`
3. Start the project using `npm start`

## Images

![image](https://user-images.githubusercontent.com/56567796/213920520-fab55fde-fcfe-4a77-923f-9c4dfb3cf8ab.png)

![image](https://user-images.githubusercontent.com/56567796/213920564-2a1bbb0f-7e49-4eef-99ca-183f6479d362.png)

## License

This project is licensed under the MIT License.

## Acknowledgments

We would like to thank the 2023 ConuHacks team for hosting an amazing event.
