// @ts-check
import { makeStore } from "@agoric/store";
import { makeNotifierKit } from "@agoric/notifier";

/**
 * @returns {Object} Listing manager with state and methods
 */
export const makeListingManager = () => {
  const listings = makeStore("listing");
  const { notifier, updater } = makeNotifierKit();

  const state = {
    listings,
    nextListingId: 0n,
  };

  const createListing = (nft, price, seller) => {
    const listingId = state.nextListingId;
    state.nextListingId += 1n;

    const listing = {
      listingId,
      nft,
      price,
      seller,
      status: "active",
    };

    listings.init(listingId, listing);
    updater.updateState({ listings: [...listings.values()] });
    return listingId;
  };

  const updateListingStatus = (listingId, status) => {
    const listing = listings.get(listingId);
    listing.status = status;
    listings.set(listingId, listing);
    updater.updateState({ listings: [...listings.values()] });
  };

  return {
    state,
    notifier,
    createListing,
    updateListingStatus,
    getListing: (id) => listings.get(id),
    getAvailableListings: () =>
      [...listings.values()].filter((l) => l.status === "active"),
  };
};
