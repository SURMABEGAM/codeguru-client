import { Link } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.init";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState();
  const [showPass, setShowPass] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    const newUser = { email, password };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-linear-to-r from-indigo-900 to-pink-500 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-sm opacity-80 mt-2">
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="label-text text-sm mb-1 block">Name</label>
            <input
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full bg-white/20 placeholder:text-gray-200 border-white/30"
            />
          </div>

          <div>
            <label className="label-text text-sm mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white/20 placeholder:text-gray-200 border-white/30"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="input input-bordered w-full pr-10 bg-white/20 border-white/30"
              placeholder="Enter password"
              name="password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-lg text-gray-200"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-block bg-linear-to-r from-indigo-900 to-pink-500 border-0 shadow-lg text-white"
          >
            Login
          </button>

          <button
            type="button"
            className="btn btn-outline btn-secondary flex items-center gap-2 w-full mt-2"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-center text-sm text-white/80 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-white hover:underline"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
