
# NLP Test Question Generator

An AI-powered application that generates multiple-choice questions on any topic using Google's Gemini API.

## Features

- Generate custom multiple-choice questions
- Interactive interface with clickable answers
- Save and manage your question bank
- Filter questions by topic

## Setup Guide

### Prerequisites

- Node.js (v14+)
- MongoDB
- Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/nlp-test-question-generator.git
   cd nlp-test-question-generator
   ```

2. Setup server
   ```bash
   # Go to server directory
   cd server
   
   # Install dependencies
   npm install
   
   # Create .env file
   echo "PORT=5000
   MONGO_URI=mongodb://localhost:27017/nlp_test_platform
   GEMINI_API_KEY=your_api_key_here" > .env
   ```

3. Start MongoDB
   ```bash
   # For Linux/Mac
   sudo systemctl start mongodb
   # OR
   brew services start mongodb-community
   ```

4. Start the server
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal window

2. Setup client
   ```bash
   # Go to client directory
   cd client
   
   # Install dependencies
   npm install
   
   # Start the application
   npm run dev
   ```

3. Open your browser to http://localhost:5173

## Using the Application

1. **Generate Questions**
   - Enter a topic
   - Select difficulty and number of questions
   - Click "Generate Questions"

2. **Interact with Questions**
   - Click on answers to test yourself (green = correct, red = incorrect)
   - Save questions you want to keep

3. **Manage Saved Questions**
   - View all saved questions in the "Saved Questions" tab
   - Filter by topic
   - Delete unwanted questions

## API Endpoints

- `POST /api/generate` - Generate questions
- `POST /api/save` - Save a question
- `GET /api/questions` - Get all saved questions
- `GET /api/questions/topic/:topic` - Get questions by topic
- `DELETE /api/questions/:id` - Delete a question

## Troubleshooting

- **MongoDB errors**: Verify MongoDB is running and MONGO_URI is correct
- **API key issues**: Check your Gemini API key is valid
- **CORS errors**: Ensure the backend is running on port