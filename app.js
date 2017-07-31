'use strict'

var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');

var mnemonic = bip39.generateMnemonic();
if (bip39.validateMnemonic(mnemonic)) {
    console.log('\nThe mnemonic is \n' + mnemonic);
    var seed = bip39.mnemonicToSeed(mnemonic);
    var root = bitcoin.HDNode.fromSeedBuffer(seed);
    var dp = root.derivePath("m/168'/0'/0'/0/5");
    
    console.log('\nThe privateKey is \n' + dp.keyPair.toWIF());
    console.log('\nThe publicKey is \n' + dp.getPublicKeyBuffer().toString('hex'));
    console.log('\nThe Address is \n' + dp.getAddress());    
} else {
    alert('生成密钥短语错误，请联系邮箱 lishude@aliyun.com');
}