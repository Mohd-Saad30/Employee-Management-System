import { Store } from "../../Context/Context";

function Header() {
  const logout = Store((state) => state.logout);
  const currentUser = Store((state) => state.user);


  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';
  const displayName = isAdmin ? 'Admin' : currentUser.firstName;

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-800 via-blue-900 to-blue-800 p-6 md:px-10 shadow-2xl border-b border-white/10">
      
      <div className="space-y-1 text-center md:text-left">
        <p className="text-blue-200/80 text-sm font-medium tracking-widest uppercase">
          {isAdmin ? "Admin Portal" : "Employee Platform"}
        </p>
        
        <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
          Welcome back, 
          <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent ml-2">
            {displayName}
          </span>
          <span className="ml-2 inline-block animate-bounce text-2xl">👋</span>
        </h1>
      </div>

      <button 
        onClick={logout} 
        className="group relative flex items-center gap-2 bg-white/10 hover:bg-red-500 text-white px-8 py-2.5 rounded-xl transition-all duration-300 ease-out font-bold border border-white/20 hover:border-transparent active:scale-95 shadow-lg"
      >
        <span className="group-hover:translate-x-1 transition-transform">Log Out</span>
        
      </button>
    </header>
  );
}

export default Header;

