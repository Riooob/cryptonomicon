const API_KEY =
  "06ef7e538bf170308e8204b6149b48578518e0f38601a188cb271cde84d401d5";

const tickersHandlers = new Map();
//TODO: refactor to use URLSearchParams
export const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
      ...tickersHandlers.keys(),
    ].join(",")}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const updatedPrice = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );
      Object.entries(updatedPrice).forEach(([curency, newPrice]) => {
        const handlers = tickersHandlers.get(curency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(
    ticker,
    subscribers.filter((fn) => fn != cb)
  );
};
setInterval(loadTickers, 5000);
window.tickers = tickersHandlers;
