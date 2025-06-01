const manifestUrl = 'https://kmt-dev-panel.github.io/KMT-Token/tonconnect-manifest.json';
const connector = new TonConnect.TonConnect({ manifestUrl });

async function initWalletConnection() {
  const connectWalletBtn = document.getElementById('connect-wallet');
  
  // Check if already connected
  if (connector.connected) {
    updateWalletInfo();
  }

  // Subscribe to connection status changes
  connector.onStatusChange((wallet) => {
    if (wallet) {
      updateWalletInfo();
    } else {
      connectWalletBtn.textContent = 'Connect Wallet';
    }
  });

  // Connect wallet button click handler
  connectWalletBtn.addEventListener('click', async () => {
    if (connector.connected) {
      await connector.disconnect();
      return;
    }

    const wallets = await connector.getWallets();
    const walletConnectionSource = {
      jsBridgeKey: 'tonconnect'
    };

    connector.connect(wallets, walletConnectionSource);
  });

  // Copy buttons functionality
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}

function updateWalletInfo() {
  const connectWalletBtn = document.getElementById('connect-wallet');
  const wallet = connector.connected;
  
  if (wallet) {
    const shortAddress = `${wallet.account.address.slice(0, 4)}...${wallet.account.address.slice(-4)}`;
    connectWalletBtn.textContent = `Connected: ${shortAddress}`;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initWalletConnection);
