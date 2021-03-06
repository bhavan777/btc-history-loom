import React, { Component } from 'react';
import './App.css';
import History from "./History";

class App extends Component {

  constructor() {
    super();
    this.state = {
      transactions: []
    };
  }

  poll = () => {
    let lastPolled = new Date();
    fetch("https://api.coinmarketcap.com/v2/ticker/1/")
    .then(data => data.json())
    .then(data => {
      let endTrans = this.state.transactions[this.state.transactions.length-1];
      if( endTrans && data.metadata.timestamp !== endTrans.metadata.timestamp) {
        let lastData = this.state.transactions[this.state.transactions.length -1];
        let newData = {...data, isIncreasing: lastData.data.quotes.USD.price < data.data.quotes.USD.price, _id: (new Date()).getTime() }
        let latestPrice = newData.data.quotes.USD.price.toFixed(4);
        document.title = latestPrice + " BTC History -Bitcoin";
        this.setState({
          lastPolled,
          transactions: [newData, ...this.state.transactions]
        });  
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.poller);
  }

  componentDidMount() {
    setTimeout(() => {
      this.poller = setInterval(this.poll, 2200);
      fetch("https://api.coinmarketcap.com/v2/ticker/1/?start=1&limit=10")
      .then(data => data.json())
      .then(data => {
        data.data.quotes.USD.price.toFixed(3);
        let newData = {...data, isIncreasing: true, _id: (new Date()).getTime() }
        let latestPrice = newData.data.quotes.USD.price.toFixed(4);
        this.setState({
          transactions: [newData, ...this.state.transactions]
        });
        document.title = latestPrice + " BTC History -Bitcoin";
      });     
    }, 500);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"> Polls data in interals of 2.2 seconds. max 30 requests allowed in a min from api.
        </header>
        <div className="transactions-wrap">
          <h2 className="title">Trade History</h2>
          <div className="transactions-header">
            <p>Trade Size</p>
            <p>Price(USD)</p>
            <p>Time</p>
          </div>
          <div className="transactions">
            {
            this.state.transactions.length === 0 ? <div className="loader"></div>
             : this.state.transactions.map(trans =>
              (
              <History
                key ={trans._id}
                transaction={trans.data}
                isIncreasing ={trans.isIncreasing}
                timestamp={trans._id}
                />)
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
