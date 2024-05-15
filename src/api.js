const API_KEY =
  "06ef7e538bf170308e8204b6149b48578518e0f38601a188cb271cde84d401d5";

//TODO: refactor to use URLSearchParams
export const loadTicker = (tickers) =>
  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ","
    )}&api_key=${API_KEY}`
  ).then((r) => r.json);
