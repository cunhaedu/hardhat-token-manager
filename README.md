<p align="left">
   <img src="public/hardhat-logo.png" width=150/>
</p>

# Hardhat Token Manager

A simple project that simulates tokens transfer between different accounts build with [hardhat](https://hardhat.org/) framework.

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Deploy](#runner-deploy)

# :rocket: Features

* Token transfer
* Get Balance

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/cunhaedu/hardhat-token-manager.git
```

**Install dependencies**

```
npm install
```

Create your environment variables based on the examples of ```.env.example```

```
cp .env.example .env
```

**Compile project**

```
npx hardhat compile
```

# :runner: Deploy

Run the following command in order to deploy the application locally
```
npx hardhat run scripts/deploy.ts
```

If you want to deploy the application and see it work I highly recommend you to create a free account in [Infura](https://infura.io/), a Blockchain Development Suite that allow us to deploy  blockchain contracts.<br/>
Once you have an account you can create a project there and get your endpoint data, then, you can put it in ```.env``` file:

```
RINKEBY_URL=https://rinkeby.infura.io/v3/<YOUR INFURA KEY>
PRIVATE_KEY=0x<YOUR METAMASK PRIVATE KEY>
```
Once you put your data in .env you can run the following command:

```shell
npx hardhat run scripts/deploy.ts --network rinkeby

```
