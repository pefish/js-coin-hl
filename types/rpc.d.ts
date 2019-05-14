import 'js-node-assist';
interface RpcConfig {
    host: string;
    port: number;
    username?: string;
    password?: string;
}
export default class Rpc {
    rpcConfig: RpcConfig;
    requestUrl: string;
    constructor(rpcConfig: RpcConfig);
    /**
     * 发送rpc请求
     * @param method {string} 方法名
     * @param params {array} 参数
     * @returns {Promise<void>}
     */
    requestRaw(method: string, params?: Array<any>): Promise<any>;
    request(method: string, params?: Array<any>): Promise<any>;
    GetLastHeader(): Promise<any>;
    getBlockHash(height: number): Promise<any>;
    getBlockOverview(blockHash: string): Promise<any>;
    queryTransaction(txHash: string): Promise<any>;
    getBalance(address: string): Promise<any>;
    createRawTransaction(toAddress: string, amount: string): Promise<any>;
    /**
     * 构造并发送不收手续费交易（平行链）
     * @param {string} txHex 未签名的原始交易数据
     * @param {string} payAddressPriv 用于付费的地址的私钥，这个地址要在主链上存在，并且里面有比特元用于支付手续费
     * @returns {Promise<any>}
     */
    createNoBalanceTransaction(txHex: string, payAddressPriv: string): Promise<any>;
    signRawTx(txHex: string, priv: string): Promise<any>;
    sendTransaction(txHex: string): Promise<any>;
    isSync(): Promise<any>;
    getLastBlockSequence(): Promise<any>;
    getBlocks(height: number): Promise<any>;
}
export {};
