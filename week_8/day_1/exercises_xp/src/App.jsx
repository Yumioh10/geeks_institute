import React, { createContext, useContext, useState } from 'react';
import './App.css';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme Switcher Button Component
function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-switcher ${theme}`}
    >
      <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
      <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}

// Header Component
function Header() {
  const { theme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <div className="header-content">
        <h1>Theme Switcher Demo</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

// Card Component
function Card({ title, content }) {
  const { theme } = useTheme();

  return (
    <div className={`card ${theme}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

// Main Content Component
function Content() {
  const { theme } = useTheme();

  return (
    <div className="content">
      <div className="card-grid">
        <Card
          title="What is Context?"
          content="React Context provides a way to pass data through the component tree without having to pass props down manually at every level."
        />
        <Card
          title="useState Hook"
          content="The useState hook lets you add state to functional components. It returns the current state and a function to update it."
        />
      </div>

      <Card
        title="Current Theme"
        content={`You are currently viewing the ${theme} theme. Click the button in the header to toggle between light and dark modes!`}
      />

      <div className={`feature-box ${theme}`}>
        <h3>🎨 Theme Features</h3>
        <p>
          This app demonstrates useContext and useState working together to manage global theme state.
        </p>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <Header />
        <Content />
      </div>
    </div>
  );
}

// Wrap App with ThemeProvider
export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}