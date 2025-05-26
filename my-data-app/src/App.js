import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent'; // <-- Import our ListComponent here!
import './App.css'; // Import the CSS file for styling

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);

      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Oops! Couldn't load posts. Please check your internet or try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => clearTimeout(timer);

  }, []);

  // This function tells our ListComponent HOW to render each individual post.
  // It takes a 'post' object and returns the JSX for how that post should look.
  const renderPostItem = (post) => (
    <div>
      {/* Use the CSS classes defined in ListComponent.css for consistent styling */}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
    </div>
  );

  return (
    <div className="app-container"> {/* Apply main container styles */}
      <h1 className="app-title">My Awesome Posts Viewer</h1>

      {isLoading && <p className="loading-message">Loading posts... please wait!</p>}

      {error && <p className="error-message">{error}</p>}

      {/* Render the ListComponent only when not loading, no error, and we have posts. */}
      {!isLoading && !error && posts.length > 0 && (
        <ListComponent
          items={posts}             /* Pass the array of fetched posts */
          renderItem={renderPostItem} /* Pass the function that defines how to render each post */
        />
      )}

      {/* This specific message for "no data" will show if loading is complete, no error,
          but the 'posts' array is still empty (e.g., API returned an empty list). */}
      {!isLoading && !error && posts.length === 0 && (
        <p className="no-data-message">Looks like there are no posts to show right now!</p>
      )}
    </div>
  );
}

export default App;

