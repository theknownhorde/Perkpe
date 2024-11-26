const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock(0, '0'); // Genesis block
    }

    createBlock(amount, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date(),
            amount,
            previousHash,
            hash: this.calculateHash(amount, previousHash),
        };
        this.chain.push(block);
        return block;
    }

    calculateHash(amount, previousHash) {
        return crypto
            .createHash('sha256')
            .update(`${amount}-${previousHash}-${new Date().getTime()}`)
            .digest('hex');
    }

    addTransaction(transaction) {
        const previousBlock = this.chain[this.chain.length - 1];
        const block = this.createBlock(
            transaction,
            previousBlock ? previousBlock.hash : '0'
        );
        return block.hash; // Return the hash for transaction reference
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== this.calculateHash(currentBlock.amount, currentBlock.previousHash)) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getChain() {
        return this.chain;
    }
}

module.exports = new Blockchain();