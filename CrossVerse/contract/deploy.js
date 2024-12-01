// @ts-check
import { E } from "@agoric/eventual-send";
import { makeLocalAmountMath } from "@agoric/ertp";
import { makeZoe } from "@agoric/zoe";
import { start } from "./nftMarketplace.js";

/**
 * @param {*} homeP
 * @param {Array} args
 */
export default async function deployContract(homeP, args) {
  // Get Zoe service
  const zoe = await E(homeP).makeZoe();

  // Deploy the contract
  const installation = await E(zoe).install(start);
  const { creatorFacet, publicFacet } = await E(zoe).startInstance(
    installation
  );

  // Save the public facet and installation
  const CONTRACT_NAME = "nftMarketplace";
  await E(homeP).scratch.set(CONTRACT_NAME, {
    installation,
    publicFacet,
    creatorFacet,
  });

  console.log("Deployed NFT Marketplace");
  return { creatorFacet, publicFacet };
}
