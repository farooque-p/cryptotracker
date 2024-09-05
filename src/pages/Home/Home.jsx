import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredCoins = allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoins(filteredCoins);
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={handleSearch}>
          <input
            onChange={handleInput}
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
            list="coinlist"
          />

          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoins.slice(0, 10).map((coin, index) => (
          <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <img src={coin.image} alt={coin.name} />
              <p>{coin.name + " - " + coin.symbol}</p>
            </div>
            <p>
              {currency.symbol} {coin.current_price.toLocaleString()}
            </p>
            <p
              className={coin.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(coin.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {coin.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
