import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const existingUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const redirectTo = location.state?.from?.pathname;

  if (existingUser?.role) {
    return (
      <Navigate
        to={existingUser.role === "admin" ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const data = await loginUser({
        email: normalizedEmail,
        password: trimmedPassword,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");
      navigate(
        redirectTo || (data.user.role === "admin" ? "/admin" : "/dashboard"),
        { replace: true }
      );
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-44 sm:pt-28 pb-12 bg-gradient-to-br from-[#0f2f6b] via-[#155e9a] to-[#0b8db0]">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200 mb-3">
            Secure Access
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Welcome Back
          </h2>
          <p className="text-sky-100">
            Log in to manage bookings, caregiver details, and patient records.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/30 bg-white/95 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-red-300/20 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition duration-200 hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-sky-100">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-white hover:underline"
          >
            Register first
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
