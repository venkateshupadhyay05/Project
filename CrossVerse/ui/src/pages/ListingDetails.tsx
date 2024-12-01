import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getListing, buyNFT } from "../api/marketplace";

export default function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useQuery(["listing", id], () =>
    getListing(id!)
  );

  const handleBuy = async () => {
    try {
      // In a real implementation, we would handle payment here
      const mockPayment = { amount: listing.price };
      await buyNFT(id!, mockPayment);
      // Handle success (e.g., show confirmation, redirect)
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!listing) {
    return <div className="text-center text-red-600">Listing not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {listing.nft.metadata.image && (
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={listing.nft.metadata.image}
                alt={listing.nft.metadata.name}
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">
              {listing.nft.metadata.name}
            </h1>

            <div className="mb-6">
              <p className="text-gray-600">Token ID: {listing.nft.tokenId}</p>
              <p className="text-gray-600">Seller: {listing.seller}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {listing.price.toString()} ATOM
              </p>
            </div>

            {listing.status === "active" && (
              <button
                onClick={handleBuy}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Buy Now
              </button>
            )}

            {listing.status === "sold" && (
              <div className="text-red-600 font-semibold">
                This NFT has been sold
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
