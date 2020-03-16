import React from "react";

export default function Errors({ errors }) {
  return (
    <div className="errors">
      {errors.map(error => (
        <div key={error.msg} className="errors__field">
          {error.msg}
        </div>
      ))}
    </div>
  );
}
