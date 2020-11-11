import React from "react";

import "./style.css";

export default function Input(props) {
  const { id, handleChange, type, value, error, TexLabel } = props;
  return (
    <div className="inp-grp">
      <label htmlFor={id} className="label">
        {TexLabel}
      </label>
      <input
        onChange={handleChange}
        id={id}
        type={type}
        className={`input ${error ? "error" : ""}`}
        value={value}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
