// @ts-check

/**
 * Validates NFT metadata
 * @param {Object} nft - NFT object to validate
 * @throws {Error} If NFT is invalid
 */
export const validateNFT = (nft) => {
  if (!nft?.tokenId || !nft?.metadata?.name) {
    throw new Error("Invalid NFT: Must have tokenId and name");
  }
};

/**
 * Validates listing price
 * @param {bigint} price - Price to validate
 * @throws {Error} If price is invalid
 */
export const validatePrice = (price) => {
  if (price <= 0n) {
    throw new Error("Price must be greater than 0");
  }
};
