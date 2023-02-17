import hre from 'hardhat';

export async function verify() {
  await hre.run('verify:verify', {
    address: '0xa96589e098EF7DCC41822aE9db3D70cc7459f598', // contractAddress
    constructorArguments: [
      50,
      'a string argument',
      {
        x: 10,
        y: 5,
      },
      '0xabcdef',
    ],
  });
}

verify();
