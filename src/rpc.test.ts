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
      host: `47.89.12.159`,
      port: 8901,
    })
  })

  it('getLastHeader', async () => {
    try {
      const result = await rpc.getLastHeader()
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

  it('createRawTransaction', async () => {
    try {
      const result = await rpc.createRawTransaction(`1KjTJ3tMTVBniqGtXbRh2DHRYMCZyxTzL2`, `1000000`)
      // global.logger.error(result)
      assert.strictEqual(result.length > 100, true)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('signRawTx', async () => {
    try {
      const result = await rpc.signRawTx(`0a1d757365722e702e6865616c7468796c696665636861696e2e636f696e73122c18010a2810c0843d2222314b6a544a33744d5456426e697147745862526832444852594d435a7978547a4c3220a08d0630efc5b8eee1b4defb1b3a22314144534333767766446159786d6938504e6e7a6d70696450566a76785250423274`, `3683facb85856c68996d3c78f3c865151b7f51bbad0565dd63645c609aafa070`)
      // global.logger.error(result)
      assert.strictEqual(result.length > 200, true)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  // it('sendTransaction', async () => {
  //   try {
  //     const result = await rpc.sendTransaction(`0a1d757365722e702e6865616c7468796c696665636861696e2e636f696e73122c18010a2810c0843d2222314b6a544a33744d5456426e697147745862526832444852594d435a7978547a4c321a6d080112210241359882a3af3d1dfdd3b13921b44f001594b7122f6f73cd08ab01dc2cbf51bf1a4630440220734b93743f22fe174a9983217de63de822149350e986228210cc0fb86e79d6330220094ee3c03f457bde7b441c652374abca1ecbdc93941ec876fa8f306b8a1d2d1b20a08d06289f86d4e70530efc5b8eee1b4defb1b3a22314144534333767766446159786d6938504e6e7a6d70696450566a76785250423274`, `3683facb85856c68996d3c78f3c865151b7f51bbad0565dd63645c609aafa070`)
  //     global.logger.error(result)
  //     // assert.strictEqual(result.length > 10, true)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })

  it('createNoBalanceTransaction', async () => {
    try {
      const result = await rpc.createNoBalanceTransaction(`0a1d757365722e702e6865616c7468796c696665636861696e2e636f696e73122c18010a2810c0843d2222314b6a544a33744d5456426e697147745862526832444852594d435a7978547a4c3220a08d0630bda0ffff8582abb9093a22314144534333767766446159786d6938504e6e7a6d70696450566a76785250423274`, `3683facb85856c68996d3c78f3c865151b7f51bbad0565dd63645c609aafa070`)
      global.logger.error(result)
      // assert.strictEqual(result['version'], 0)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getBlock', async () => {
    try {
      const result = await rpc.getBlock(6626)
      global.logger.error(result)
      // assert.strictEqual(result['version'], 0)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  // it('all', async () => {
  //   try {
  //     const resul = await rpc.createRawTransaction(`1KjTJ3tMTVBniqGtXbRh2DHRYMCZyxTzL2`, `1000000`)
  //     // const result = await rpc.createNoBalanceTransaction(resul, `3683facb85856c68996d3c78f3c865151b7f51bbad0565dd63645c609aafa070`)
  //     const result1 = await rpc.signRawTx(resul, `3683facb85856c68996d3c78f3c865151b7f51bbad0565dd63645c609aafa070`)
  //     const result3 = await rpc.sendTransaction(result1)
  //     global.logger.error(result3)
  //     // assert.strictEqual(result['version'], 0)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
})

