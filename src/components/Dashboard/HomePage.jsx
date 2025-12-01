import { Link } from "react-router";

function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col flex-1 h-screen">
        <nav className="flex justify-center pt-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-600 mr-3 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">
              Employee Management System
            </span>
          </div>
        </nav>

        <main className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Manage Your Team <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Like a Pro
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Streamline workflows, track performance, and elevate productivity
            with our next-generation management platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link
              to="/login/employee"
              className="group relative px-8 py-4 bg-gray-800 rounded-xl font-bold text-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 border border-white/10 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Login as Employee</span>
            </Link>

            <Link
              to="/login/admin"
              className="group relative px-8 py-4 bg-emerald-600 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Login as Admin</span>
            </Link>
          </div>
        </main>

        <footer className="py-6 text-center">
          <p className="text-gray-600 text-sm font-medium">
            Developed by{" "}
            <span className="text-gray-500 hover:text-emerald-400 transition-colors cursor-default">
              Mohd Saad
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
