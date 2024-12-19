import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";
import { TokenFormData, TokenMetadata as TokenMetadataType } from "@/types";

export const getConnection = () =>
  new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT as string, "confirmed");

export async function creatingATA(
  connection: Connection,
  mint: PublicKey,
  owner: PublicKey,
  wallet: any,
  programId = TOKEN_2022_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
  allowOwnerOffCurve = false
): Promise<PublicKey> {
  const associatedToken = getAssociatedTokenAddressSync(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  );

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      owner,
      associatedToken,
      owner,
      mint,
      programId,
      associatedTokenProgramId
    )
  );

  transaction.feePayer = owner;
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  await wallet.sendTransaction(transaction, connection);

  return associatedToken;
}

export async function mintTo(
  connection: Connection,
  wallet: any, // Wallet object with `sendTransaction` method
  mint: PublicKey,
  destination: PublicKey,
  authority: Signer | PublicKey,
  amount: number | bigint,
  multiSigners: Signer[] = [],
  programId = TOKEN_2022_PROGRAM_ID
): Promise<TransactionSignature> {
  function getSigners(
    signerOrMultisig: Signer | PublicKey,
    multiSigners: Signer[]
  ): [PublicKey, Signer[]] {
    return signerOrMultisig instanceof PublicKey
      ? [signerOrMultisig, multiSigners]
      : [signerOrMultisig.publicKey, [signerOrMultisig]];
  }

  const [authorityPublicKey, signers] = getSigners(authority, multiSigners);

  const mintToInstruction = createMintToInstruction(
    mint,
    destination,
    authorityPublicKey,
    amount,
    multiSigners,
    programId
  );

  const transaction = new Transaction().add(mintToInstruction);

  // Set the recent blockhash and fee payer
  transaction.feePayer = wallet.publicKey;
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;

  // Partially sign the transaction if required
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }

  // Send the transaction using the wallet
  return await wallet.sendTransaction(transaction, connection);
}

export const createToken = async (
  { name, symbol, decimals, initialMintAmount }: TokenFormData,
  wallet: any,
  uri: string | null
): Promise<TokenMetadataType> => {
  const connection = getConnection();

  //creating mint account
  const mintKeypair = Keypair.generate();
  console.log("metadataURI", uri);
  //metadata
  const metadata: TokenMetadata = {
    mint: mintKeypair.publicKey,
    name: name,
    symbol: symbol,
    uri: uri as string,
    additionalMetadata: [],
  };
  const mintLen = getMintLen([ExtensionType.MetadataPointer]);
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
  const mintLamports = await connection.getMinimumBalanceForRentExemption(
    mintLen + metadataLen
  );
  const mintTransaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: mintLen,
      lamports: mintLamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeMetadataPointerInstruction(
      mintKeypair.publicKey,
      wallet.publicKey,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID
    ),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      decimals,
      wallet.publicKey,
      null,
      TOKEN_2022_PROGRAM_ID
    ),
    createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      mint: mintKeypair.publicKey,
      metadata: mintKeypair.publicKey,
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      mintAuthority: wallet.publicKey,
      updateAuthority: wallet.publicKey,
    })
  );
  mintTransaction.feePayer = wallet.publicKey;
  mintTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;
  mintTransaction.partialSign(mintKeypair);

  console.log("mintTransaction", mintTransaction);
  await wallet.sendTransaction(mintTransaction, connection);
  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);

  // const lamports = await getMinimumBalanceForRentExemptMint(connection);

  // const transaction = new Transaction().add(
  //   SystemProgram.createAccount({
  //     fromPubkey: wallet.publicKey,
  //     newAccountPubkey: mintKeypair.publicKey,
  //     space: MINT_SIZE,
  //     lamports,
  //     programId: TOKEN_PROGRAM_ID,
  //   }),
  //   createInitializeMint2Instruction(
  //     mintKeypair.publicKey,
  //     decimals,
  //     wallet.publicKey,
  //     wallet.publicKey,
  //     TOKEN_PROGRAM_ID
  //   )
  // );

  // transaction.feePayer = wallet.publicKey;
  // transaction.recentBlockhash = (
  //   await connection.getLatestBlockhash()
  // ).blockhash;
  // transaction.partialSign(mintKeypair);

  // await wallet.sendTransaction(transaction, connection);
  // console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);

  //creatin associated token account
  const tokenAccount = await creatingATA(
    connection,
    mintKeypair.publicKey,
    wallet.publicKey,
    wallet
  );
  console.log(
    `Created an account for the owner of the token, here is the account ${tokenAccount.toBase58()}`
  );

  //minting tokens

  const mintAmount = initialMintAmount * Math.pow(10, decimals);
  await mintTo(
    connection,
    wallet, // Payer wallet
    mintKeypair.publicKey, // Mint address
    tokenAccount, // Destination address
    wallet.publicKey, // Mint authority
    mintAmount // Amount to mint
  );

  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  console.log(`Minted ${mintAmount} tokens to ${wallet.publicKey.toBase58()}`);

  return {
    mint: mintKeypair.publicKey.toBase58(),
    mintAuthority: wallet.publicKey.toBase58(),
    name,
    symbol,
    decimals,
    initialMintAmount,
  };
};
