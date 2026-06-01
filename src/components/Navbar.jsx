import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Caregivers", path: "/services" },
    { label: "Bookings", path: "/history" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 text-slate-900 font-bold text-xl tracking-tight"
          >
            <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              EC
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-base sm:text-lg font-bold">ElderCare</p>
              <p className="hidden sm:block text-xs font-medium text-slate-500">
                Trusted home support
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 bg-white/70 border border-slate-200 rounded-full px-2 py-2 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  location.pathname === "/admin"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-800">
                    Welcome back
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((open) => !open)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition"
                >
                  {user.email.charAt(0).toUpperCase()}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-14 sm:top-16 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <Link
                      to="/profile"
                      className="block rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="mt-1 w-full rounded-xl px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition">
                  P
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden mt-4 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {user?.role === "admin" && (
              <Link
                to="/admin"
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                  location.pathname === "/admin"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                Admin
              </Link>
            )}
        </div>

        {!user && (
          <div className="md:hidden mt-3 flex gap-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
