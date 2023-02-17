import hre from 'hardhat';
import { BigNumber, BigNumberish, parseFixed as _parseFixed } from '@ethersproject/bignumber';

async function main() {
  const name = 'Bobby Pool';
  const symbol = 'BOBBY';
  const tokenAddresses = ['0x64544969ed7EBf5f083679233325356EbE738930', '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'];
  const weights = [`${0.5e18}`, `${0.5e18}`];
  const rateProviders = ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'];
  const swapFee = '0.01';
  const owner = '0xfEB47392B746dA43C28683A145237aC5EC5D554B'; // Test Account

  function parseFixed(value: string, decimals?: BigNumberish): BigNumber {
    const valueWithTrimmedDecimals = new RegExp(`[0-9]+\\.?[0-9]{0,${decimals}}`);
    const result = value.match(valueWithTrimmedDecimals);
    let parsedValue = value;
    if (result) {
      parsedValue = result[0];
    }

    return _parseFixed(parsedValue, decimals);
  }

  const swapFeeScaled = parseFixed(`${swapFee}`, 18);

  console.log('weight elements type: ' + typeof weights[0]);
  console.log('weights: ' + weights);

  console.log('swapFeeScaled type: ' + typeof swapFeeScaled);
  console.log('swapFeeScaled: ' + JSON.stringify(swapFeeScaled));

  await hre.run('verify:verify', {
    address: '0xa96589e098EF7DCC41822aE9db3D70cc7459f598', // contractAddress
    constructorArguments: [
      'Bobby Pool',
      'BOBBY',
      ['0x64544969ed7EBf5f083679233325356EbE738930', '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'],
      ['500000000000000000', '500000000000000000'],
      ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000000'],
      { type: 'BigNumber', hex: '0x2386f26fc10000' },
      '0xfEB47392B746dA43C28683A145237aC5EC5D554B',
    ],
  });
}

export default main();
