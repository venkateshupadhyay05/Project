import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import MyListings from "./pages/MyListings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateListing />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/my-listings" element={<MyListings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
