module.exports = [
  {
    url: '/crypto/publicKey',
    type: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: {
          mockServer: true,
          iv:
            'XyICONdYcrGFEzaf'
        }
      }
    }
  }
]
