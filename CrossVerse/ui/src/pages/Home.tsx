import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAvailableListings } from "../api/marketplace";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const {
    data: listings,
    isLoading,
    error,
  } = useQuery("listings", getAvailableListings);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading listings. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Available NFTs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings?.map((listing) => (
          <Link key={listing.listingId} to={`/listing/${listing.listingId}`}>
            <ListingCard listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
}
