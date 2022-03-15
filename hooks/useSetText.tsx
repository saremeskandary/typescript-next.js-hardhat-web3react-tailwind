import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { textContractAddress } from "../config";
import { useTextTokenContract } from "./useContract";

export default function useSetText() {
  const { active } = useWeb3React<Web3Provider>();
  const [text, setText] = useState<string>();
  const [id, setId] = useState<BigNumber>();
  const [click, setClick] = useState<boolean>(false);
  const contract = useTextTokenContract(textContractAddress);

  useEffect(() => {
    if (active && click) {
      let a = async () => {
        const setTextTx = await contract.safeMint(text);
        await setTextTx.wait();
        setId(await contract.counter());
      };
      a();
    }
    return setClick(false);
  }, [click]);
  return { id, setClick, setText };
}
