import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // To toggle between Login and Signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state
  const [isBookmarked, setIsBookmarked] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null); // Store the user ID after login
  const [activeCategory, setActiveCategory] = useState(""); // Track active category

  const API_KEY = "6af8b9d15af44eb091f4959a2001c784";

  const getData = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
    const jsonData = await response.json();
    setNewsData(jsonData.articles.slice(0, 10));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/bookmarks?userId=${userId}`)
        .then(response => {
          setBookmarks(response.data);
          const bookmarkMap = {};
          response.data.forEach(url => {
            bookmarkMap[url] = true;
          });
          setIsBookmarked(bookmarkMap);
        })
        .catch(error => console.error(error));
    }
  }, [userId]);

  const userInput = (e) => {
    setSearch(e.target.value); // Update search state with the clicked category
    setActiveCategory(e.target.value); // Set the active category
  };

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setUserName(response.data.username);
      setUserId(response.data.userId);
      setIsLoginOpen(false);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      alert('Signup successful! Please login.');
      setIsSignup(false); // Switch to login form
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup failed:', error);
      const errorMessage = error.response?.data?.error || 'Signup failed. Please try again.';
      alert(errorMessage);
    }
  };

  const handleBookmark = async (url) => {
    if (!userId) {
      alert('Please log in first');
      return;
    }
    try {
      await axios.post('http://localhost:5000/bookmarks', { userId, url });
      const updatedBookmarks = isBookmarked[url]
        ? bookmarks.filter(item => item !== url)
        : [...bookmarks, url];
      setBookmarks(updatedBookmarks);
      setIsBookmarked(prevState => ({ ...prevState, [url]: !prevState[url] }));
    } catch (error) {
      console.error('Error updating bookmarks', error);
    }
  };

  const handleLogout = () => {
    setUserName(null);
    setUserId(null);
    setBookmarks([]);
    setIsBookmarked({});
  };

  return (
    <div>
      <nav>
        <div className="nav-brand">
          <h1>FlashLine</h1>
        </div>
        <div className="nav-actions">
          {userName ? (
            <>
              <span>Welcome, {userName}!</span>
              <button onClick={handleLogout} style={buttonStyle}>Logout</button>
            </>
          ) : (
            <button onClick={toggleLogin} style={buttonStyle}>Login</button>
          )}
        </div>
      </nav>

      <div className='categoryBtn'>
        <button 
          onClick={userInput} 
          value="sports" 
          className={activeCategory === 'sports' ? 'active' : ''}
        >
          Sports
        </button>
        <button 
          onClick={userInput} 
          value="politics" 
          className={activeCategory === 'politics' ? 'active' : ''}
        >
          Politics
        </button>
        <button 
          onClick={userInput} 
          value="entertainment" 
          className={activeCategory === 'entertainment' ? 'active' : ''}
        >
          Entertainment
        </button>
        <button 
          onClick={userInput} 
          value="health" 
          className={activeCategory === 'health' ? 'active' : ''}
        >
          Health
        </button>
        <button 
          onClick={userInput} 
          value="fitness" 
          className={activeCategory === 'fitness' ? 'active' : ''}
        >
          Fitness
        </button>
      </div>

      <div>
        <h2 className='head'>Stay Updated with FlashLine</h2>
      </div>

      {isLoginOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <button onClick={toggleLogin} style={closeButtonStyle}>×</button>
            {isSignup ? (
              <>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="submit" style={buttonStyle}>Sign Up</button>
                  <p>Already have an account? <a href="#!" onClick={() => setIsSignup(false)}>Login</a></p>
                </form>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <button type="submit" style={buttonStyle}>Login</button>
                  <p>Don't have an account? <a href="#!" onClick={() => setIsSignup(true)}>Sign Up</a></p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div>
        {newsData && <Card data={newsData} handleBookmark={handleBookmark} isBookmarked={isBookmarked} />}
      </div>
    </div>
  );
};

const navStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box'
};

const titleStyle = {
  margin: 0,
  fontSize: '28px',
  fontWeight: '800',
  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
};

const buttonStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  padding: '0.7rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: '600',
  borderRadius: '25px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  minWidth: '100px',
  textAlign: 'center'
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(5px)'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  width: '400px',
  maxWidth: '90%',
  textAlign: 'center',
  position: 'relative',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  marginBottom: '15px',
  border: '1px solid #e1e1e1',
  borderRadius: '10px',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  fontSize: '24px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#666',
  transition: 'color 0.3s ease'
};

const headerStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  background: 'linear-gradient(45deg, #1e3c72, #2a5298)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginTop: '30px',
  marginBottom: '40px',
  textAlign: 'center',
  position: 'relative'
};

export default Newsapp;
