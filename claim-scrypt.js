document.addEventListener('DOMContentLoaded', async function () {
    // Check if the user is connected to MetaMask
    if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;

        // Initialize web3 with MetaMask
        const web3 = new Web3(ethereum);

        // Initialize smart contract
        const contractAddress = '0xd84a23865A73Ba45a593B9F476df65F3cF783A97'; // Your smart contract address
        const contractABI = [
            // ... (ABI definitions)
        ];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Claim button functionality
        const claimButton = document.getElementById('claim-button');
        claimButton.addEventListener('click', async () => {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const senderAddress = accounts[0];
                const gasEstimate = await contract.methods.claimAirdrop().estimateGas({ from: senderAddress, value: web3.utils.toWei('0.003', 'ether') });
                const claimResult = await contract.methods.claimAirdrop().send({ from: senderAddress, value: web3.utils.toWei('0.003', 'ether'), gas: gasEstimate });

                alert('Airdrop claimed successfully!');
            } catch (error) {
                console.error(error);
                alert('Failed to claim airdrop.');
            }
        });
    } else {
        alert('MetaMask is not detected. Please install it to claim the airdrop.');
    }
});
