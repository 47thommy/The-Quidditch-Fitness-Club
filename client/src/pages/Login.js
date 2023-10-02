import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Log In</h3>
      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
