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
fs.writeFile('outputs/mnemonic.txt', mnemonic, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info('Generated!The mnemonic was stored in output/mnemonic.txt');
    }
})
// encrypt the mnemonic
if (bip39.validateMnemonic(mnemonic)) {
    const seedHex = bip39.mnemonicToSeedHex(mnemonic);
    const seed = bip39.mnemonicToSeed(mnemonic);
    fs.writeFile('outputs/seed.txt', seed, function (err) {
        if (err) {
            console.error(err)
        } else {
            console.info('\nSeed writed in outputs/seedEncypted.text')
        }
    });
    const root = bitcoin.HDNode.fromSeedBuffer(seed);
    var btcAddr = [];
    // create Bitcoin Core Derive path address
    for (let i = 0; i < setting.limit; i++) {
        btcAddr[i] = root.derivePath(setting.derivePath + '/' + i).getAddress();
    }
    console.info('Create ' + btcAddr.length + ' bitcoin address(es)');
} else {
    console.error('Mnemonic is wrong!please check it again!');
}