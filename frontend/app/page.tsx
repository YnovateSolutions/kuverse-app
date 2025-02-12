"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { uploadImage, uploadJson } from "@/utils/pinata1";
import { sepolia } from "viem/chains";
import ConnectBtn from "@/components/ConnectBtn";
import { useWriteContract, } from "wagmi";
import contractData from '../utils/contractDetails.json'
import Link from "next/link";

export default function Home() {
  const { data, writeContract } = useWriteContract();
  const [mintRecipient, setMintRecipient] = useState<string>("");
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [externalUrl, setExternalUrl] = useState<string>();
  const [file, setFile] = useState<File | undefined>();
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  }, []);

  async function handleSubmitMint() {
    console.log('submitting')
    if (!hasMetaMask) {
      alert('Please install metamask')
      return
    }
    if (file !== null) {
      const imageCID = await uploadImage(file!);
      const jsonCID = await uploadJson(name, description, imageCID!);
      console.log('jsoncid:', jsonCID);
      const tokenURI = `https://ipfs.io/ipfs/${jsonCID}`;
      console.log('tokenURI:', tokenURI);
      writeContract({
        address: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS as `0x`,
        abi: contractData.abi,
        functionName: "mint",
        args: [mintRecipient as `0x${string}`, tokenURI],
      });
    }
    setMintRecipient("");
    setName("");
    setDescription("");
    setFile(undefined);


  };



  return (
    <div>
      {/* <ConnectBtn /> */}
      <div className="flex px-[20px] items-center justify-between h-[65px] w-full bg-[#7ecec6]">
        <p className="font-bold text-[20px]">KUVERSE TEST</p>
        <div>
          {hasMetaMask ? <ConnectBtn /> :
            <>
              <Link href="https://metamask.io/" target="_blank">Download metamask</Link>
            </>
          }
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-[20px]">
        <div className="w-[35%] flex flex-col gap-[20px]">
          <p className="bg-lime-950 h-[56px] flex items-center justify-center font-bold text-center text-[#fff]">Mint your Kuverse NFT</p>
          <input className="border w-full border-black rounded-md p-2"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border w-full border-black rounded-md p-2"
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border w-full border-black rounded-md p-2"
            placeholder="Address"
            type="text"
            value={mintRecipient}
            onChange={(e) => setMintRecipient(e.target.value)}
          />
          <input
            className="border border-black rounded-md p-2 w-full"
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : undefined,
              )
            }
          />
          <button
            className="bg-lime-950 border font-bold text-[#fff] text-[18px] border-black rounded-md p-2"
            onClick={handleSubmitMint}
          >
            Mint NFT
          </button>
          {data ? <Link className="italic text-[16px] text-blue-500" href={`https://sepolia.etherscan.io/tx/${data}`} target='_blank'>View transaction</Link> : null}

        </div>
      </div>
    </div>
  );
}
