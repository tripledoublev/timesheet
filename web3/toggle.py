from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account
import os
import sys
from dotenv import load_dotenv

load_dotenv()

def main():
    key = os.getenv('PRIVATE_KEY')
    rpc = os.getenv('RPC')
    Account.enable_unaudited_hdwallet_features()
    acct = Account.from_key(key)
    print(acct.address)
    w3 = Web3(Web3.HTTPProvider(rpc))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    print('Connected:' + str(w3.isConnected()))
    latest = w3.eth.get_block('latest')
    address = '0xAf6C153972fBC7d67feaA9f9d1d08F3c13f79773'
    abi = '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"status","type":"bool"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"Update","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"statement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"togglePresence","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'
    contract = w3.eth.contract(address=address, abi=abi)
    transaction = contract.functions.togglePresence.build_transaction({
        "gas": 100000,
        "maxFeePerGas": 2000000000,
        "maxPriorityFeePerGas": 2000000000,
        "nonce": w3.eth.get_transaction_count(acct.address)})
    print('////')
    print(transaction)
    signed = Account.sign_transaction(transaction, key)
    print('////')
    w3.eth.send_raw_transaction(signed.rawTransaction)
    print('////')

if __name__ == '__main__':
    globals()[sys.argv[1]]()