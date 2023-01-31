export interface Token {
  symbol: string;
  name: string;
}

export type TokenDeployment = {
  bep20Owner: string;
  proxyAdmin: string;
  tokens: Token[];
};

export default {
  'bsc': {
  },
  'bsc-testnet': {
    'bep20Owner': '0xE19fBc40cF98D81FF21cdaF4670870dA313aBe43',
    'proxyAdmin': '0xfEB47392B746dA43C28683A145237aC5EC5D554B',
    'tokens': [
      {
        'symbol': 'WBNB',
        'name': 'Wrapped BNB',
      },
      {
        'symbol': 'DOGE',
        'name': 'Binance-Peg Dogecoin Token',
      },
      {
        'symbol': 'ADA',
        'name': 'Binance-Peg Cardano Token',
      },
      {
        'symbol': 'MATIC',
        'name': 'Matic Token',
      },
      {
        'symbol': 'LTC',
        'name': 'Binance-Peg Litecoin Token',
      },
      {
        'symbol': 'SHIB',
        'name': 'Binance-Peg SHIBA INU Token',
      },
      {
        'symbol': 'TRX',
        'name': 'TRON',
      },
      {
        'symbol': 'UNI',
        'name': 'Binance-Peg Uniswap',
      },
      {
        'symbol': 'AVAX',
        'name': 'Binance-Peg Avalanche Token',
      },
      {
        'symbol': 'ATOM',
        'name': 'Binance-Peg Cosmos Token',
      },
      {
        'symbol': 'ETC',
        'name': 'Binance-Peg Ethereum Classic',
      },
      {
        'symbol': 'LINK',
        'name': 'Binance-Peg ChainLink Token',
      },
      {
        'symbol': 'BCH',
        'name': 'Binance-Peg Bitcoin Cash Token',
      },
      {
        'symbol': 'EOS',
        'name': 'Binance-Peg EOS Token',
      },
      {
        'symbol': '1INCH',
        'name': '1INCH Token',
      },
      {
        'symbol': 'CAKE',
        'name': 'PancakeSwap Token',
      },
      {
        'symbol': 'SOL',
        'name': 'SOLANA',
      },
      {
        'symbol': 'DOT',
        'name': 'Binance-Peg Polkadot Token'
      },
    ],
  },
};
