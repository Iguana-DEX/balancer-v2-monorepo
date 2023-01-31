import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { TokenDeployment } from './input';
import { bn } from '@balancer-labs/v2-helpers/src/numbers';
import { Contract } from 'ethers';
// import * as expectEvent from '@balancer-labs/v2-helpers/src/test/expectEvent';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as TokenDeployment;
  const implementation = await task.deployAndVerify('BEP20TokenImplementationV1', [], from, force);
  const factory = await task.deployAndVerify('BEP20TokenFactory', [implementation.address], from, force);

  let tx: undefined; 
  let receipt: undefined;
  let address: string;
  let bep20: Contract;

  for (const token of input.tokens) {

    if (!(token.symbol in task.output())) {
    // also retry if connection error
      tx = await factory.createBEP20Token(
        token.name,
        token.symbol,
        18,
        bn(1e24), // mint 1e6 tokens
        true,
        input.bep20Owner,
        input.proxyAdmin
      );

      receipt = await tx.wait();
      address = await receipt.events.filter((e) => e.event !== 'TokenCreated')[0].address;
      bep20 = await task.instanceAt('BEP20UpgradeableProxy', address);
    
      console.log(token.symbol, 'deployed at:', address);
      await task.save({[token.symbol]: bep20});
    } else {
      address = task.output()[token.symbol];
    }

    // await task.verify('BEP20UpgradeableProxy', address, [
    //  implementation.address,
    //  input.proxyAdmin,
    // '0x'
    // ]);
  }
};
