import BaseWalletHelper from 'js-btc/lib/base/base_bitcoinjs_lib'

/**
 * 地址相关可以用
 */
export default class Wallet extends BaseWalletHelper {
  decimals: number = 8;
  bitcoinLib: any


  public constructor () {
    super()
    this.bitcoinLib = require('btc-bitcoinjs-lib')
  }
}