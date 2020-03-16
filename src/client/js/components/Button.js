import React from "react";

export default function Button({ text, handleRandomCat }) {
  return (
    <button onClick={handleRandomCat} className="btn">
      {text}
    </button>
  );
}
