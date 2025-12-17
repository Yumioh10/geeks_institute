import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";
import PostList from "./PostList";
import posts from "./exercise2.json";
import SocialMedias from "./Example1";
import Skills from "./Example2";
import Experiences from "./Example3";
import FetchData from "./exercise4";
// Simple Functional Components
function HomeScreen() {
  return <h2>Home</h2>;
}

function ProfileScreen() {
  return <h2>Profile Screen</h2>;
}

function ShopScreen() {
  // This throws an error as required
  throw new Error("An error has occurred in the Shop!");
}

function App() {
  return (
    <main>
      <h1 className="ex">Exercise 1</h1>
      <BrowserRouter>
        <div className="container mt-4">
          {/* Simple navigation bar with pills */}
          <nav className="nav nav-pills mb-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
              style={{ padding: '16px', fontSize: '2rem', fontWeight: 'bold' }}
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              style={{ padding: '16px', fontSize: '2rem', fontWeight: 'bold' }}
            >
              Profile
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              style={{ padding: '16px', fontSize: '2rem', fontWeight: 'bold' }}
            >
              Shop
            </NavLink>
          </nav>

          {/* Routes with ErrorBoundary */}
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
      <br />
      <hr />
      <br />
      <h1 className="ex">Exercise 2</h1>
      {posts.map((post) => (
        <PostList title={post.title} content={post.content} />
      ))}
      <br />
      <hr />
      <br />
      <h1 className="ex">Exercise 3</h1>
      <b>Example1 Component</b>
      <SocialMedias />
      <b>Example2 Component</b>
      <Skills />
      <b>Example3 Component</b>
      <Experiences />
      <br />
      <hr />
      <br />
      <h1 className="ex">Exercise 4</h1>
      <FetchData />
    </main>
  );
}

export default App;