import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);

    /* todo
    1. 내 돈을 입력하면 얼마나 해당코인으로 바꿔줄 수 있는 지 구하기
    */
    const [myMoney, setMyMoney] = useState(0);
    const [changeCoin, setChangeCoin] = useState(Infinity);

    const [resultCoin, setResultCoin] = useState(0);

    const onMoney = (e) => {
        setMyMoney(e.target.value);
    };

    const onSelect = (e) => {
        const price = coins[e.target.selectedIndex - 1].quotes.USD.price;
        setChangeCoin(parseFloat(price));
    };

    useEffect(() => {
        setResultCoin(myMoney / changeCoin);
    }, [myMoney, changeCoin]);

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>The conins! {loading ? "" : `(${coins.length})개`}</h1>
            {loading ? (
                <strong>Loading....</strong>
            ) : (
                <>
                    <form>
                        <select onChange={onSelect}>
                            <option>select you want coin</option>
                            {coins.map((coin, index) => (
                                <option key={coin.id}>
                                    {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                                </option>
                            ))}
                        </select>
                        <hr />
                        <div>
                            <label>My money : </label>
                            <input placeholder="My Money" onChange={onMoney} value={myMoney} type="number" />
                        </div>
                        <br />
                        <div>
                            <label>Get coin :</label>
                            <input placeholder="Get Coin" value={resultCoin} type="number" disabled />
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default App;
