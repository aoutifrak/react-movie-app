import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <nav className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
            {/* Logo on the Left */}
            {/* <Link to="/Movies" className="text-2xl font-bold text-white">
                🎬 MyMovieApp
            </Link> */}

            {/* Search Bar in the Center */}
            <form onSubmit={handleSearch} className="flex-grow max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>

            {/* Optional Navigation Links */}
            <div className="hidden md:flex space-x-4">
                <Link to="/">Home</Link>
            </div>
        </nav>
    );
};

export default Navbar;
