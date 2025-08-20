import {Store } from "../../Context/Context"

function Header() {
    const logout =Store((state)=>state.logout)
    const currentUser =Store((state)=>state.user)
    const name= currentUser.role=='admin'?'ADMIN' : currentUser.firstName;
return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 p-6  rounded-b-xl">
        <h1 className="text-white text-3xl font-bold">
            Hello,
            <br />
            <span className="text-4xl font-extrabold text-cyan-200 drop-shadow-lg">
              {name} <span role="img" aria-label="thumbs up">👍</span>
            </span>
        </h1>
        <button onClick={logout} className="bg-red-600 hover:bg-amber-800 text-lg font-semibold text-white px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-950">
            Log Out
        </button>
    </header>
)
}

export default Header