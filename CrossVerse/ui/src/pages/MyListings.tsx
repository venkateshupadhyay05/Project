import { useQuery } from "react-query";
import { getAvailableListings } from "../api/marketplace";
import ListingCard from "../components/ListingCard";

export default function MyListings() {
  // In a real implementation, we would filter by the current user's address
  const { data: listings, isLoading } = useQuery(
    "myListings",
    getAvailableListings
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My NFT Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings?.map((listing) => (
          <ListingCard key={listing.listingId} listing={listing} />
        ))}
      </div>
    </div>
  );
}
