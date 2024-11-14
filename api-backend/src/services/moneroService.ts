import moneroTs from "monero-ts";
import { listMappings, updateOneMapping} from "./addressMappingService";
import { mintTokens } from "./ethereumService";

export async function loadWallet() {
  return moneroTs.openWalletFull({
    path: "./wallets",
    password: process.env.WALLET_PASSWORD,
    networkType: moneroTs.MoneroNetworkType.STAGENET,
    server: {
      uri: process.env.STAGENET_MONERO_NODE,
    },
  });
}

export async function monitorWallet(wallet: moneroTs.MoneroWalletFull) {
  await wallet.addListener(
    new (class extends moneroTs.MoneroWalletListener {
      async onOutputReceived(output: moneroTs.MoneroOutputWallet) {
        let txAmount = output.getAmount();
        let txHash = output.getTx().getHash();
        let isConfirmed = output.getTx().getIsConfirmed();
        let isLocked = output.getTx().getIsLocked();

        if (isConfirmed && isLocked) {
          console.log(`Confirmed received in monero service, proceeding to mint data token`);
          console.log(`Tx amount is ${txAmount}`)
          const mappings = await listMappings();
          for (const mapping of mappings) {
            if (isMatchingTransaction(Number(txAmount), mapping)) {
              // 1. Trigger Smart Contract minting
              console.log(`Minting tokens from monero service`);
              await mintTokens(mapping.erc20Address, mapping.ethereumAddress);
              // 2. Delete mapping
              console.log(`Updating mapping from monero service`);
              await updateOneMapping(mapping.randomNumber.toString(), { minted: true });
            }
          }
        }
      }
    })()
  );
}

function isMatchingTransaction(txAmount: number, mapping: any) {
  const randomNumberFromTx = Math.round((Number(txAmount) - Number(mapping.assetPrice)*1e12));
  console.log(`Random number from tx is ${randomNumberFromTx}, from mapping ${mapping.randomNumber}`);
  return randomNumberFromTx === Number(mapping.randomNumber) && !mapping.minted;
}
