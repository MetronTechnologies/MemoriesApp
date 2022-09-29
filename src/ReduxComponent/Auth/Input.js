import React from "react";

function Input({ name, label, changeHandler, type, placeholder }) {
  return (
    <label className="textfield">
      <input
        autoFocus="true"
        type={type}
        name={name}
        placeholder={placeholder}
        // value={postData.creator}
        onChange={changeHandler}
        required
      />
      <span>{label}</span>
    </label>
  );
}

export default Input;
