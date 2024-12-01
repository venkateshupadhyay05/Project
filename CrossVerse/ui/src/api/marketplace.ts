import { E } from "@agoric/eventual-send";

let publicFacet: any;

export const initializeContract = async (homeP: any) => {
  const { publicFacet: pf } = await E(homeP).scratch.get("nftMarketplace");
  publicFacet = pf;
};

export const getAvailableListings = async () => {
  return E(publicFacet).getAvailableListings();
};

export const getListing = async (id: string) => {
  return E(publicFacet).getListing(id);
};

export const createListing = async (
  nft: any,
  price: bigint,
  seller: string
) => {
  return E(publicFacet).createListing(nft, price, seller);
};

export const buyNFT = async (listingId: string, payment: any) => {
  return E(publicFacet).buy(listingId, payment);
};
