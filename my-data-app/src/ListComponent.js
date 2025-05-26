import React from 'react';
import './ListComponent.css'; // Import the CSS specific to ListComponent

// This is our reusable ListComponent.
// It takes two "props" (properties/arguments):
// 1. `items`: This is an array (list) of data that we want to display.
// 2. `renderItem`: This is a FUNCTION that tells ListComponent HOW to draw each individual item.
function ListComponent({ items, renderItem }) {
  // If there are no items provided or the list is empty, display a message.
  if (!items || items.length === 0) {
    return <p className="list-empty-message">No items to display here.</p>;
  }

  // If there are items, we'll render them inside an unordered list (<ul>).
  return (
    <ul className="list-container"> {/* Apply base styles for the whole list */}
      {/* The `map()` array method transforms each item in the `items` array
          into a new React element (in this case, an `<li>` tag). */}
      {items.map((item) => (
        // Each item in a list needs a unique `key` prop.
        // This helps React efficiently update the list if items are added, removed, or reordered.
        // For API data, 'id' is often a good choice if available.
        <li key={item.id} className="list-item"> {/* Apply styles for each individual list item */}
          {/* Call the `renderItem` function (provided by the parent)
              and pass the current `item` to it. This allows the parent
              to fully control how each item looks inside the list. */}
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default ListComponent; // Make ListComponent available for other components to use

