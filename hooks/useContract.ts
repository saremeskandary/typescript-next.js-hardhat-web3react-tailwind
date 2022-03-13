import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ERC20 } from "../contracts/types/ERC20";
import { ERC721 } from "../typechain/ERC721";
import ERC20_ABI from "../contracts/ERC20.json";
import ERC721_ABI from "../contracts/ERC721.json";
import textToken from "../artifacts/contracts/TextToken.sol/TextToken.json";
import { TextToken } from "../typechain/TextToken";

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}
export function useTokenContract(contractAddress?: string) {
  return useContract<ERC20>(contractAddress, ERC20_ABI);
}

export function useNFTContract(contractAddress?: string) {
  return useContract<ERC721>(contractAddress, ERC721_ABI);
}

export function useTextTokenContract(contractAddress?: string) {
  return useContract<TextToken>(contractAddress, textToken.abi);
}
