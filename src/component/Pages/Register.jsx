import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axiosPublic from "../../hooks/AxiosPublic";

const Register = () => {
  const navigate = useNavigate();

  const user = useContext(AuthContext);
  console.log(user); // <-- use context
  const [error, setError] = useState("");
  const [showpass, setShowpass] = useState(false);

  const provider = new GoogleAuthProvider();

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      result.user;
      setError("");
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.message);
    }
  };
  //imgbb
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=1aa77c2554528a6abe4f4a8800e392c2`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.data.display_url; // image link
  };
  // Email/password registration
  const handleregister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    setError("");

    if (!name) return setError("Name is required");
    if (!email) return setError("Email is required");
    if (!/[A-Z]/.test(password))
      return setError("Password must include an uppercase letter");
    if (!/[a-z]/.test(password))
      return setError("Password must include a lowercase letter");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      // Firebase registration
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, { displayName: name, photoURL: photo });
      result.user;

      // Send to server
      const newUser = { name, email, password };
      console.log(newUser);
      await axiosPublic.post("http://localhost:5000/register", newUser);
      console.log("User registered on server", result.user);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to CodeGuru 🎉",
        confirmButtonColor: "#6366f1",
      }).then(() => navigate("/"));
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message);
      else if (err.code === "auth/email-already-in-use")
        setError("This email is already registered!");
      else setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-black px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-linear-150-to-r from-indigo-900 to-pink-300 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-sm opacity-80 mt-2">Register to get started</p>
        </div>
        {/* Correct Form */}
        <form onSubmit={handleregister} className="space-y-5">
          <div>
            <input
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full bg-white/20 placeholder:text-gray-200 border-white/30"
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white/20 placeholder:text-gray-200 border-white/30"
              required
            />
          </div>
          <input
            onSubmit={handleImageUpload}
            name="photo"
            type="file"
            className="input input-bordered w-full bg-white/20"
          />

          <div className="relative">
            <input
              name="password"
              type={showpass ? "text" : "password"}
              placeholder="Type your password"
              className="input input-bordered w-full bg-white/20 placeholder:text-gray-200 border-white/30"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-lg text-gray-600"
              onClick={() => setShowpass(!showpass)}
            >
              {showpass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-block bg-linear-to-r from-indigo-500 to-pink-500 border-0 shadow-lg text-white"
          >
            Register
          </motion.button>
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="g"
              width="22"
              className="mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-white/80 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-white hover:underline"
            >
              Login now
            </Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
