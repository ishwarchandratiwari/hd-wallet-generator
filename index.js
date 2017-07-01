'use strict'

const fs = require('fs');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const bip32utils = require('bip32-utils');

// read the setting from setting.json
const setting = JSON.parse(fs.readFileSync('setting.json', 'utf-8'));
const passwd = setting.mnemonic.passwd;
// generate a random mnemonic,
// will write into output/mnemonic.txt
console.info('generating 12 english words to mnemonic...' + '\n')
const mnemonic = bip39.generateMnemonic();
fs.writeFile('outputs/mnemonic.txt', mnemonic, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info('generated!The mnemonic was stored in output/mnemonic.txt');
    }
})
// encrypt the mnemonic
console.info('password is ' + passwd + ',encrypting the seed.' + '\n')
if (bip39.validateMnemonic(mnemonic)) {
    const seedHex = bip39.mnemonicToSeedHex(mnemonic, passwd);
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
        btcAddr[i] = root.derivePath(setting.derivePath + i).getAddress();
    }
    console.info('Create'+ btcAddr.length +'bitcoin(s)');
} else {
    console.error('Mnemonic is wrong!please check it again!');
}