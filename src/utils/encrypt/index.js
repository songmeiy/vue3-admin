import CryptoJS from 'crypto-js' // 引用AES源码js
import { getPublicKey } from '@/api/publicKey'

/**
 * @author WangZeping zepingwong@gmail.com
 * @description 解密方法
 * @param word
 * @param key
 * @returns {Promise<string>}
 * @constructor
 */
export async function Decrypt(word, key) {
  const res = await getPublicKey()
  const iv = CryptoJS.enc.Utf8.parse(res.iv) // 十六位十六进制数作为密钥偏移量
  // 密钥16位
  key = CryptoJS.enc.Utf8.parse(key.substr(0, 16))
  const decrypted = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString()
}

/**
 * @author WangZeping zepingwong@gmail.com
 * @description 加密方法
 * @param encryptData
 * @returns {Promise<{}|*>}
 * @constructor
 */
export async function Encrypt(encryptData) {
  const { data } = await getPublicKey()
  const iv = CryptoJS.enc.Utf8.parse(data.iv) // 十六位十六进制数作为密钥偏移量
  if (data.mockServer) {
    return encryptData
  }
  const nowTime = (new Date().getTime() + 'WZP').substr(0, 16)
  const key = CryptoJS.enc.Utf8.parse(nowTime)
  const encrypted = {}
  switch (typeof data) {
      case 'string':
        encrypted['data'] = CryptoJS.AES.encrypt(encryptData, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString()
        encrypted['encryptKey'] = nowTime
        break
      case 'object':
        Object.keys(encryptData).forEach((i) => {
          encrypted[i] = CryptoJS.AES.encrypt(encryptData[i], key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString()
        })
        encrypted['encryptKey'] = nowTime
  }
  return encrypted
}
