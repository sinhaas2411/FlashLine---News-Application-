# FlashLine News Application

A modern, responsive news application built with React.js and Node.js that provides real-time news updates with a beautiful user interface.

![FlashLine News App Screenshot](https://raw.githubusercontent.com/sinhaas2411/FlashLine---News-Application-/main/screenshots/main.png)

## Features

- 📰 Real-time news updates
- 🎨 Modern and responsive UI
- 🔍 Category-based news filtering
- 📱 Mobile-friendly design
- ⚡ Fast loading times
- 🔄 Infinite scroll
- 🌙 Dark/Light mode support

## Tech Stack

- **Frontend:**
  - React.js
  - CSS3
  - Axios for API calls
  - React Router for navigation

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - News API integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- News API key (from [NewsAPI](https://newsapi.org/))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sinhaas2411/FlashLine---News-Application-.git
cd FlashLine---News-Application-
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_uri
NEWS_API_KEY=your_news_api_key
PORT=5000
```

5. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Screenshots

### Home Page
![Home Page](https://raw.githubusercontent.com/sinhaas2411/FlashLine---News-Application-/main/screenshots/home.png)

### News Categories
![Categories](https://raw.githubusercontent.com/sinhaas2411/FlashLine---News-Application-/main/screenshots/categories.png)

### Article View
![Article View](https://raw.githubusercontent.com/sinhaas2411/FlashLine---News-Application-/main/screenshots/article.png)

### Mobile View
![Mobile View](https://raw.githubusercontent.com/sinhaas2411/FlashLine---News-Application-/main/screenshots/mobile.png)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing the news data
- React.js community for the amazing ecosystem
- All contributors who have helped improve this project

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/sinhaas2411/FlashLine---News-Application-](https://github.com/sinhaas2411/FlashLine---News-Application-)
