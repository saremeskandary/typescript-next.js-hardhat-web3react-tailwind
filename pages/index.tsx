import { useWeb3React } from "@web3-react/core";
import { BigNumber, BigNumberish } from "ethers";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import useGetText from "../hooks/useGetText";
import useSetText from "../hooks/useSetText";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {
  const { account, library } = useWeb3React();
  const { id, setClick, setText } = useSetText();
  const { text, setClick: setClickGetText, setId } = useGetText();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

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

            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setClick(true);
              }}
              className="flex flex-col items-center content-center gap-1"
            >
              <input
                type="text"
                name="setId"
                placeholder="set text"
                onChange={(e) => {
                  e.preventDefault();
                  setText(e.target.value);
                }}
                required
              />
              <button type="submit">mint text</button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setClickGetText(true);
              }}
              className="flex flex-col items-center content-center gap-1"
            >
              <input
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
              <button type="submit">getText</button>
            </form>
            <p>{text}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
