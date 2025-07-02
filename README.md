# MavunoVision - AI-Powered Farming Assistant

This is a Next.js application built in Firebase Studio that serves as an intelligent assistant for farmers in Kenya. It leverages AI to provide crop yield predictions, recommendations, farming guides, and pest/disease diagnosis.

## Features

- **AI-Powered Crop Analysis:** Predicts crop yield based on county, year, land area, soil type, and predicted rainfall. It also offers advice on fertilizer and irrigation.
- **Intelligent Crop Recommendations:** Recommends the top 3 most suitable crops for a given location and provides reasons for each choice.
- **Detailed Farming Guides:** Generates comprehensive, step-by-step farming guides for recommended crops, from land preparation to post-harvest handling.
- **Pest & Disease Diagnosis:** Allows users to upload a photo of a plant for an AI-powered diagnosis, which includes the plant name, potential disease, possible causes, and recommended remedies.
- **Historical Trend Analysis:** Visualizes historical yield data for specific crops and counties and provides an AI-generated summary of performance trends.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI
- **AI Integration:** Genkit with Google's Gemini models
- **Charts:** Recharts

## Running Locally

To run this project on your local machine, follow these steps:

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later is recommended)
- `npm` (which comes with Node.js)

### 2. Installation

Clone the repository and install the required dependencies:

```bash
npm install
```

### 3. Environment Variables

The application uses Genkit to connect to Google's AI services. You'll need an API key from Google AI Studio.

1.  Create a new file named `.env.local` in the root of your project directory.
2.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the key to your `.env.local` file:

    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

### 4. Running the Development Servers

This project requires two development servers to run concurrently: one for the Next.js frontend and one for the Genkit AI backend.

1.  **Start the Genkit server:**
    Open a terminal and run:
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit development environment.

2.  **Start the Next.js server:**
    Open a second terminal and run:
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:9002](http://localhost:9002).

## Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

Then, to start the production server, run:

```bash
npm run start
```

## Deployment

This project is configured for deployment on Firebase App Hosting. The `apphosting.yaml` file contains the necessary configuration. You can deploy it by connecting your repository to a Firebase App Hosting backend.
