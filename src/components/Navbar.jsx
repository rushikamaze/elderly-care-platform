import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Caregivers", path: "/services" },
    { label: "Bookings", path: "/history" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-slate-900 font-bold text-xl tracking-tight"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              EC
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold">ElderCare</p>
              <p className="text-xs font-medium text-slate-500">
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

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-800">
                    Welcome back
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>

                <button
                  onClick={logout}
                  className="hidden sm:inline-flex bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
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

            <Link to={user ? "/profile" : "/login"}>
              <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition">
                {user?.email ? user.email.charAt(0).toUpperCase() : "P"}
              </div>
            </Link>
          </div>
        </div>

        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                location.pathname === "/admin"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;