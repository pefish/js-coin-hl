import { BtcWallet } from '@pefish/js-coin-btc';
import Remote, { RemoteConfig } from './remote';
/**
 * 地址相关可以用
 */
export default class Wallet extends BtcWallet {
    remoteClient: Remote;
    initRemoteClient(config: RemoteConfig): void;
}
