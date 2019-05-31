import '@pefish/js-node-assist'
import BitcoinWalletHelper from './wallet'
import assert from 'assert'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

describe('bitcoinWalletHelper', () => {

  let walletHelper
  const testnet = 'testnet', mainnet = 'mainnet'

  before(async () => {
    walletHelper = new BitcoinWalletHelper()
  })

  it('getAllFromPrivateKey', async () => {
    try {
      const result = walletHelper.getAllFromPrivateKey('0xff80e6800f8e0b9c27431f3cf6c4346175eaad12745a91bd41c7141e70c58378', mainnet)
      // logger.error(result)
      assert.strictEqual(result['publicKey'], '02f7166a1fd8dd1b253667c63af6e580d9867abe79e48d4df655c98b71fd81a8e8')
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

