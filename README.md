# 🦎 Iguana Backend

<p align="center">
  <img width="320" height="246" src="https://user-images.githubusercontent.com/34973295/206001164-103361a4-086e-4e12-83e6-8a2d7ccd4d59.png">
</p>

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-blue)](https://iguanadex.gitbook.io/iguanadex-docs/)
[![CI Status](https://github.com/balancer-labs/balancer-v2-monorepo/workflows/CI/badge.svg)](https://github.com/iguana-dex/iguana-backend/actions)
[![License](https://img.shields.io/badge/License-GPLv3-green.svg)](https://www.gnu.org/licenses/gpl-3.0)

This repository contains the IguanaDEX core smart contracts, including the `Vault` and standard Pools, along with their tests, configuration, and deployment information.

IguanaDEX was partly forked from Balancer V2. For a high-level introduction to Balancer V2, see [Introducing Balancer V2: Generalized AMMs](https://medium.com/balancer-protocol/balancer-v2-generalizing-amms-16343c4563ff).

## Structure

This is a Yarn 2 monorepo, with the packages meant to be published in the [`pkg`](./pkg) directory. Newly developed packages may not be published yet.

Active development occurs in this repository, which means some contracts in it might not be production-ready. Proceed with caution.

### Packages

- [`v2-deployments`](./pkg/deployments): addresses and ABIs of all Balancer V2 deployed contracts, for mainnet and various test networks.
- [`v2-interfaces`](./pkg/interfaces): Solidity interfaces for all contracts.
- [`v2-vault`](./pkg/vault): the [`Vault`](./pkg/vault/contracts/Vault.sol) contract and all core interfaces, including [`IVault`](./pkg/vault/contracts/interfaces/IVault.sol) and the Pool interfaces: [`IBasePool`](./pkg/vault/contracts/interfaces/IBasePool.sol), [`IGeneralPool`](./pkg/vault/contracts/interfaces/IGeneralPool.sol) and [`IMinimalSwapInfoPool`](./pkg/vault/contracts/interfaces/IMinimalSwapInfoPool.sol).
- [`v2-pool-weighted`](./pkg/pool-weighted): the [`WeightedPool`](./pkg/pool-weighted/contracts/WeightedPool.sol), [`WeightedPool2Tokens`](./pkg/pool-weighted/contracts/WeightedPool2Tokens.sol) and [`LiquidityBootstrappingPool`](./pkg/pool-weighted/contracts/smart/LiquidityBootstrappingPool.sol) contracts, along with their associated factories.
- [`v2-pool-linear`](./pkg/pool-linear): the [`AaveLinearPool`](./pkg/pool-linear/contracts/aave/AaveLinearPool.sol) and [`ERC4626LinearPool`](./pkg/pool-linear/contracts/erc4626/ERC4626LinearPool.sol) contracts, along with their associated factories.
- [`v2-pool-utils`](./pkg/pool-utils): Solidity utilities used to develop Pool contracts.
- [`v2-solidity-utils`](./pkg/solidity-utils): miscellaneous Solidity helpers and utilities used in many different contracts.
- [`v2-standalone-utils`](./pkg/standalone-utils): miscellaneous standalone utility contracts.
- [`v2-liquidity-mining`](./pkg/liquidity-mining): contracts that compose the liquidity mining (veBAL) system.
- [`v2-governance-scripts`](./pkg/governance-scripts): contracts that execute complex governance actions.

## Pre-requisites

The build & test instructions below should work out of the box with Node ^14.18.0. (Please note that it needs Node 14 specifically, and will NOT work with Node 16 or higher. Minor version should be at least 18).

## Clone

This repository uses git submodules; use `--recurse-submodules` option when cloning. For example, using https:

```bash
$ git clone --recurse-submodules https://github.com/Iguana-DEX/iguana-backend.git
```

## Build and Test

Before any tests can be run, the repository needs to be prepared:

```bash
$ yarn # install all dependencies
$ yarn build # compile all contracts
```

Most tests are standalone and simply require installation of dependencies and compilation. Some packages however have extra requirements. Notably, the [`v2-deployments`](./pkg/deployments) package must have access to mainnet archive nodes in order to perform fork tests. For more details, head to [its readme file](./pkg/deployments/README.md).

In order to run all tests (including those with extra dependencies), run:

```bash
$ yarn test # run all tests
```

To instead run a single package's tests, run:

```bash
$ cd pkg/<package> # e.g. cd pkg/v2-vault
$ yarn test
```

You can see a sample report of a test run [here](./audits/test-report.md).

### Foundry (Forge) tests

To run Forge tests, first [install Foundry](https://book.getfoundry.sh/getting-started/installation). The installation steps below apply to Linux or MacOS. Follow the link for additional options.

```bash
$ curl -L https://foundry.paradigm.xyz | bash
$ source ~/.bashrc # or open a new terminal
$ foundryup
```

Then, to run tests in a single package, run:
```bash
$ cd pkg/<package> # e.g. cd pkg/v2-vault
$ yarn test-fuzz
```

## Security

Multiple independent reviews and audits were performed by [Certora](https://www.certora.com/), [OpenZeppelin](https://openzeppelin.com/) and [Trail of Bits](https://www.trailofbits.com/). The latest reports from these engagements are located in the [`audits`](./audits) directory.

All core smart contracts are immutable, and cannot be upgraded. See page 6 of the [Trail of Bits audit](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/audits/trail-of-bits/2021-04-05.pdf):

> Upgradeability | Not Applicable. The system cannot be upgraded.

## Licensing

Most of the Solidity source code is licensed under the GNU General Public License Version 3 (GPL v3): see [`LICENSE`](./LICENSE).

### Exceptions

- All files in the `openzeppelin` directory of the [`v2-solidity-utils`](./pkg/solidity-utils) package are based on the [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) library, and as such are licensed under the MIT License: see [LICENSE](./pkg/solidity-utils/contracts/openzeppelin/LICENSE).
- The `LogExpMath` contract from the [`v2-solidity-utils`](./pkg/solidity-utils) package is licensed under the MIT License.
- All other files, including tests and the [`pvt`](./pvt) directory are unlicensed.
