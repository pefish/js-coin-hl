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
}
export {};
