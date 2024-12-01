import { test } from "@agoric/zoe/tools/prepare-test-env-ava.js";
import { makeZoe } from "@agoric/zoe";
import { makeLocalAmountMath } from "@agoric/ertp";
import { start } from "../contract/nftMarketplace.js";

test("NFT Marketplace - create and buy listing", async (t) => {
  const zoe = makeZoe();
  const { creatorFacet, publicFacet } = await zoe.startInstance(start);

  // Create mock NFT and payment
  const mockNFT = { tokenId: "1", metadata: { name: "Test NFT" } };
  const mockPrice = 100n;
  const mockSeller = "seller123";

  // Test creating a listing
  const listingId = await creatorFacet.createListing(
    mockNFT,
    mockPrice,
    mockSeller
  );
  t.truthy(listingId);

  // Test getting available listings
  const listings = await publicFacet.getAvailableListings();
  t.is(listings.length, 1);
  t.is(listings[0].nft.tokenId, "1");

  // Test buying NFT
  const mockPayment = { amount: mockPrice };
  const result = await creatorFacet.buy(listingId, mockPayment);
  t.deepEqual(result.nft, mockNFT);

  // Verify listing is marked as sold
  const updatedListing = await publicFacet.getListing(listingId);
  t.is(updatedListing.status, "sold");
});
