from web3 import Web3
from web3.middleware import geth_poa_middleware
from web3.middleware import construct_sign_and_send_raw_middleware
from eth_account import Account
import os
import sys
import time
from dotenv import load_dotenv

load_dotenv()

weatherData = list(sys.argv[1:])
sTemp = round(float(weatherData[0]) * 100, 0)
sHumi = round(float(weatherData[1]) * 100, 0)
sLux = round(float(weatherData[2]) * 100, 0)
sPress = round(float(weatherData[3]) * 100, 0)
##print("Bringing my presence on the blockchain")
key = os.getenv('PRIVATE_KEY')
rpc = os.getenv('RPC')

Account.enable_unaudited_hdwallet_features()
acct = Account.from_key(key)

#print(acct.address)

w3 = Web3(Web3.HTTPProvider(rpc))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)
w3.middleware_onion.add(construct_sign_and_send_raw_middleware(acct))
w3.eth.default_account = acct.address

#print('Connected:' + str(w3.isConnected()))
#print('////')
Caddress = '0x673aCB29765fAB093dDd522850f16F0b2e3D3C39'
abi = '[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"dataArray","type":"uint256[]"}],"name":"Update","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"temperature","type":"uint256"},{"internalType":"uint256","name":"humidity","type":"uint256"},{"internalType":"uint256","name":"luminosity","type":"uint256"},{"internalType":"uint256","name":"pressure","type":"uint256"}],"name":"updateData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"weatherData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'

contract = w3.eth.contract(address=Caddress, abi=abi)

gas_estimate = contract.functions.updateData(int(sTemp), int(sHumi), int(sLux), int(sPress)).estimate_gas() * 20
#print(f'Gas estimate to transact with togglePresence: {gas_estimate}')
# transaction
#print('////')
transaction = contract.functions.updateData(int(sTemp), int(sHumi), int(sLux), int(sPress)).build_transaction(
    {"chainId": 10,
        "gasPrice": gas_estimate,
        "nonce" : w3.eth.get_transaction_count(acct.address),
        }
)
#print(transaction)
#print('////')

signed_tx = w3.eth.account.sign_transaction(transaction, key)
txn_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

# degree sign for tweet
degree_sign = u"\N{DEGREE SIGN}"

# generate strings for the statement
enviroStatement = "[...] the indoor temperature was "
eStatement2 = 'C\nthe humidity levels were at '
eSta3 = '%\nthe light sensor measured '
eSta4 = 'Lux\nand barometric pressure was at '
eSta5 = 'hPa https://optimistic.etherscan.io/tx/'
print(enviroStatement + (str(round(sTemp * 0.01, 2))) + str(degree_sign) + eStatement2 + str(round(sHumi * 0.01, 2)) + eSta3 + str(round(sLux * 0.01, 2)) + eSta4 + str(round(sPress * 0.01, 2)) + eSta5 + txn_receipt.transactionHash.hex())


