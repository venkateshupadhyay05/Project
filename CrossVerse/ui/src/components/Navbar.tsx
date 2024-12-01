import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                NFT Marketplace
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Listing
            </Link>
            <Link
              to="/my-listings"
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              My Listings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
