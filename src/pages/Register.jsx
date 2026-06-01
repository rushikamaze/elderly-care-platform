import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const existingUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  if (existingUser?.role) {
    return (
      <Navigate
        to={existingUser.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedName || !normalizedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError("Please fill all required fields.");
      setSuccess("");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setSuccess("");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await registerUser({
        name: trimmedName,
        email: normalizedEmail,
        password: trimmedPassword,
        role: "user",
      });

      setSuccess(data.message || "Registration successful. Please log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-44 sm:pt-28 pb-12 bg-gradient-to-br from-[#0f2f6b] via-[#155e9a] to-[#0b8db0]">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200 mb-3">
            First-Time Access
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Create Your Account
          </h2>
          <p className="text-sky-100">
            Register first, then log in and create the patient profile details.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-sky-100">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/30 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-sky-100">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/30 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-sky-100">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/30 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-sky-100">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/30 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-red-300/20 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-2xl border border-green-300/20 bg-green-500/15 px-4 py-3 text-sm text-green-100">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition duration-200 hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-sky-100">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
