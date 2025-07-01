async function swapR2ToUsdc(amountR2, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountR2.toString(), 18);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const r2Contract = new ethers.Contract(config.R2_ADDRESS, ERC20ABI, provider);
  let balance = await r2Contract.balanceOf(wallet.address);
  balance = BigInt(balance.toString());

  if (balance < amount) throw new Error(`Saldo R2 tidak cukup: ${ethers.formatUnits(balance, 18)} R2`);

  await ensureApproval(config.R2_ADDRESS, routerContractAddress, amount, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const path = [config.R2_ADDRESS, config.USDC_ADDRESS];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountOutMin = 0;

  const tx = await routerContract.swapExactTokensForTokens(
    amount,
    amountOutMin,
    path,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function swapUsdcToR2(amountUsdc, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountUsdc.toString(), 6);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const usdcContract = new ethers.Contract(config.USDC_ADDRESS, ERC20ABI, provider);
  let balance = await usdcContract.balanceOf(wallet.address);
  balance = BigInt(balance.toString());

  if (balance < amount) throw new Error(`Saldo USDC tidak cukup: ${ethers.formatUnits(balance, 6)} USDC`);

  await ensureApproval(config.USDC_ADDRESS, routerContractAddress, amount, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const path = [config.USDC_ADDRESS, config.R2_ADDRESS];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountOutMin = 0;

  const tx = await routerContract.swapExactTokensForTokens(
    amount,
    amountOutMin,
    path,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function swapR2ToR2usd(amountR2, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountR2.toString(), 18);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const r2Contract = new ethers.Contract(config.R2_ADDRESS, ERC20ABI, provider);
  let balance = await r2Contract.balanceOf(wallet.address);
  balance = BigInt(balance.toString());

  if (balance < amount) throw new Error(`Saldo R2 tidak cukup: ${ethers.formatUnits(balance, 18)} R2`);

  await ensureApproval(config.R2_ADDRESS, routerContractAddress, amount, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const path = [config.R2_ADDRESS, config.R2USD_ADDRESS];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountOutMin = 0;

  const tx = await routerContract.swapExactTokensForTokens(
    amount,
    amountOutMin,
    path,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function swapR2usdToR2(amountR2usd, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountR2usd.toString(), 6);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const r2usdContract = new ethers.Contract(config.R2USD_ADDRESS, ERC20ABI, provider);
  let balance = await r2usdContract.balanceOf(wallet.address);
  balance = BigInt(balance.toString());

  if (balance < amount) throw new Error(`Saldo R2USD tidak cukup: ${ethers.formatUnits(balance, 6)} R2USD`);

  await ensureApproval(config.R2USD_ADDRESS, routerContractAddress, amount, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const path = [config.R2USD_ADDRESS, config.R2_ADDRESS];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountOutMin = 0;

  const tx = await routerContract.swapExactTokensForTokens(
    amount,
    amountOutMin,
    path,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function addLpR2Usdc(amountR2, amountUsdc, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amountR2Wei = ethers.parseUnits(amountR2.toString(), 18);
  const amountUsdcWei = ethers.parseUnits(amountUsdc.toString(), 6);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const r2Contract = new ethers.Contract(config.R2_ADDRESS, ERC20ABI, provider);
  const usdcContract = new ethers.Contract(config.USDC_ADDRESS, ERC20ABI, provider);

  let balanceR2 = await r2Contract.balanceOf(wallet.address);
  let balanceUsdc = await usdcContract.balanceOf(wallet.address);
  balanceR2 = BigInt(balanceR2.toString());
  balanceUsdc = BigInt(balanceUsdc.toString());

  if (balanceR2 < amountR2Wei) throw new Error(`Saldo R2 tidak cukup: ${ethers.formatUnits(balanceR2, 18)} R2`);
  if (balanceUsdc < amountUsdcWei) throw new Error(`Saldo USDC tidak cukup: ${ethers.formatUnits(balanceUsdc, 6)} USDC`);

  await ensureApproval(config.R2_ADDRESS, routerContractAddress, amountR2Wei, wallet, network);
  await ensureApproval(config.USDC_ADDRESS, routerContractAddress, amountUsdcWei, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountAMin = 0;
  const amountBMin = 0;

  const tx = await routerContract.addLiquidity(
    config.R2_ADDRESS,
    config.USDC_ADDRESS,
    amountR2Wei,
    amountUsdcWei,
    amountAMin,
    amountBMin,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function addLpR2R2usd(amountR2, amountR2usd, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amountR2Wei = ethers.parseUnits(amountR2.toString(), 18);
  const amountR2usdWei = ethers.parseUnits(amountR2usd.toString(), 6);
  const routerContractAddress = config.ROUTER_ADDRESS;

  const r2Contract = new ethers.Contract(config.R2_ADDRESS, ERC20ABI, provider);
  const r2usdContract = new ethers.Contract(config.R2USD_ADDRESS, ERC20ABI, provider);

  let balanceR2 = await r2Contract.balanceOf(wallet.address);
  let balanceR2usd = await r2usdContract.balanceOf(wallet.address);
  balanceR2 = BigInt(balanceR2.toString());
  balanceR2usd = BigInt(balanceR2usd.toString());

  if (balanceR2 < amountR2Wei) throw new Error(`Saldo R2 tidak cukup: ${ethers.formatUnits(balanceR2, 18)} R2`);
  if (balanceR2usd < amountR2usdWei) throw new Error(`Saldo R2USD tidak cukup: ${ethers.formatUnits(balanceR2usd, 6)} R2USD`);

  await ensureApproval(config.R2_ADDRESS, routerContractAddress, amountR2Wei, wallet, network);
  await ensureApproval(config.R2USD_ADDRESS, routerContractAddress, amountR2usdWei, wallet, network);

  const routerContract = new ethers.Contract(routerContractAddress, ROUTER_ABI, wallet);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountAMin = 0;
  const amountBMin = 0;

  const tx = await routerContract.addLiquidity(
    config.R2_ADDRESS,
    config.R2USD_ADDRESS,
    amountR2Wei,
    amountR2usdWei,
    amountAMin,
    amountBMin,
    wallet.address,
    deadline,
    { nonce }
  );

  return tx;
}

async function autoSwapR2usdUsdc(network, wallet) {
  const ranges = randomAmountRanges["SWAP_R2USD_USDC"];
  let amount;
  let txPromise;
  let currentDirection = swapDirection[network];

  if (currentDirection) {
    amount = getRandomNumber(ranges["USDC"].min, ranges["USDC"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} USDC ke R2USD untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapUsdcToR2usd(amount, nonce, wallet, provider, config),
      `Swap ${amount} USDC to R2USD`,
      network,
      wallet
    );
  } else {
    amount = getRandomNumber(ranges["R2USD"].min, ranges["R2USD"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} R2USD ke USDC untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapR2usdToUsdc(amount, nonce, wallet, provider, config),
      `Swap ${amount} R2USD to USDC`,
      network,
      wallet
    );
  }

  const result = await txPromise;
  if (result && result.receipt && result.receipt.status === 1) {
    swapDirection[network] = !currentDirection;
  }
  return result;
}

async function autoSwapR2Usdc(network, wallet) {
  const ranges = randomAmountRanges["SWAP_R2_USDC"];
  let amount;
  let txPromise;
  let currentDirection = swapDirection[network];

  if (currentDirection) {
    amount = getRandomNumber(ranges["USDC"].min, ranges["USDC"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} USDC ke R2 untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapUsdcToR2(amount, nonce, wallet, provider, config),
      `Swap ${amount} USDC to R2`,
      network,
      wallet
    );
  } else {
    amount = getRandomNumber(ranges["R2"].min, ranges["R2"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} R2 ke USDC untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapR2ToUsdc(amount, nonce, wallet, provider, config),
      `Swap ${amount} R2 to USDC`,
      network,
      wallet
    );
  }

  const result = await txPromise;
  if (result && result.receipt && result.receipt.status === 1) {
    swapDirection[network] = !currentDirection;
  }
  return result;
}

async function autoSwapR2R2usd(network, wallet) {
  const ranges = randomAmountRanges["SWAP_R2_R2USD"];
  let amount;
  let txPromise;
  let currentDirection = swapDirection["Sepolia R2_R2_R2USD"];

  if (currentDirection) {
    amount = getRandomNumber(ranges["R2"].min, ranges["R2"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} R2 ke R2USD untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapR2ToR2usd(amount, nonce, wallet, provider, config),
      `Swap ${amount} R2 to R2USD`,
      network,
      wallet
    );
  } else {
    amount = getRandomNumber(ranges["R2USD"].min, ranges["R2USD"].max).toFixed(6);
    addLog(`Mencoba swap: ${amount} R2USD ke R2 untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
    txPromise = addTransactionToQueue(
      (nonce, _, provider, config) => swapR2usdToR2(amount, nonce, wallet, provider, config),
      `Swap ${amount} R2USD to R2`,
      network,
      wallet
    );
  }

  const result = await txPromise;
  if (result && result.receipt && result.receipt.status === 1) {
    swapDirection["Sepolia R2_R2_R2USD"] = !currentDirection;
  }
  return result;
}

async function autoStakeR2usdSr2usd(amountR2usd, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountR2usd.toString(), 6);
  const stakingContractAddress = config.STAKING_CONTRACT;

  const r2usdContract = new ethers.Contract(config.R2USD_ADDRESS, ERC20ABI, provider);
  let balance = await r2usdContract.balanceOf(wallet.address);
  balance = BigInt(balance.toString());

  if (balance < amount) throw new Error(`Saldo R2USD tidak cukup: ${ethers.formatUnits(balance, 6)} R2USD`);

  await ensureApproval(config.R2USD_ADDRESS, stakingContractAddress, amount, wallet, network);

  const methodId = "0x1a5f0f00";
  const data = ethers.concat([
    methodId,
    ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint256", "uint256", "uint256", "uint8", "uint256", "uint256"],
      [amount, 0, 0, 0, 0, 0]
    ),
  ]);

  const tx = await wallet.sendTransaction({
    to: stakingContractAddress,
    data: data,
    gasLimit: 100000,
    nonce: nonce,
  });

  return tx;
}

async function autoAddLpR2usdSr2usd(amountR2usd, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountR2usd.toString(), 6);
  const amountSr2usdWei = amount;
  const lpContractAddress = config.LP_R2USD_sR2USD;

  const r2usdContract = new ethers.Contract(config.R2USD_ADDRESS, ERC20ABI, provider);
  const sr2usdContract = new ethers.Contract(config.sR2USD_ADDRESS, ERC20ABI, provider);

  let balanceR2usd = await r2usdContract.balanceOf(wallet.address);
  let balanceSr2usd = await sr2usdContract.balanceOf(wallet.address);
  balanceR2usd = BigInt(balanceR2usd.toString());
  balanceSr2usd = BigInt(balanceSr2usd.toString());

  if (balanceR2usd < amount) throw new Error(`Saldo R2USD tidak cukup: ${ethers.formatUnits(balanceR2usd, 6)} R2USD`);
  if (balanceSr2usd < amountSr2usdWei) throw new Error(`Saldo sR2USD tidak cukup: ${ethers.formatUnits(balanceSr2usd, 6)} sR2USD`);

  await ensureApproval(config.R2USD_ADDRESS, lpContractAddress, amount, wallet, network);
  await ensureApproval(config.sR2USD_ADDRESS, lpContractAddress, amountSr2usdWei, wallet, network);

  const lpContract = new ethers.Contract(lpContractAddress, LP_CONTRACT_ABI, wallet);
  const estimatedLpTokens = await lpContract.calc_token_amount([amountSr2usdWei, amount], true);
  const minMintAmount = BigInt(Math.floor(Number(estimatedLpTokens) * 0.99));

  const tx = await lpContract.add_liquidity([amountSr2usdWei, amount], minMintAmount, wallet.address, { nonce });
  return tx;
}

async function autoAddLpUsdcR2usd(amountUsdc, nonce, wallet, provider, config) {
  const network = config.NETWORK_NAME;
  const amount = ethers.parseUnits(amountUsdc.toFixed(6), 6);
  const amountR2usdWei = amount;
  const lpContractAddress = config.LP_USDC_R2USD;

  const usdcContract = new ethers.Contract(config.USDC_ADDRESS, ERC20ABI, provider);
  const r2usdContract = new ethers.Contract(config.R2USD_ADDRESS, ERC20ABI, provider);

  let balanceUsdc = await usdcContract.balanceOf(wallet.address);
  let balanceR2usd = await r2usdContract.balanceOf(wallet.address);
  balanceUsdc = BigInt(balanceUsdc.toString());
  balanceR2usd = BigInt(balanceR2usd.toString());

  if (balanceUsdc < amount) throw new Error(`Saldo USDC tidak cukup: ${ethers.formatUnits(balanceUsdc, 6)} USDC`);
  if (balanceR2usd < amountR2usdWei) throw new Error(`Saldo R2USD tidak cukup: ${ethers.formatUnits(balanceR2usd, 6)} R2USD`);

  await ensureApproval(config.USDC_ADDRESS, lpContractAddress, amount, wallet, network);
  await ensureApproval(config.R2USD_ADDRESS, lpContractAddress, amountR2usdWei, wallet, network);

  const lpContract = new ethers.Contract(lpContractAddress, LP_USDC_R2USD_ABI, wallet);
  const estimatedLpTokens = await lpContract.calc_token_amount([amountR2usdWei, amount], true);
  const minMintAmount = BigInt(Math.floor(Number(estimatedLpTokens) * 0.99));

  const tx = await lpContract.add_liquidity([amountR2usdWei, amount], minMintAmount, wallet.address, { nonce });
  return tx;
}

async function runAutoAction(actionFunction, actionName, network) {
  promptBox.setFront();
  if (actionName.includes("Stake") || actionName.includes("Add LP")) {
    promptBox.input(`Masukkan jumlah untuk ${actionName} (atau tekan Enter untuk semua wallet)`, "", async (err, value) => {
      promptBox.hide();
      safeRender();
      if (err) {
        addLog(`${actionName}: Input dibatalkan.`, "swap", network);
        return;
      }
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        addLog(`${actionName}: Jumlah harus lebih besar dari 0.`, "swap", network);
        return;
      }

      for (const wallet of wallets) {
        if (runningActions[network][wallet.address] > 0) {
          addLog(`${actionName}: Tidak dapat dimulai untuk wallet ${getShortAddress(wallet.address)} karena ada transaksi berjalan di ${network}.`, "warning", network);
          continue;
        }
        runningActions[network][wallet.address]++;
        swapCancelled[network][wallet.address] = false;
        mainMenu.setItems(getMainMenItems());
        if (network === "Sepolia") {
          sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
        } else {
          sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
        }
        safeRender();

        try {
          if (network === "Sepolia R2") {
            if (actionName === "Auto Add LP R2 & R2USD") {
              await addTransactionToQueue(
                (nonce, _, provider, config) => addLpR2R2usd(amount, amount, nonce, wallet, provider, config),
                `Add LP R2 & R2USD ${amount}`,
                network,
                wallet
              );
            } else if (actionName === "Auto Add LP USDC & R2") {
              await addTransactionToQueue(
                (nonce, _, provider, config) => addLpR2Usdc(amount, amount, nonce, wallet, provider, config),
                `Add LP USDC & R2 ${amount}`,
                network,
                wallet
              );
            }
          } else if (network === "Sepolia") {
            await addTransactionToQueue(
              actionName.includes("Stake")
                ? (nonce, _, provider, config) => autoStakeR2usdSr2usd(amount, nonce, wallet, provider, config)
                : actionName.includes("USDC & R2USD")
                ? (nonce, _, provider, config) => autoAddLpUsdcR2usd(amount, nonce, wallet, provider, config)
                : (nonce, _, provider, config) => autoAddLpR2usdSr2usd(amount, nonce, wallet, provider, config),
              `${actionName} ${amount}`,
              network,
              wallet
            );
          }
          await updateWalletData(network);
          addLog(`${actionName}: Selesai untuk ${amount} (Wallet: ${getShortAddress(wallet.address)}).`, "success", network);
        } catch (error) {
          addLog(`${actionName}: Gagal - ${error.message} (Wallet: ${getShortAddress(wallet.address)})`, "error", network);
        } finally {
          runningActions[network][wallet.address]--;
          mainMenu.setItems(getMainMenItems());
          if (network === "Sepolia") {
            sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
          } else {
            sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
          }
          safeRender();
        }
      }
    });
  } else {
    promptBox.input(`Masukkan jumlah Swap untuk ${actionName} (atau tekan Enter untuk semua wallet)`, "", async (err, value) => {
      promptBox.hide();
      safeRender();
      if (err) {
        addLog(`${actionName}: Input dibatalkan.`, "swap", network);
        return;
      }
      const loopCount = parseInt(value) || 1;
      if (isNaN(loopCount) || loopCount <= 0) {
        addLog(`${actionName}: Jumlah harus berupa angka positif.`, "swap", network);
        return;
      }

      for (const wallet of wallets) {
        if (runningActions[network][wallet.address] > 0) {
          addLog(`${actionName}: Tidak dapat dimulai untuk wallet ${getShortAddress(wallet.address)} karena ada transaksi berjalan di ${network}.`, "warning", network);
          continue;
        }
        runningActions[network][wallet.address]++;
        swapCancelled[network][wallet.address] = false;
        mainMenu.setItems(getMainMenItems());
        if (network === "Sepolia") {
          sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
        } else {
          sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
        }
        safeRender();

        try {
          for (let i = 1; i <= loopCount; i++) {
            if (swapCancelled[network][wallet.address]) {
              addLog(`${actionName}: Dihentikan pada Swap ${i} untuk wallet ${getShortAddress(wallet.address)}.`, "swap", network);
              break;
            }
            addLog(`Memulai Swap ke-${i} untuk wallet ${getShortAddress(wallet.address)}`, "swap", network);
            const success = await actionFunction(network, wallet);
            if (success) await updateWalletData(network);
            if (i < loopCount) {
              const delayTime = getRandomDelay();
              const minutes = Math.floor(delayTime / 60000);
              const seconds = Math.floor((delayTime % 60000) / 1000);
              addLog(`Swap ke-${i} selesai untuk wallet ${getShortAddress(wallet.address)}. Menunggu ${minutes} menit ${seconds} detik.`, "swap", network);
              await waitWithCancel(delayTime, "swap", network, wallet.address);
            }
          }
        } finally {
          runningActions[network][wallet.address]--;
          mainMenu.setItems(getMainMenItems());
          if (network === "Sepolia") {
            sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
          } else {
            sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
          }
          safeRender();
          addLog(`${actionName}: Selesai untuk wallet ${getShortAddress(wallet.address)}.`, "swap", network);
        }
      }
    });
  }
}

async function addTransactionToQueue(transactionFunction, description = "Transaksi", network, wallet) {
  const transactionId = ++transactionIdCounter;
  transactionQueueList.push({
    id: transactionId,
    description,
    timestamp: new Date().toLocaleTimeString(),
    status: "queued",
    wallet: wallet.address,
  });
  addLog(`Transaksi [${transactionId}] ditambahkan ke antrean: ${description} (Wallet: ${getShortAddress(wallet.address)})`, "system", network);
  updateQueueDisplay();

  transactionQueues[wallet.address] = transactionQueues[wallet.address].then(async () => {
    updateTransactionStatus(transactionId, "processing");
    try {
      const config = network === "Sepolia" ? SEPOLIA_CONFIG : SEPOLIA_R2_CONFIG;
      const provider = new ethers.JsonRpcProvider(config.RPC_URL);
      const nonce = await getNextNonce(wallet, provider);

      const tx = await transactionFunction(nonce, wallet, provider, config);
      const txHash = tx.hash;
      addLog(`Transaksi Dikirim. Hash: ${getShortHash(txHash)} (Wallet: ${getShortAddress(wallet.address)})`, "warning", network);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        updateTransactionStatus(transactionId, "completed");
        addLog(`Transaksi Selesai. Hash: ${getShortHash(receipt.transactionHash || txHash)} (Wallet: ${getShortAddress(wallet.address)})`, "success", network);
      } else {
        updateTransactionStatus(transactionId, "failed");
        addLog(`Transaksi [${transactionId}] gagal: Transaksi ditolak oleh kontrak (Wallet: ${getShortAddress(wallet.address)}).`, "error", network);
        nextNonces[wallet.address] = null;
      }
      return { receipt, txHash, tx };
    } catch (error) {
      updateTransactionStatus(transactionId, "error");
      addLog(`Transaksi [${transactionId}] gagal: ${error.message} (Wallet: ${getShortAddress(wallet.address)})`, "error", network);
      nextNonces[wallet.address] = null;
      return null;
    } finally {
      removeTransactionFromQueue(transactionId);
      updateQueueDisplay();
    }
  });
  return transactionQueues[wallet.address];
}

async function getNextNonce(wallet, provider) {
  const address = wallet.address;
  if (nextNonces[address] === null) {
    nextNonces[address] = await provider.getTransactionCount(address, "pending");
  }
  return nextNonces[address]++;
}

async function claimSepoliaFaucetWithDelay({ isDailyClaim = false } = {}) {
  claimRunning = true;
  claimCancelled = false;
  claimFaucetSubMenu.setItems(getClaimFaucetSubMenuItems());
  safeRender();

  await claimFaucet("Sepolia");

  claimRunning = false;
  if (isDailyClaim) {
    addLog("Auto Daily Claim Faucet selesai, menunggu 24 jam.", "swap", "Sepolia");
  } else {
    addLog("Claim Faucet selesai.", "success", "Sepolia");
  }
  claimFaucetSubMenu.setItems(getClaimFaucetSubMenuItems());
  safeRender();
}

function startAutoDailyClaim() {
  if (dailyClaimInterval) {
    addLog("Auto Daily Claim Faucet Sepolia sudah berjalan.", "warning");
    return;
  }
  dailyClaimInterval = setInterval(() => {
    if (!claimRunning) claimSepoliaFaucetWithDelay({ isDailyClaim: true });
  }, 86400000);
  claimSepoliaFaucetWithDelay({ isDailyClaim: true });
  addLog("Auto Daily Claim Faucet Sepolia dimulai.", "system");
}

function stopAutoDailyClaim() {
  if (dailyClaimInterval) {
    clearInterval(dailyClaimInterval);
    dailyClaimInterval = null;
    addLog("Auto Daily Claim Faucet Sepolia dihentikan.", "system");
  }
  if (claimRunning) {
    claimCancelled = true;
    addLog("Proses claim faucet dihentikan.", "system");
  }
  claimFaucetSubMenu.setItems(getClaimFaucetSubMenuItems());
  safeRender();
}

async function claimFaucet(network) {
  try {
    const channelId = NETWORK_CHANNEL_IDS[network];
    if (!channelId) throw new Error(`Jaringan ${network} tidak didukung.`);

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      const discordToken = walletData[i].discordToken;

      if (!discordToken) {
        addLog(`No Discord token found for wallet ${getShortAddress(wallet.address)}.`, "error", network);
        continue;
      }

      const userId = await fetchMyUserId(discordToken);
      const payload = {
        type: 2,
        application_id: APP_ID,
        guild_id: GUILD_ID,
        channel_id: channelId,
        session_id: uuid(),
        data: {
          version: COMMAND_VERSION,
          id: COMMAND_ID,
          name: "faucet",
          type: 1,
          options: [{ type: 3, name: "address", value: wallet.address }],
        },
        nonce: Date.now().toString(),
      };
      const form = new FormData();
      form.append("payload_json", JSON.stringify(payload));

      await axios.post("https://discord.com/api/v9/interactions", form, {
        headers: { Authorization: discordToken, ...form.getHeaders() },
      });
      addLog(`Command Claiming Faucet Sent for wallet ${getShortAddress(wallet.address)}`, "swap", network);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.get(
        `https://discord.com/api/v9/channels/${channelId}/messages?limit=10`,
        { headers: { Authorization: discordToken } }
      );
      const messages = res.data;
      const myResponse = messages.find((m) => m.author.id === APP_ID && m.interaction?.user?.id === userId);

      if (!myResponse) {
        addLog(`No Response Claiming ${network} for wallet ${getShortAddress(wallet.address)}.`, "warning", network);
        continue;
      }

      const txt = myResponse.content || "";
      if (txt.includes("successfully")) {
        addLog(`Claiming Faucet ${network} Successfully for wallet ${getShortAddress(wallet.address)}`, "success", network);
      } else if (txt.toLowerCase().includes("claim failed")) {
        addLog(`${txt.split("\n")[0]} for wallet ${getShortAddress(wallet.address)}`, "warning", network);
      } else {
        addLog(`Unknown Status Claim at ${network} for wallet ${getShortAddress(wallet.address)}: ${txt}`, "system", network);
      }
    }
  } catch (error) {
    addLog(`Error in claimFaucet: ${error.message}`, "error", network);
  }
}

function updateTransactionStatus(id, status) {
  transactionQueueList.forEach((tx) => {
    if (tx.id === id) tx.status = status;
  });
  updateQueueDisplay();
}

function removeTransactionFromQueue(id) {
  transactionQueueList = transactionQueueList.filter((tx) => tx.id !== id);
  updateQueueDisplay();
}

function getTransactionQueueContent() {
  if (transactionQueueList.length === 0) return "Tidak ada transaksi dalam antrean.";
  return transactionQueueList
    .map((tx) => `ID: ${tx.id} | ${tx.description} | ${tx.status} | ${tx.timestamp} | Wallet: ${getShortAddress(tx.wallet)}`)
    .join("\n");
}

let queueMenuBox = null;
let queueUpdateInterval = null;

function showTransactionQueueMenu() {
  const container = blessed.box({
    label: " Antrian Transaksi ",
    top: "10%",
    left: "center",
    width: "80%",
    height: "80%",
    border: { type: "line" },
    style: { border: { fg: "blue" } },
    keys: true,
    mouse: true,
    interactive: true,
  });
  const contentBox = blessed.box({
    top: 0,
    left: 0,
    width: "100%",
    height: "90%",
    content: getTransactionQueueContent(),
    scrollable: true,
    keys: true,
    mouse: true,
    alwaysScroll: true,
    scrollbar: { ch: " ", inverse: true, style: { bg: "blue" } },
  });
  const exitButton = blessed.button({
    content: " [Keluar] ",
    bottom: 0,
    left: "center",
    shrink: true,
    padding: { left: 1, right: 1 },
    style: { fg: "white", bg: "red", hover: { bg: "blue" } },
    mouse: true,
    keys: true,
    interactive: true,
  });
  exitButton.on("press", () => {
    addLog("Keluar Dari Menu Antrian Transaksi.", "system", currentNetwork);
    clearInterval(queueUpdateInterval);
    container.destroy();
    queueMenuBox = null;
    mainMenu.show();
    mainMenu.focus();
    screen.render();
  });
  container.append(contentBox);
  container.append(exitButton);
  queueUpdateInterval = setInterval(() => {
    contentBox.setContent(getTransactionQueueContent());
    screen.render();
  }, 1000);
  mainMenu.hide();
  screen.append(container);
  container.focus();
  screen.render();
}

function updateQueueDisplay() {
  if (queueMenuBox) {
    queueMenuBox.setContent(getTransactionQueueContent());
    screen.render();
  }
}

const screen = blessed.screen({
  smartCSR: true,
  title: "R2 Auto Bot",
  fullUnicode: true,
  mouse: true,
});

let renderTimeout;

function safeRender() {
  if (renderTimeout) clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => {
    screen.render();
  }, 50);
}

const headerBox = blessed.box({
  top: 0,
  left: "center",
  width: "100%",
  tags: true,
  style: { fg: "white", bg: "default" },
});

figlet.text("NT EXHAUST".toUpperCase(), { font: "ANSI Shadow" }, (err, data) => {
  if (err) headerBox.setContent("{center}{bold}NT EXHAUST{/bold}{/center}");
  else headerBox.setContent(`{center}{bold}{bright-cyan-fg}${data}{/bright-cyan-fg}{/bold}{/center}`);
  safeRender();
});

const descriptionBox = blessed.box({
  left: "center",
  width: "100%",
  content: "{center}{bold}{grey-fg}________________________________________________________________________{/grey-fg}{/bold}{/center}",
  tags: true,
  style: { fg: "white", bg: "default" },
});

const logsBox = blessed.box({
  label: " Transaction Logs ",
  left: 0,
  border: { type: "line" },
  scrollable: true,
  alwaysScroll: true,
  mouse: true,
  keys: true,
  vi: true,
  tags: true,
  style: { border: { fg: "yellow" }, fg: "white" },
  scrollbar: { ch: " ", inverse: true, style: { bg: "blue" } },
  content: "",
});

const welcomeBox = blessed.box({
  label: " Dashboard ",
  border: { type: "line" },
  tags: true,
  style: { border: { fg: "cyan" }, fg: "white", bg: "default" },
  content: "{center}{bold}Initializing...{/bold}{/center}",
});

const walletBox = blessed.box({
  label: " Informasi Wallet ",
  border: { type: "line" },
  tags: true,
  style: { border: { fg: "magenta" }, fg: "white", bg: "default" },
  content: "Loading data wallet...",
});

walletBox.hide();

const mainMenu = blessed.list({
  label: " Menu ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg:foot: "green", fg: "black" } },
  items: getMainMenItems(),
});

function getMainMenItems() {
  let items = [];
  if (Object.values(runningActions[currentNetwork]).some((count) => count > 0)) {
    items.push("Stop Transaction");
  }
  items = items.concat([
    "Select Wallet",
    "Sepolia Network",
    "Sepolia R2 Network",
    "Claim Faucet",
    "Antrian Transaksi",
    "Clear Transaction Logs",
    "Refresh",
    "Exit",
  ]);
  return items;
}

function getSepoliaSubMenuItems() {
  let items = [];
  if (Object.values(runningActions["Sepolia"]).some((count) => count > 0)) {
    items.push("Stop Transaction");
  }
  items = items.concat([
    "Auto Swap R2USD & USDC",
    "Auto Stake R2USD & sR2USD",
    "Auto Add LP R2USD & sR2USD",
    "Auto Add LP USDC & R2USD",
    "Manual Swap",
    "Change Random Amount",
    "Clear Transaction Logs",
    "Back To Main Menu",
    "Refresh",
  ]);
  return items;
}

function getSepoliaR2SubMenuItems() {
  let items = [];
  if (Object.values(runningActions["Sepolia R2"]).some((count) => count > 0)) {
    items.push("Stop Transaction");
  }
  items = items.concat([
    "Auto Swap R2 & USDC",
    "Auto Swap R2 & R2USD",
    "Auto Add LP R2 & R2USD",
    "Auto Add LP USDC & R2",
    "Manual Swap",
    "Change Random Amount",
    "Clear Transaction Logs",
    "Back To Main Menu",
    "Refresh",
  ]);
  return items;
}

function getClaimFaucetSubMenuItems() {
  const items = [
    "Claim Faucet Sepolia",
    "Auto Daily Claim Faucet Sepolia",
    "Clear Transaction Logs",
    "Refresh",
    "Back to Main Menu",
  ];
  if (dailyClaimInterval) items.splice(1, 0, "Stop Auto Daily Claim");
  else if (claimRunning) items.splice(1, 0, "Stop Proses");
  return items;
}

const sepoliaSubMenu = blessed.list({
  label: " Sepolia Network Sub Menu ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg: "cyan", fg: "black" } },
  items: getSepoliaSubMenuItems(),
});
sepoliaSubMenu.hide();

const sepoliaR2SubMenu = blessed.list({
  label: " Sepolia R2 Network Sub Menu ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg: "cyan", fg: "black" } },
  items: getSepoliaR2SubMenuItems(),
});
sepoliaR2SubMenu.hide();

const claimFaucetSubMenu = blessed.list({
  label: " Claim Faucet ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg: "cyan", fg: "black" } },
  items: getClaimFaucetSubMenuItems(),
});
claimFaucetSubMenu.hide();

const sepoliaManualSwapSubMenu = blessed.list({
  label: " Manual Swap ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg: "cyan", fg: "black" } },
});
sepoliaManualSwapSubMenu.hide();

const sepoliaChangeRandomAmountSubMenu = blessed.list({
  label: " Change Random Amount ",
  left: "60%",
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: { type: "line" },
  style: { fg: "white", bg: "default", border: { fg: "red" }, selected: { bg: "cyan", fg: "black" } },
  items: ["SWAP_R2USD_USDC", "SWAP_R2_USDC", "SWAP_R2_R2USD", "Back To Sepolia Network Menu"],
});
sepoliaChangeRandomAmountSubMenu.hide();

const promptBox = blessed.prompt({
  parent: screen,
  border: "line",
  height: 5,
  width: "60%",
  top: "center",
  left: "center",
  label: "{bright-blue-fg}Prompt{/bright-blue-fg}",
  tags: true,
  keys: true,
  vi: true,
  mouse: true,
  style: { fg: "bright-red", bg: "default", border: { fg: "red" } },
});

screen.append(headerBox);
screen.append(descriptionBox);
screen.append(logsBox);
screen.append(welcomeBox);
screen.append(walletBox);
screen.append(mainMenu);
screen.append(sepoliaSubMenu);
screen.append(sepoliaR2SubMenu);
screen.append(claimFaucetSubMenu);
screen.append(sepoliaManualSwapSubMenu);
screen.append(sepoliaChangeRandomAmountSubMenu);

function updateWelcomeBox() {
  const botVersion = "FINAL TESTNET V1.0.0";
  const content =
    `{center}{bold}{bright-red-fg}[:: R2 :: AUTO :: BOT ::]{/bright-red-fg}{/bold}{/center}\n\n` +
    `{center}{bold}{bright-yellow-fg}Version :-sn: ${botVersion}{/bright-yellow-fg}{/bold}{/center}\n` +
    `{center}{bold}{bright-cyan-fg}➥ Join Telegram : t.me/NTExhaust{/bright-cyan-fg}{/bold}{/center}\n` +
    `{center}{bold}{bright-cyan-fg}➥ Subscribe : Youtube.com/@NTExhaust{/bright-cyan-fg}{/bold}{/center}\n` +
    `{center}{bold}{grey-fg}Donate : saweria.co/vinsenzo{/grey-fg}{/bold}{/center}\n`;
  welcomeBox.setContent(content);
  safeRender();
}

function adjustLayout() {
  const screenHeight = screen.height;
  const screenWidth = screen.width;
  const headerHeight = Math.max(8, Math.floor(screenHeight * 0.15));
  headerBox.top = 0;
  headerBox.height = headerHeight;
  headerBox.width = "100%";
  descriptionBox.top = "23%";
  descriptionBox.height = Math.floor(screenHeight * 0.05);
  logsBox.top = headerHeight + descriptionBox.height;
  logsBox.left = 0;
  logsBox.width = Math.floor(screenWidth * 0.6);
  logsBox.height = screenHeight - (headerHeight + descriptionBox.height);
  welcomeBox.top = headerHeight + descriptionBox.height;
  welcomeBox.left = Math.floor(screenWidth * 0.6);
  welcomeBox.width = Math.floor(screenWidth * 0.4);
  welcomeBox.height = Math.floor(screenHeight * 0.35);
  walletBox.top = headerHeight + descriptionBox.height;
  walletBox.left = Math.floor(screenWidth * 0.6);
  walletBox.width = Math.floor(screenWidth * 0.4);
  walletBox.height = Math.floor(screenHeight * 0.35);
  mainMenu.top = headerHeight + descriptionBox.height + welcomeBox.height;
  mainMenu.left = Math.floor(screenWidth * 0.6);
  mainMenu.width = Math.floor(screenWidth * 0.4);
  mainMenu.height = screenHeight - (headerHeight + descriptionBox.height + welcomeBox.height);
  sepoliaSubMenu.top = mainMenu.top;
  sepoliaSubMenu.left = mainMenu.left;
  sepoliaSubMenu.width = mainMenu.width;
  sepoliaSubMenu.height = mainMenu.height;
  sepoliaR2SubMenu.top = mainMenu.top;
  sepoliaR2SubMenu.left = mainMenu.left;
  sepoliaR2SubMenu.width = mainMenu.width;
  sepoliaR2SubMenu.height = mainMenu.height;
  claimFaucetSubMenu.top = mainMenu.top;
  claimFaucetSubMenu.left = mainMenu.left;
  claimFaucetSubMenu.width = mainMenu.width;
  claimFaucetSubMenu.height = mainMenu.height;
  sepoliaManualSwapSubMenu.top = mainMenu.top;
  sepoliaManualSwapSubMenu.left = mainMenu.left;
  sepoliaManualSwapSubMenu.width = mainMenu.width;
  sepoliaManualSwapSubMenu.height = mainMenu.height;
  sepoliaChangeRandomAmountSubMenu.top = mainMenu.top;
  sepoliaChangeRandomAmountSubMenu.left = mainMenu.left;
  sepoliaChangeRandomAmountSubMenu.width = mainMenu.width;
  sepoliaChangeRandomAmountSubMenu.height = mainMenu.height;
}

adjustLayout();

mainMenu.on("select", (item) => {
  const selected = item.getText();
  if (selected === "Select Wallet") {
    promptBox.setFront();
    promptBox.input(`Masukkan nomor wallet (1-${walletAddresses.length})`, "", (err, value) => {
      promptBox.hide();
      safeRender();
      if (err || !value) {
        addLog("Select Wallet: Input dibatalkan.", "system", currentNetwork);
        return;
      }
      const index = parseInt(value) - 1;
      if (isNaN(index) || index < 0 || index >= walletAddresses.length) {
        addLog("Select Wallet: Nomor wallet tidak valid.", "error", currentNetwork);
        return;
      }
      currentWalletIndex = index;
            updateWallet();
      addLog(`Wallet diubah ke ${getShortAddress(walletAddresses[currentWalletIndex])} (Wallet ${currentWalletIndex + 1})`, "system", currentNetwork);
    });
  } else if (selected === "Sepolia Network") {
    currentNetwork = "Sepolia";
    mainMenu.hide();
    sepoliaSubMenu.show();
    sepoliaSubMenu.focus();
    updateWallet();
    addLog("Beralih ke Sepolia Network.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Sepolia R2 Network") {
    currentNetwork = "Sepolia R2";
    mainMenu.hide();
    sepoliaR2SubMenu.show();
    sepoliaR2SubMenu.focus();
    updateWallet();
    addLog("Beralih ke Sepolia R2 Network.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Claim Faucet") {
    mainMenu.hide();
    claimFaucetSubMenu.show();
    claimFaucetSubMenu.focus();
    addLog("Beralih ke Menu Claim Faucet.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Antrian Transaksi") {
    queueMenuBox = showTransactionQueueMenu();
  } else if (selected === "Clear Transaction Logs") {
    clearTransactionLogs();
  } else if (selected === "Stop Transaction") {
    walletAddresses.forEach((address) => {
      swapCancelled[currentNetwork][address] = true;
    });
    addLog("Semua transaksi dihentikan.", "system", currentNetwork);
    mainMenu.setItems(getMainMenItems());
    safeRender();
  } else if (selected === "Refresh") {
    updateWalletData(currentNetwork);
    addLog("Memperbarui data wallet.", "system", currentNetwork);
  } else if (selected === "Exit") {
    addLog("Keluar dari aplikasi.", "system", currentNetwork);
    screen.destroy();
    process.exit(0);
  }
});

sepoliaSubMenu.on("select", (item) => {
  const selected = item.getText();
  if (selected === "Auto Swap R2USD & USDC") {
    runAutoAction(autoSwapR2usdUsdc, "Auto Swap R2USD & USDC", "Sepolia");
  } else if (selected === "Auto Stake R2USD & sR2USD") {
    runAutoAction(autoStakeR2usdSr2usd, "Auto Stake R2USD & sR2USD", "Sepolia");
  } else if (selected === "Auto Add LP R2USD & sR2USD") {
    runAutoAction(autoAddLpR2usdSr2usd, "Auto Add LP R2USD & sR2USD", "Sepolia");
  } else if (selected === "Auto Add LP USDC & R2USD") {
    runAutoAction(autoAddLpUsdcR2usd, "Auto Add LP USDC & R2USD", "Sepolia");
  } else if (selected === "Manual Swap") {
    sepoliaSubMenu.hide();
    sepoliaManualSwapSubMenu.setItems([
      "Swap USDC to R2USD",
      "Swap R2USD to USDC",
      "Back To Sepolia Network Menu",
    ]);
    sepoliaManualSwapSubMenu.show();
    sepoliaManualSwapSubMenu.focus();
    addLog("Beralih ke Menu Manual Swap.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Change Random Amount") {
    sepoliaSubMenu.hide();
    sepoliaChangeRandomAmountSubMenu.show();
    sepoliaChangeRandomAmountSubMenu.focus();
    addLog("Beralih ke Menu Change Random Amount.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Clear Transaction Logs") {
    clearTransactionLogs();
  } else if (selected === "Stop Transaction") {
    walletAddresses.forEach((address) => {
      swapCancelled["Sepolia"][address] = true;
    });
    addLog("Semua transaksi dihentikan di Sepolia.", "system", "Sepolia");
    sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
    safeRender();
  } else if (selected === "Back To Main Menu") {
    sepoliaSubMenu.hide();
    mainMenu.show();
    mainMenu.focus();
    addLog("Kembali ke Main Menu.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Refresh") {
    updateWalletData("Sepolia");
    addLog("Memperbarui data wallet untuk Sepolia.", "system", "Sepolia");
  }
});

sepoliaR2SubMenu.on("select", (item) => {
  const selected = item.getText();
  if (selected === "Auto Swap R2 & USDC") {
    runAutoAction(autoSwapR2Usdc, "Auto Swap R2 & USDC", "Sepolia R2");
  } else if (selected === "Auto Swap R2 & R2USD") {
    runAutoAction(autoSwapR2R2usd, "Auto Swap R2 & R2USD", "Sepolia R2");
  } else if (selected === "Auto Add LP R2 & R2USD") {
    runAutoAction(autoAddLpR2R2usd, "Auto Add LP R2 & R2USD", "Sepolia R2");
  } else if (selected === "Auto Add LP USDC & R2") {
    runAutoAction(autoAddLpR2Usdc, "Auto Add LP USDC & R2", "Sepolia R2");
  } else if (selected === "Manual Swap") {
    sepoliaR2SubMenu.hide();
    sepoliaManualSwapSubMenu.setItems([
      "Swap R2 to USDC",
      "Swap USDC to R2",
      "Swap R2 to R2USD",
      "Swap R2USD to R2",
      "Back To Sepolia R2 Network Menu",
    ]);
    sepoliaManualSwapSubMenu.show();
    sepoliaManualSwapSubMenu.focus();
    addLog("Beralih ke Menu Manual Swap.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Change Random Amount") {
    sepoliaR2SubMenu.hide();
    sepoliaChangeRandomAmountSubMenu.show();
    sepoliaChangeRandomAmountSubMenu.focus();
    addLog("Beralih ke Menu Change Random Amount.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Clear Transaction Logs") {
    clearTransactionLogs();
  } else if (selected === "Stop Transaction") {
    walletAddresses.forEach((address) => {
      swapCancelled["Sepolia R2"][address] = true;
    });
    addLog("Semua transaksi dihentikan di Sepolia R2.", "system", "Sepolia R2");
    sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
    safeRender();
  } else if (selected === "Back To Main Menu") {
    sepoliaR2SubMenu.hide();
    mainMenu.show();
    mainMenu.focus();
    addLog("Kembali ke Main Menu.", "system", currentNetwork);
    safeRender();
  } else if (selected === "Refresh") {
    updateWalletData("Sepolia R2");
    addLog("Memperbarui data wallet untuk Sepolia R2.", "system", "Sepolia R2");
  }
});

sepoliaManualSwapSubMenu.on("select", (item) => {
  const selected = item.getText();
  const network = currentNetwork;
  const config = network === "Sepolia" ? SEPOLIA_CONFIG : SEPOLIA_R2_CONFIG;
  const provider = new ethers.JsonRpcProvider(config.RPC_URL);
  const wallet = wallets[currentWalletIndex];

  if (selected.includes("Back")) {
    sepoliaManualSwapSubMenu.hide();
    if (network === "Sepolia") {
      sepoliaSubMenu.show();
      sepoliaSubMenu.focus();
    } else {
      sepoliaR2SubMenu.show();
      sepoliaR2SubMenu.focus();
    }
    addLog("Kembali ke Menu Network.", "system", network);
    safeRender();
    return;
  }

  promptBox.setFront();
  promptBox.input(`Masukkan jumlah untuk ${selected}`, "", async (err, value) => {
    promptBox.hide();
    safeRender();
    if (err || !value) {
      addLog(`${selected}: Input dibatalkan.`, "swap", network);
      return;
    }
    const amount = parseFloat(value);
    if (isNaN(amount) || amount <= 0) {
      addLog(`${selected}: Jumlah harus lebih besar dari 0.`, "swap", network);
      return;
    }

    try {
      runningActions[network][wallet.address]++;
      swapCancelled[network][wallet.address] = false;
      mainMenu.setItems(getMainMenItems());
      if (network === "Sepolia") {
        sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
      } else {
        sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
      }
      safeRender();

      let txPromise;
      if (selected === "Swap USDC to R2USD") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapUsdcToR2usd(amount, nonce, wallet, provider, config),
          `Swap ${amount} USDC to R2USD`,
          network,
          wallet
        );
      } else if (selected === "Swap R2USD to USDC") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapR2usdToUsdc(amount, nonce, wallet, provider, config),
          `Swap ${amount} R2USD to USDC`,
          network,
          wallet
        );
      } else if (selected === "Swap R2 to USDC") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapR2ToUsdc(amount, nonce, wallet, provider, config),
          `Swap ${amount} R2 to USDC`,
          network,
          wallet
        );
      } else if (selected === "Swap USDC to R2") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapUsdcToR2(amount, nonce, wallet, provider, config),
          `Swap ${amount} USDC to R2`,
          network,
          wallet
        );
      } else if (selected === "Swap R2 to R2USD") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapR2ToR2usd(amount, nonce, wallet, provider, config),
          `Swap ${amount} R2 to R2USD`,
          network,
          wallet
        );
      } else if (selected === "Swap R2USD to R2") {
        txPromise = addTransactionToQueue(
          (nonce, _, provider, config) => swapR2usdToR2(amount, nonce, wallet, provider, config),
          `Swap ${amount} R2USD to R2`,
          network,
          wallet
        );
      }

      await txPromise;
      await updateWalletData(network);
      addLog(`${selected}: Selesai untuk ${amount} (Wallet: ${getShortAddress(wallet.address)}).`, "success", network);
    } catch (error) {
      addLog(`${selected}: Gagal - ${error.message} (Wallet: ${getShortAddress(wallet.address)})`, "error", network);
    } finally {
      runningActions[network][wallet.address]--;
      mainMenu.setItems(getMainMenItems());
      if (network === "Sepolia") {
        sepoliaSubMenu.setItems(getSepoliaSubMenuItems());
      } else {
        sepoliaR2SubMenu.setItems(getSepoliaR2SubMenuItems());
      }
      safeRender();
    }
  });
});

sepoliaChangeRandomAmountSubMenu.on("select", (item) => {
  const selected = item.getText();
  if (selected === "Back To Sepolia Network Menu") {
    sepoliaChangeRandomAmountSubMenu.hide();
    if (currentNetwork === "Sepolia") {
      sepoliaSubMenu.show();
      sepoliaSubMenu.focus();
    } else {
      sepoliaR2SubMenu.show();
      sepoliaR2SubMenu.focus();
    }
    addLog("Kembali ke Menu Network.", "system", currentNetwork);
    safeRender();
    return;
  }

  promptBox.setFront();
  promptBox.input(`Masukkan rentang untuk ${selected} (format: min,max)`, "", (err, value) => {
    promptBox.hide();
    safeRender();
    if (err || !value) {
      addLog(`${selected}: Input dibatalkan.`, "system", currentNetwork);
      return;
    }
    const [min, max] = value.split(",").map((v) => parseFloat(v.trim()));
    if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
      addLog(`${selected}: Rentang tidak valid. Harus dalam format min,max dengan min >= 0 dan max > min.`, "error", currentNetwork);
      return;
    }

    if (selected === "SWAP_R2USD_USDC") {
      randomAmountRanges[selected].USDC.min = min;
      randomAmountRanges[selected].USDC.max = max;
      randomAmountRanges[selected].R2USD.min = min;
      randomAmountRanges[selected].R2USD.max = max;
    } else if (selected === "SWAP_R2_USDC") {
      randomAmountRanges[selected].R2.min = min;
      randomAmountRanges[selected].R2.max = max;
      randomAmountRanges[selected].USDC.min = min;
      randomAmountRanges[selected].USDC.max = max;
    } else if (selected === "SWAP_R2_R2USD") {
      randomAmountRanges[selected].R2.min = min;
      randomAmountRanges[selected].R2.max = max;
      randomAmountRanges[selected].R2USD.min = min;
      randomAmountRanges[selected].R2USD.max = max;
    }

    addLog(`Rentang untuk ${selected} diubah menjadi min: ${min}, max: ${max}`, "success", currentNetwork);
  });
});

claimFaucetSubMenu.on("select", (item) => {
  const selected = item.getText();
  if (selected === "Claim Faucet Sepolia") {
    claimSepoliaFaucetWithDelay();
  } else if (selected === "Auto Daily Claim Faucet Sepolia") {
    startAutoDailyClaim();
  } else if (selected === "Stop Auto Daily Claim") {
    stopAutoDailyClaim();
  } else if (selected === "Stop Proses") {
    claimCancelled = true;
    addLog("Proses claim faucet dihentikan.", "system", currentNetwork);
    claimFaucetSubMenu.setItems(getClaimFaucetSubMenuItems());
    safeRender();
  } else if (selected === "Clear Transaction Logs") {
    clearTransactionLogs();
  } else if (selected === "Refresh") {
    updateWalletData(currentNetwork);
    addLog("Memperbarui data wallet.", "system", currentNetwork);
  } else if (selected === "Back to Main Menu") {
    claimFaucetSubMenu.hide();
    mainMenu.show();
    mainMenu.focus();
    addLog("Kembali ke Main Menu.", "system", currentNetwork);
    safeRender();
  }
});

screen.key(["q", "C-c"], () => {
  addLog("Keluar dari aplikasi.", "system", currentNetwork);
  screen.destroy();
  process.exit(0);
});

screen.key(["left", "right"], (ch, key) => {
  const newIndex = key.name === "left" ? currentWalletIndex - 1 : currentWalletIndex + 1;
  if (newIndex >= 0 && newIndex < walletAddresses.length) {
    currentWalletIndex = newIndex;
    updateWallet();
    addLog(`Wallet diubah ke ${getShortAddress(walletAddresses[currentWalletIndex])} (Wallet ${currentWalletIndex + 1})`, "system", currentNetwork);
  }
});

screen.on("resize", () => {
  adjustLayout();
  safeRender();
});

async function initialize() {
  await Promise.all([updateWalletData("Sepolia"), updateWalletData("Sepolia R2")]);
  welcomeBox.hide();
  walletBox.show();
  mainMenu.focus();
  updateWelcomeBox();
  safeRender();
}

initialize();
