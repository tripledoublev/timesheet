from web3 import Web3
from web3.middleware import geth_poa_middleware
from web3.middleware import construct_sign_and_send_raw_middleware
from eth_account import Account
import os
import sys
import time
from dotenv import load_dotenv

load_dotenv()

def main():
    print("Bringing my presence on the blockchain")
    key = os.getenv('PRIVATE_KEY')
    rpc = os.getenv('RPC')
   
    Account.enable_unaudited_hdwallet_features()
    acct = Account.from_key(key)

    print(acct.address)

    w3 = Web3(Web3.HTTPProvider(rpc))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(acct))
    w3.eth.default_account = acct.address

    print('Connected:' + str(w3.isConnected()))
    print('////')
    Caddress = '0xAf6C153972fBC7d67feaA9f9d1d08F3c13f79773'
    abi = '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"status","type":"bool"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"Update","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"presence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"statement","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"togglePresence","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'
    
    contract = w3.eth.contract(address=Caddress, abi=abi)
    #read state
    presence = contract.functions.presence().call()
    statement = contract.functions.statement().call()
    print("Before transaction with the blockchain")
    print('Presence: ' + str(presence))
    print(statement)
    print('////')
    gas_estimate = contract.functions.togglePresence().estimate_gas() * 20
    print(f'Gas estimate to transact with togglePresence: {gas_estimate}')
    # transaction
    print('////')
    transaction = contract.functions.togglePresence().build_transaction(
        {"chainId": 10,
          "gasPrice": gas_estimate,
          "nonce" : w3.eth.get_transaction_count(acct.address),
          }
    )
    print(transaction)
    print('////')
    
    signed_tx = w3.eth.account.sign_transaction(transaction, key)
    txn_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    print(txn_receipt)
    print('////')

    
    print(f'Tx successful with hash: { txn_receipt.transactionHash.hex() }')
    print('////')
    #read state AGAIN
    time.sleep(2.5)
    presence = contract.functions.presence().call()
    statement = contract.functions.statement().call()
    print("After transaction with the blockchain")
    print('Presence: ' + str(presence))
    print(statement)
    print('////')
    myReturn = 'https://optimistic.etherscan.io/tx/' + txn_receipt.transactionHash.hex() 
    return myReturn

if __name__ == '__main__':
    globals()[sys.argv[1]]()