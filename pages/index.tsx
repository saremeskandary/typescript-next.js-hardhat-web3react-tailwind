import { useWeb3React } from "@web3-react/core";
import { BigNumber, BigNumberish } from "ethers";
import Head from "next/head";
import Link from "next/link";
import ReactLoading from "react-loading";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import useGetText from "../hooks/useGetText";
import useSetText from "../hooks/useSetText";
import { parseBalance } from "../util";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {
  const { account, library } = useWeb3React();
  const { id, loading, setClick, setText } = useSetText();
  const { text, setClick: setClickGetText, setId } = useGetText();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  function Id() {
    if (loading) {
      return (
        <ReactLoading type={"spin"} color={"black"} height={30} width={30} />
      );
    } else if (id) {
      return <div>id is {id && parseBalance(id, 0, 0)}</div>;
    } else return <div></div>
  }

  return (
    <div className="flex flex-col items-center content-center gap-4 h-96">
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main className="flex flex-col items-center content-center gap-4 h-96">
        {isConnected && (
          <section className="flex flex-col items-center content-center gap-8">
            <ETHBalance />

            {/* <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" /> */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setClick(true);
              }}
              className="flex flex-col items-center content-center gap-1 border-2 p-2"
            >
              <input
                className="border-2 text-center"
                type="text"
                name="setId"
                placeholder="set text"
                onChange={(e) => {
                  e.preventDefault();
                  setText(e.target.value);
                }}
                required
              />
              <button className="border-2 rounded-xl px-4" type="submit">
                mint text
              </button>
              <Id />
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setClickGetText(true);
              }}
              className="flex flex-col items-center content-center gap-1 border-2 p-2"
            >
              <input
                className="border-2 text-center"
                type="number"
                name="setId"
                placeholder="set id"
                min={1}
                onChange={(e) => {
                  e.preventDefault();
                  setId(e.target.valueAsNumber);
                }}
                required
              />
              <button className="border-2 rounded-xl px-4" type="submit">
                getText
              </button>
            </form>
            <p>{text}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
