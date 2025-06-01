document.addEventListener('DOMContentLoaded', () => {
      const manifestUrl = 'https://kmt-dev-panel.github.io/KMT-Token/tonconnect-manifest.json';
      const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: manifestUrl,
        buttonRootId: 'ton-connect-button'
      });

      const walletStatus = document.getElementById('wallet-status');
      const walletAddress = document.getElementById('wallet-address');

      // Subscribe to wallet connection status changes
      tonConnectUI.onStatusChange(
        wallet => {
          if (wallet) {
            walletStatus.textContent = `وضعیت: متصل به ${wallet.device.appName}`;
            walletAddress.textContent = `آدرس: ${wallet.account.address}`;
          } else {
            walletStatus.textContent = 'وضعیت: قطع اتصال';
            walletAddress.textContent = '';
          }
        },
        // Optional: add an error handler
        (error) => {
          console.error(error);
          walletStatus.textContent = 'خطا در اتصال کیف‌پول';
          walletAddress.textContent = '';
        }
      );

      // Initial status check
      const currentWallet = tonConnectUI.wallet;
      if (currentWallet) {
        walletStatus.textContent = `وضعیت: متصل به ${currentWallet.device.appName}`;
        walletAddress.textContent = `آدرس: ${currentWallet.account.address}`;
      } else {
        walletStatus.textContent = 'وضعیت: قطع اتصال';
        walletAddress.textContent = '';
      }

      // You can also manually trigger connection/disconnection if not using the default button
      // Example:
      // document.getElementById('connect-button').addEventListener('click', () => {
      //   tonConnectUI.connectWallet();
      // });
      // document.getElementById('disconnect-button').addEventListener('click', () => {
      //   tonConnectUI.disconnect();
      // });
    });
