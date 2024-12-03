# Canadian Postal Code Locator App

This project is a simple web application built with **Next.js** and **TypeScript** that allows users to look up address information based on a valid Canadian postal code. It uses the Canada Post API to fetch the address details.

## Features

- Input validation for Canadian postal codes.
- Real-time address lookup using the Canada Post API.
- User-friendly interface.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

---

## Installation and Setup

Follow these steps to set up and run the application locally:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Bryan-Douglas/itprobuy.git
   cd itprobuy


2. **Install dependencies**:
    ```bash
    npm i Next React React-Dom Sass

3. **Set up environment variables**:
    Create a .env.local file in the root directory and add the Canada Post API key that will be provided.

4. **Run the development server**:
    ```bash
    npm run dev

5. **Open the application**:
    The application will be available at http://localhost:3000.

## How to use this application:

1) Type in a valid Canadian postal code.
    Example: V3V 4X7

![input with a valid Canadian Postal Code](public/Postal_Locator.PNG)

2) Hit 'Enter' on the keyboard or click the 'Enter' button beside the input field to see the results from the Canada Post API.

![Address information being shown from the result searched in the input](public/Postal_Locator_Results.PNG)

## Troubleshooting

**If you encounter issues**:

   - Ensure that your Canada Post API key is valid and correctly set in .env.local.
   - Check that you are using a valid postal code in the format A1A 1A1.
   - Ensure you have a stable internet connection.
   - Restart the development server after making changes to environment variables.

**Technologies Used**:

   - Next.js – Framework for building server-side rendered React applications.
   - Next.js – Framework for building server-side rendered React applications.
   - React – JavaScript library for building user interfaces.
   - TypeScript – Typed JavaScript for safer code.
   - Sass – CSS preprocessor for more flexible stylesheets.