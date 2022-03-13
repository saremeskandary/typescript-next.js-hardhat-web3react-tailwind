import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumberish } from "ethers";
import { useEffect, useState } from "react";
import { textContractAddress } from "../config";
import { useTextTokenContract } from "./useContract";

export default function useGetText() {
  const { active } = useWeb3React<Web3Provider>();
  const [text, setText] = useState<string>();
  const [id, setId] = useState<BigNumberish>();
  const [click, setClick] = useState<boolean>(false);
  const contract = useTextTokenContract(textContractAddress);

  useEffect(() => {
    if (active && click) {
      let a = async () => {
        setText(await contract.getText(id));
      };
      a()
    }
    return setClick(false);
  }, [click]);
  return {text, setClick, setId};
}