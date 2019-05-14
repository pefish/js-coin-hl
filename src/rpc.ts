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
    const data = await this.requestRaw('Chain33.GetLastHeader', [])
    if (data[`error`]) {
      throw new ErrorHelper(data[`error`])
    }
    return data[`result`]
  }

  async getBlockHash (height: number): Promise<any> {
    const data = await this.requestRaw('Chain33.GetBlockHash', [
      {
        height,
      }
    ])
    if (data[`error`]) {
      throw new ErrorHelper(data[`error`])
    }
    return data[`result`][`hash`]
  }
}
