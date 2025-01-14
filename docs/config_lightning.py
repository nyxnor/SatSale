# In this example config, we enable lightning payments
# On-chain payments will still be an option for users

# We will be hosting SatSale on the same machine as our node.
# SatSale & Bitcoin Lightning Node    1.1.1.1     8332, 10009 (bitcoind, lnd)

# As we are running SatSale on our node, 
# it can directly talk to our node at localhost 127.0.0.1
host = "127.0.0.1"
rpcport = "8332"

# From ~/.bitcoin/bitcoin.conf
username = "bitcoinrpc"
password = "RPAPASSWORD"

# Wallet ("" if single-wallet node, OR wallet name/path as shown in `biitcoin-cli listwallets`)
wallet = ""

# File in which API key will be stored
api_key_path = "BTCPyment_API_key"

# As we are running SatSale on our node
# we do not require any remote tunnel
tunnel_host = None

# Check for payment every xx seconds
pollrate = 15

# Payment expires after xx seconds
payment_timeout = 60*60

# Required confirmations for a payment
required_confirmations = 2

# Global connection attempts
connection_attempts = 3

# Redirect url after payment
redirect = "https://github.com/nickfarrow/satsale"

# Payment method has been switched to lnd
#pay_method = "bitcoind"
pay_method = "lnd"

# Specify lightning directory and port
lnd_dir = "~/.lnd/"
lnd_rpcport = "10009"

# Login certificates automatically pulled from ~/.lnd/ and ~/.lnd/data/chain/bitcoin/mainnet/
lnd_macaroon = "invoice.macaroon"
lnd_cert = "tls.cert"

# DO NOT CHANGE THIS TO TRUE UNLESS YOU WANT ALL PAYMENTS TO AUTOMATICALLY
# BE CONSIDERED AS PAID.
free_mode = False
