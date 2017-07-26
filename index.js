'use strict'

const fs = require('fs');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const bip32utils = require('bip32-utils');
const setting = require('./setting.json');

const passwd = setting.mnemonic.passwd;
// generate a random mnemonic,
// and will write into output/mnemonic.txt
console.info('generating 12 english words to mnemonic...' + '\n');
let mnemonic = bip39.generateMnemonic();
fs.writeFile('mnemonic.txt', mnemonic, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info('The mnemonic was stored in mnemonic.txt');
    }
})
// encrypt the mnemonic
if (bip39.validateMnemonic(mnemonic)) {
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const seed = bip39.mnemonicToSeed(mnemonic);
    fs.writeFile('seed.txt', seed, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.info('\nSeed writed in outputs/seedEncypted.text')
        }
    });
    const root = bitcoin.HDNode.fromSeedBuffer(seed);
    // create Bitcoin Core Derive path address
    const address = root.derivePath(setting.derivePath + setting.Number).getAddress();
    console.info('Your address is ' + address);
} else {
    console.error('Mnemonic is wrong!please contact lishude@aliyun.com');
}