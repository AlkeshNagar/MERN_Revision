import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/login");
    }
  });
  const logout = () => {
    localStorage.removeItem("login");
    setLoading(false);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <>
      <h1>Protected</h1>
      <p>You are here after passing the Protected route. </p>
      <p>you cannot access this page without login.</p>
      <Component />

      <p>Again want to experience Protected routes, you can logout then.</p>
      <div className="ButtonCompo">
        {loading ? (
          <button onClick={logout}>Logout here</button>
        ) : (
          <p>Logging Out</p>
        )}
      </div>
    </>
  );
};

export default Protected;
