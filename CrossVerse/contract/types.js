// @ts-check

/**
 * @typedef {Object} Listing
 * @property {bigint} listingId
 * @property {Object} nft
 * @property {bigint} price
 * @property {string} seller
 * @property {'active' | 'sold'} status
 */

/**
 * @typedef {Object} ListingState
 * @property {Store<bigint, Listing>} listings
 * @property {bigint} nextListingId
 */

export {};
