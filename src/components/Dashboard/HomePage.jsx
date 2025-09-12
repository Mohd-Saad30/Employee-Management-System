import { Link } from "react-router";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Welcome to the Employee Management System
                </h1>
                <p className="text-lg mb-8 text-center">
                    Please select your role to log in.
                </p>
                <div className="flex space-x-6">
                    <Link
                        to="/login/employee"
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login as Employee
                    </Link>
                    <Link
                        to="/login/admin"
                        className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition"
                    >
                        Login as Admin
                    </Link>
                </div>
            </div>
            <footer className="text-center py-4 text-gray-500 text-sm">
                Developed by Mohd Saad
            </footer>
        </div>
    );
}

export default HomePage;