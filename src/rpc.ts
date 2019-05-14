import 'js-node-assist'
import HttpRequest from 'js-httprequest'
import ErrorHelper from 'p-js-error'

interface RpcConfig {
  host: string
  port: number
  username?: string
  password?: string
}

export default class Rpc {
  rpcConfig: RpcConfig
  requestUrl: string

  constructor (rpcConfig: RpcConfig) {
    this.rpcConfig = rpcConfig
    this.requestUrl = `http://${rpcConfig.host}:${rpcConfig.port}`
  }

  /**
   * 发送rpc请求
   * @param method {string} 方法名
   * @param params {array} 参数
   * @returns {Promise<void>}
   */
  async requestRaw (method: string, params: Array<any> = []): Promise<any> {
    return await HttpRequest.postJson(this.requestUrl, null, {
      jsonrpc: `2.0`,
      method,
      params,
      id: 1,
    })
  }

  async request (method: string, params: Array<any> = []): Promise<any> {
    const data = await HttpRequest.postJson(this.requestUrl, null, {
      jsonrpc: `2.0`,
      method,
      params,
      id: 1,
    })
    if (data[`error`]) {
      throw new ErrorHelper(data[`error`])
    }
    return data[`result`]
  }

  async GetLastHeader (): Promise<any> {
    return await this.request('Chain33.GetLastHeader', [])
  }

  async getBlockHash (height: number): Promise<any> {
    const data = await this.request('Chain33.GetBlockHash', [
      {
        height,
      }
    ])
    return data[`hash`]
  }

  async getBlockOverview (blockHash: string): Promise<any> {
    return await this.request('Chain33.GetBlockOverview', [
      {
        hash: blockHash,
      }
    ])
  }

  async queryTransaction (txHash: string): Promise<any> {
    return await this.request('Chain33.QueryTransaction', [
      {
        hash: txHash,
      }
    ])
  }

  async getBalance (address: string): Promise<any> {
    return await this.request('Chain33.GetBalance', [
      {
        addresses: [address],
        execer: `coins`,
      }
    ])
  }

  async createRawTransaction (toAddress: string, amount: string): Promise<any> {
    return await this.request('Chain33.CreateRawTransaction', [
      {
        to: toAddress,
        amount: amount.toNumber_(),
        fee: 0,
        note: ``,
        execName: ``,
      }
    ])
  }

  /**
   * 构造并发送不收手续费交易（平行链）
   * @param {string} txHex 未签名的原始交易数据
   * @param {string} payAddressPriv 用于付费的地址的私钥，这个地址要在主链上存在，并且里面有比特元用于支付手续费
   * @returns {Promise<any>}
   */
  async createNoBalanceTransaction (txHex: string, payAddressPriv: string): Promise<any> {
    return await this.request('Chain33.CreateNoBalanceTransaction', [
      {
        txHex,
        privkey: payAddressPriv,
        expire: `2h45m`,
      }
    ])
  }

  async signRawTx (txHex: string, priv: string): Promise<any> {
    return await this.request('Chain33.SignRawTx', [
      {
        privkey: priv,
        txHex,
        expire: `2h45m`,
        index: 2
      }
    ])
  }

  async sendTransaction (txHex: string): Promise<any> {
    return await this.request('Chain33.SendTransaction', [
      {
        data: txHex,
      }
    ])
  }

  async isSync (): Promise<any> {
    return await this.request('Chain33.IsSync', [])
  }

  async getLastBlockSequence (): Promise<any> {
    return await this.request('Chain33.GetLastBlockSequence', [])
  }

  async getBlocks (height: number): Promise<any> {
    return await this.request('Chain33.GetBlocks', [
      {
        start: height,
        end: height,
        isDetail: true,
      }
    ])
  }
}
