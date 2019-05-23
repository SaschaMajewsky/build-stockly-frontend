import React, { Component } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import {
  formatPercentChange,
  formatPrice,
  formatPriceChange
} from '../../helpers/formatNumbers';
import { axiosWithAuth } from '../auth/axiosWithAuth';
const API_KEY = process.env.REACT_APP_API_KEY;
export default class WatchStocks extends Component {
  state = {
    stock: null
  };
  componentDidMount() {
    // axiosWithAuth()
    // .get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.stock.ticker}&apikey=${API_KEY}`)
    // .then(res=>{
    //   console.log(res.data)
    //   this.setState({
    //     stock: res.data
    //   })
    // })
  }
  render() {
    return (
      this.state.stock !== null && (
        <tr
          onClick={e =>
            this.props.deleteFavorite({ ticker: this.props.stock.ticker })
          }
        >
          <td>{this.state.symbol}</td>
          <td>{formatPrice(this.state.stock.price)}</td>
          <td>{formatPriceChange(this.state.stock.change)}</td>
          <td>{formatPercentChange(this.state.stock.changePercent)}</td>
          <td>{this.props.showDelete && <FaMinusCircle color="#0d122b" />}</td>
        </tr>
      )
    );
  }
}
