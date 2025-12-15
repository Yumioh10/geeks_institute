import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

// HomeScreen Component
const HomeScreen = () => {
  return (
    <h1 style={{ padding: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
      Home
    </h1>
  )
}

// ProfileScreen Component
const ProfileScreen = () => {
  return (
    <h1 style={{ padding: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
      Profile Screen
    </h1>
  )
}

// ShopScreen Component - throws an error
const ShopScreen = () => {
  throw new Error('Shop screen error!')
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Bootstrap-style Navbar */}
        <nav
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px 20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6',
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              padding: '8px 16px',
              textDecoration: 'none',
              backgroundColor: isActive ? '#0d6efd' : 'transparent',
              color: isActive ? 'white' : '#0d6efd',
              borderRadius: '4px',
              fontWeight: '500',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              padding: '8px 16px',
              textDecoration: 'none',
              backgroundColor: isActive ? '#0d6efd' : 'transparent',
              color: isActive ? 'white' : '#0d6efd',
              borderRadius: '4px',
              fontWeight: '500',
            })}
          >
            Profile
          </NavLink>
          <NavLink
            to="/shop"
            style={({ isActive }) => ({
              padding: '8px 16px',
              textDecoration: 'none',
              backgroundColor: isActive ? '#0d6efd' : 'transparent',
              color: isActive ? 'white' : '#0d6efd',
              borderRadius: '4px',
              fontWeight: '500',
            })}
          >
            Shop
          </NavLink>
        </nav>

        {/* Routes wrapped with ErrorBoundary */}
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />
          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
