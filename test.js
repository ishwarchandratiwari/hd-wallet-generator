'use strict'

const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const setting = require('./setting.json');

var ecurve = require('ecurve')
var curve = ecurve.getCurveByName('secp256k1')

// const passwd = setting.mnemonic.passwd;
// generate a random mnemonic,
// and will write into mnemonic.txt
let mnemonic = bip39.generateMnemonic();
console.log('\nThe mnemonic is \n' + mnemonic);
// encrypt the mnemonic
if (bip39.validateMnemonic(mnemonic)) {
    // const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = bitcoin.HDNode.fromSeedBuffer(seed);
    const dp = root.derivePath(setting.derivePath + setting.Number);
    console.log('\nThe privateKey is \n' + dp.keyPair.toWIF())
    console.log('\nThe publicKey is \n' + dp.getPublicKeyBuffer().toString('hex'))
    console.log('\nThe Address is \n' + dp.getAddress())    
} else {
    alert('生成密钥短语错误，请联系邮箱 lishude@aliyun.com');
}