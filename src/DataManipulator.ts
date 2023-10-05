import { ServerRespond } from './DataStreamer';

export interface Row {
  priceABC: number ,
  priceDEF: number,
  ratio: number,
  upperBound: number ,
  lowerBound: number,
  triggerAlert: number | undefined ,
  timestamp: Date ,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {

    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = price_ABC/price_DEF;
    const upper_Bound = 1 + 0.05;
    const lower_Bound = 1 - 0.05;
    return{
      priceABC: price_ABC,
      priceDEF: price_DEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
        serverResponds[0].timestamp : serverResponds[1].timestamp,
      upperBound: upper_Bound,
      lowerBound: lower_Bound,
      triggerAlert: (ratio > upper_Bound || ratio < lower_Bound) ? ratio : undefined,
    };
  }
}
