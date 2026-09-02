import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try{    
        await login(email,password);
        navigate("/app/dashboard");
    }catch(e){
        console.log("Login failed")
    }  
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          name="login"
          value={email}
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
