import '@pefish/js-node-assist'
import assert from 'assert'
import Rpc from './rpc'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

describe('bitcoinWalletHelper', () => {

  let rpc

  before(async () => {
    rpc = new Rpc({
      host: `52.230.11.96`,
      port: 8901,
    })
  })

  it('GetLastHeader', async () => {
    try {
      const result = await rpc.GetLastHeader()
      // global.logger.error(result)
      assert.strictEqual(result['version'], 0)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getBlockHash', async () => {
    try {
      const result = await rpc.getBlockHash(1763)
      // global.logger.error(result)
      assert.strictEqual(result, `0x85dab355be4bc8e3146353d97e213851e4c0e2d515441628465189748c7b830f`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getBlockOverview', async () => {
    try {
      const result = await rpc.getBlockOverview(`0x85dab355be4bc8e3146353d97e213851e4c0e2d515441628465189748c7b830f`)
      // global.logger.error(result)
      assert.strictEqual(result[`txCount`], 1)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

