// @ts-check
import { E } from "@agoric/eventual-send";

/**
 * @param {*} homeP
 * @param {Array} args
 */
export default async function deployApi(homeP, args) {
  const { installation, publicFacet, creatorFacet } = await E(
    homeP
  ).scratch.get("nftMarketplace");

  // Deploy API handlers
  const handler = {
    getAvailableListings: async () => {
      return E(publicFacet).getAvailableListings();
    },

    getListing: async (id) => {
      return E(publicFacet).getListing(id);
    },

    createListing: async (nft, price, seller) => {
      return E(creatorFacet).createListing(nft, price, seller);
    },

    buy: async (listingId, payment) => {
      return E(creatorFacet).buy(listingId, payment);
    },
  };

  // Save the handler
  await E(homeP).http.registerAPIHandler(handler);
  console.log("API endpoints registered");
}
