import { Link, useLocation, useNavigate } from "react-router";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.init";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        Swal.fire("Success!", "Logged in with Google", "success");
        navigate(from);
      })
      .catch((err) => setError(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Swal.fire("Welcome!", "Login successful", "success");
        navigate(from);
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-3xl p-8 text-white bg-linear-to-r from-indigo-900 to-pink-500">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="input w-full"
          />
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              className="input w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="btn btn-block bg-indigo-600 text-white">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            New here?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
