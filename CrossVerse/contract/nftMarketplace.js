// @ts-check
import "@agoric/zoe/exported.js";
import { makeListingManager } from "./listingManager.js";

/**
 * @param {ZCF} zcf
 */
export const start = async (zcf) => {
  const listingManager = makeListingManager();

  const buy = async (listingId, payment) => {
    const listing = listingManager.getListing(listingId);
    if (!listing || listing.status !== "active") {
      throw new Error(`Invalid listing ${listingId}`);
    }

    const { nft } = listing;
    listingManager.updateListingStatus(listingId, "sold");

    return { nft };
  };

  const publicFacet = {
    getAvailableListings: listingManager.getAvailableListings,
    getListing: listingManager.getListing,
    getNotifier: () => listingManager.notifier,
  };

  const creatorFacet = {
    createListing: listingManager.createListing,
    buy,
  };

  return { publicFacet, creatorFacet };
};
