import { Link } from "react-router";

function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden font-serif">

      <div className="relative z-10 container mx-auto px-6 flex flex-col flex-1 min-h-screen">
        <nav className="flex justify-center pt-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3 animate-pulse "></span>
            <span className="text-shadow-2xs font-bold tracking-widest text-blue-100 uppercase">
              Employee Management System
            </span>
          </div>
        </nav>

        <main className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full py-12">
          <h1 className="text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight">
            Manage Your Team 
          </h1>

          <p className="text-lg md:text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Streamline workflows, track performance, and elevate productivity
            with our beautifully designed management platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
            <Link
              to="/login/employee"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-bold text-white shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 border border-white/20 hover:border-cyan-400/50"
            >

              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">👨‍💻</span> Login as Employee
              </span>
            </Link>

            <Link
              to="/login/admin"
              className=" group relative px-8 py-4 bg-black/10 backdrop-blur-md rounded-2xl font-bold text-white shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 border border-white/20 hover:border-cyan-400/50"
            >

              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">🛡️</span> Login as Admin
              </span>
            </Link>
          </div>
        </main>

        <footer className="py-8 text-center mt-auto">
          <p className="text-blue-200/50 text-sm font-medium">
            Developed by{" "}
            <span className="text-blue-100 hover:text-emerald-400 transition-colors font-semibold cursor-default">
              Mohd Saad
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;