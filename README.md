# R2FinalTestnet-NTE
An automated bot for interacting with the R2 Money protocol on the Sepolia testnet. This bot allows users to perform swaps between USDC and R2USD tokens, as well as stake R2USD to receive sR2USD tokens.


## Installation

1. Clone the repository:
```bash
git clone https://github.com/airdropbomb/R2FinalTestnet.git && cd R2FinalTestnet
```

2. Install dependencies:
```bash
npm install
```

3. Create an `wallets.json` file with your private key(s) and Discord Token
```
[
  { "privateKey": "private_key1", "discordToken": "discord_token1" },
  { "privateKey": "private_key2", "discordToken": "discord_token2" }
]
# Add more keys as needed
```

## Usage

Run the bot with:

```bash
npm start
```
