import { useEffect, useState } from "react";
import { Store } from "../../Context/Context";
import { useNavigate, useParams, Link } from "react-router";

export const LoginPage = () => {
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = Store((state) => state.login);
  const user = Store((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const path = user.role === "admin" ? "/admin" : "/employee";
      navigate(path, { replace: true });
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);
    const successful_login = login(email, password, role);
    if (!successful_login) {
      setError("Invalid credentials. Please try again.");
    } else {
      setEmail("");
      setPassword("");
    }
  };

 
  const isAdmin = role === "admin";

  
  const theme = {
    bgGradient: isAdmin
      ? "from-emerald-900/40 via-gray-900 to-gray-900"
      : "from-blue-900/40 via-gray-900 to-gray-900",
    buttonColor: isAdmin
      ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
      : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20", 
    focusRing: isAdmin
      ? "focus:border-emerald-500 focus:ring-emerald-500/10"
      : "focus:border-emerald-500 focus:ring-emerald-500/10",
    glow: isAdmin ? "bg-emerald-500/10" : "bg-blue-500/10",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white font-sans p-4 relative overflow-hidden">
      <div
        className={`absolute top-[-20%] left-[-20%] w-[50rem] h-[50rem] rounded-full blur-[120px] pointer-events-none ${theme.glow}`}
      />

      <div className="relative z-10 w-full max-w-[450px] bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="mb-10">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </Link>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-3 tracking-tight">
            {isAdmin ? "Admin Portal" : "Employee Login"}
          </h1>
          <p className="text-gray-400 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 block ml-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="name@company.com"
              className={`w-full bg-gray-800/50 border border-gray-600 text-white text-sm rounded-xl block p-4 placeholder-gray-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 block ml-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              className={`w-full bg-gray-800/50 border border-gray-600 text-white text-sm rounded-xl block p-4 placeholder-gray-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50`}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <p className="text-xs text-red-400 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full text-white font-bold rounded-xl text-base px-5 py-4 text-center shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98] mt-4 ${theme.buttonColor}`}
          >
            Sign In
          </button>
        </form>

        {!isAdmin && (
          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <span className="text-white font-semibold hover:underline cursor-default">
                Contact Admin
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
