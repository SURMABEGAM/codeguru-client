import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle, FaUserAstronaut } from "react-icons/fa";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import axiosPublic from "../../hooks/AxiosPublic";

const Register = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  // IMAGE UPLOAD
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=1aa77c2554528a6abe4f4a8800e392c2",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.data.display_url;
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      setUser(result.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.message);
    }
  };

  // REGISTER
  const handleregister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const imageFile = form.photo.files[0];

    setError("");

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain lowercase letter");
    }

    if (password.length < 6) {
      return setError("Password must be minimum 6 characters");
    }

    try {
      setLoading(true);

      // upload image
      const photo = await handleImageUpload(imageFile);

      // firebase register
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      // save db
      const newUser = {
        name,
        email,
        photo,
      };

      await axiosPublic.post("/register", newUser);

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Welcome to CodeGuru",
        confirmButtonColor: "#6366f1",
      });

      navigate(location.state?.from || "/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] flex items-center justify-center px-4 py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8">
          {/* TOP */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-3xl text-white shadow-lg shadow-indigo-500/30">
              <FaUserAstronaut />
            </div>

            <h2 className="text-3xl font-bold text-white mt-5">
              Create Account
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Join CodeGuru and start your journey
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleregister} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>

              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* PHOTO */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Profile Photo
              </label>

              <input
                name="photo"
                type="file"
                className="file-input file-input-bordered w-full bg-white/10 border-white/10 text-white"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showpass ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-indigo-500 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowpass(!showpass)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showpass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* REGISTER BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 transition text-white font-semibold shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Creating Account..." : "Register Now"}
            </motion.button>

            {/* DIVIDER */}
            <div className="divider text-gray-500">OR</div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white font-medium flex items-center justify-center gap-3"
            >
              <FaGoogle className="text-lg" />
              Continue with Google
            </button>

            {/* LOGIN */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
