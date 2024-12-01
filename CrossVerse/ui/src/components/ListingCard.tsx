interface ListingCardProps {
  listing: {
    listingId: string;
    nft: {
      tokenId: string;
      metadata: {
        name: string;
        image?: string;
      };
    };
    price: bigint;
    seller: string;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {listing.nft.metadata.image && (
        <img
          src={listing.nft.metadata.image}
          alt={listing.nft.metadata.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {listing.nft.metadata.name}
        </h3>
        <p className="text-gray-600 mb-2">Token ID: {listing.nft.tokenId}</p>
        <p className="text-blue-600 font-bold">
          Price: {listing.price.toString()} ATOM
        </p>
      </div>
    </div>
  );
}
