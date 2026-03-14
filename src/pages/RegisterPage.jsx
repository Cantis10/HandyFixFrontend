import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const initialLogin = { email: "", password: "" };
const initialRegister = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  age: "",
  contact_number: "",
  address: "",
};

export default function RegisterPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const { theme, loginAuth, registerAuth } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      alert("Please fill in all login fields");
      return;
    }

    const result = await loginAuth(loginForm.email, loginForm.password);
    if (result.success) {
      navigate("/");
    } else {
      alert(`Login failed: ${result.error ?? result.status}`);
    }
  };

  const handleRegister = async () => {
    const { password, confirm_password } = registerForm;
    if (
      !registerForm.first_name ||
      !registerForm.last_name ||
      !registerForm.email ||
      !password ||
      !confirm_password ||
      !registerForm.age ||
      !registerForm.contact_number
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const result = await registerAuth(registerForm);
    if (result.success) {
      navigate("/");
    } else {
      alert(`Registration failed: ${result.error ?? result.status}`);
    }
  };

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">{isRegisterMode ? "Create an Account" : "Sign In"}</h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button type="button" onClick={() => setIsRegisterMode(false)}>
          Login
        </button>
        <button type="button" onClick={() => setIsRegisterMode(true)}>
          Register
        </button>
      </div>
      {isRegisterMode ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label>
            First Name
            <input
              className="input-field"
              value={registerForm.first_name}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, first_name: event.target.value }))
              }
            />
          </label>
          <label>
            Last Name
            <input
              className="input-field"
              value={registerForm.last_name}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, last_name: event.target.value }))
              }
            />
          </label>
          <label>
            Email
            <input
              className="input-field"
              type="email"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label>
            Password
            <input
              className="input-field"
              type="password"
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <label>
            Confirm Password
            <input
              className="input-field"
              type="password"
              value={registerForm.confirm_password}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, confirm_password: event.target.value }))
              }
            />
          </label>
          <label>
            Age
            <input
              className="input-field"
              value={registerForm.age}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, age: event.target.value }))
              }
            />
          </label>
          <label>
            Contact Number
            <input
              className="input-field"
              value={registerForm.contact_number}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, contact_number: event.target.value }))
              }
            />
          </label>
          <label>
            Address (optional)
            <input
              className="input-field"
              value={registerForm.address}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, address: event.target.value }))
              }
            />
          </label>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <label>
            Email
            <input
              className="input-field"
              type="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label>
            Password
            <input
              className="input-field"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </section>
  );
}
