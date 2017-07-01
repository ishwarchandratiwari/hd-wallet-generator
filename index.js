'use strict'

var fs = require('fs');
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var bip32utils = require('bip32-utils');

// read the setting from setting.json
var setting = JSON.parse(fs.readFileSync('setting.json', 'utf-8'));
var passwd = setting.mnemonic.passwd;
// generate a random mnemonic,
// will write into output/mnemonic.txt
console.info('generating 12 english words to mnemonic...' + '\n')
var mnemonic = bip39.generateMnemonic();
fs.writeFile('outputs/mnemonic.txt', mnemonic, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info('generated!The mnemonic is "' + mnemonic + '"')
    }
})
// encrypt the mnemonic
console.info('password is ' + passwd + ',encrypting the seed.' + '\n')
if (bip39.validateMnemonic(mnemonic)) {
    var seedHex = bip39.mnemonicToSeedHex(mnemonic, passwd);
    var seed = bip39.mnemonicToSeed(mnemonic, passwd);
}