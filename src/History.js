import React from "react";

const History = (props) => {
let classes= props.isIncreasing ? "increasing": "";
let time = new Date(props.timestamp);
let timestamp = `${time.getHours() < 9 ? "0"+time.getHours() : time.getHours()}:${time.getMinutes() <= 9 ? "0"+time.getMinutes() :time.getMinutes()}:${time.getSeconds() < 9 ? "0"+time.getSeconds() :time.getSeconds()}`;
let tradeSize = ((props.transaction.quotes.USD.volume_24h) / (props.transaction.quotes.USD.market_cap)).toFixed(4);
let price = (+props.transaction.quotes.USD.price).toFixed(4)
return(
<div className={`transaction ${classes}`}>
  <p className="tradesize">
    {props.isIncreasing ? <span>&uarr;</span> : <span>&darr;</span>} &nbsp;
    {tradeSize}
  </p>
  <p className="tradeprice">{price}</p>
  <p className="tradetime">{timestamp}</p>
</div>
);
};

export default History;