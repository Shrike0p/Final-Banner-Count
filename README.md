

# Banner Count Dashboard

## Overview

The Banner Count Dashboard is a dynamic one-page application built with React.js and Tailwind CSS. It allows users to manage banner visibility and content, including setting a countdown timer. The dashboard features rich text formatting for banner descriptions, providing an intuitive interface for users.

## Features

-   **Dynamic Banner Management**: Update banner title, description, and visibility settings.
-   **Countdown Timer**: Set a countdown timer using days, hours, and minutes.
-   **Rich Text Formatting**: Format the banner description with bold, italic, underline, and bullet points.
-   **Input Validation**: Ensures that the description and link fields are filled out correctly, with the link starting with "https://".

## Technologies Used

-   **Frontend**: React.js, Tailwind CSS
-   **Backend**: Node.js, Express.js, Prisma, PostgreSQL

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Shrike0p/Final-Banner-Count 
    ```
2.  Navigate to the project directory:
    
 ```bash
    cd Banner_Count
```
    
3.  Install the dependencies:
```bash
npm install
```
5.  Start the development server:
    
    ```bash
    npm start
    ```
    
6.  Open your browser and go to `http://localhost:3000` to view the application.
    

## Usage

 -  Use the input fields to set the banner title, description, countdown timer, and link.
 -  Utilize the formatting buttons to customize the description.
 -  Click on "Update Banner" to save changes.
 -  Toggle the visibility of the banner using the checkbox.
## API Endpoints
Backend Apis might take 5-10 seconds to respond for first request.

 ### 1. Get Banner Details
 -   **Endpoint**: `/api/banner`
-   **Method**: `GET`
-   **Description**: Retrieves the current banner details.
	 ```bash
	 https://final-banner-count-backend.onrender.com/api/banner
	 ```

##### Example Response:-
```json
{ 
	"id": 1, 
	"title": "Welcome Banner", 
	"description": "This is the welcome banner.", 
	"timer": "30", 
	"link": "https://example.com", 
	"visible": true 
}
```
### 2. Update Banner Details

-   **Endpoint**: `/api/banner`
-   **Method**: `POST`
-   **Description**: Updates or creates the banner details.
	 ```bash
	 https://final-banner-count-backend.onrender.com/api/banner
	 ```

#####  Request Body:-
```json
{ 
	"title": "New Banner Title", 
	"description": "This is the updated banner description.", 
	"timer": "60", 
	"link": "https://newlink.com", 
	"visible": true
}
```


## Contribution

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.
