import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("login", true);
    navigate("/");
  };
  useEffect(() => {
    const log = localStorage.getItem("login");
    if (log) navigate("/");
  });
  return (
    <div>
      <div className="ButtonCompo">
        <p>You need to Login to access Home and About page</p>
        <button onClick={login}>Click Me to Login</button>
      </div>
    </div>
  );
};

export default Login;
