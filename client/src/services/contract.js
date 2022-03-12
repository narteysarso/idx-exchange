import contractAbi from "../contract/IDXExchangeContract.json";
import { ethers, utils } from "ethers";

const abi = contractAbi.abi;
const CONTRACT_ADDRESS = "0xc0261db47d865ECba2AE705F1bAea1BADfdADF45";

export function getContract() {
    if (!window.ethereum) {
        throw new Error("Please Install MetaMask extension on your browser");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    //add event listener for wallet/network changes.

    return contract;
}

export async function getAccount() {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!accounts.length) {
        throw new Error("Please create account on your wallet");
    }

    return accounts[0];
}


export async function getTokenName() {
    const contract = getContract();
    return await contract.name();
}

export async function getSymbol() {
    const contract = getContract();
    return await contract.symbol();
}

export function getContractAddress() {
    const contract = getContract();
    return contract.address;
}

export async function getAccountTokenBalance(account) {
    const contract = getContract();

    const balance = await contract.balanceOf(account);

    return utils.formatEther(balance);
}

export async function getOwner() {
    const contract = getContract();
    const ownerAddress = await contract.owner();
    return ownerAddress;
}

export async function getTotalSupply() {
    const contract = getContract();
    const totalSupply = await contract.totalSupply();

    return utils.formatEther(totalSupply);
}


export async function convertToTokens(amount) {
    const contract = getContract();

    const result = await contract.convertToTokens(utils.parseEther(amount));

    const tokens = utils.formatEther(result);

    return tokens;
}

export async function getTotalVolume() {
    const contract = getContract();
    const totalVolume = await contract.totalVolume();

    return utils.formatEther(totalVolume);
}

export async function transferToken(address, amount) {
    const contract = getContract();
    const txn = await contract.transfer(address, utils.parseEther(amount));
    const result = await txn.wait();

    return result;

}

export async function buyToken(amount) {
    const contract = getContract();
    const amountInWei = utils.parseEther(amount);
    const txn = await contract.buyToken({ value: amountInWei });
    const result = await txn.wait();
    return result;
}

export async function burnToken(amount) {
    const contract = getContract();
    const txn = await contract.burn(utils.parseEther(amount));
    const result = await txn.wait();
    return result;
}

export async function mintToken(amount) {
    const contract = getContract();
    const tokenOwner = await contract.owner();
    const txn = await contract.mint(tokenOwner, utils.parseEther(amount));
    const result = await txn.wait();
    return result;
}

export async function getOrders({ from = null, tokens = null, timestamp = null } = {}) {
    const contract = getContract();

    const topics = contract.filters.tokenPurchase(await getAccount(), from, tokens);

    const eventsLog = await contract.queryFilter(topics)

    
    const tokenPurchases = (
        timestamp ?
            eventsLog.filter(event =>   event.args.timestamp.gt(timestamp[0]) && event.args.timestamp.lt(timestamp[1])) :
            eventsLog
    ).map((event, idx) => ({id: idx, ...event.args, amount: utils.formatEther(event.args.amount), tokens: utils.formatEther(event.args.tokens), type: 'Purchase' }));

    return tokenPurchases.reverse();

}
export async function getTransfers({ to = null, from = null, value = null } = {}) {
    const contract = getContract();
    to = to || [await getAccount()];
    from = from || [await getAccount()];

    const toTopics = contract.filters.Transfer(null, to, value);
    const fromTopics = contract.filters.Transfer(from, null, value);

    const [fromEvents, toEvents] = await Promise.all([contract.queryFilter(fromTopics), contract.queryFilter(toTopics)]);


    const tokenPurchases = [...fromEvents, ...toEvents].map(event => ({ ...event.args, amount: '--', tokens: utils.formatEther(event.args.value), type: 'Transfer' }));

    return tokenPurchases.reverse();

}


export async function getHistory({ to = null, from = null, tokens = null, amount = null, timestamp = null, status = null } = {}) {
    const [transferEvents, orderEvents] = await Promise.all([getOrders({ from, tokens, amount, timestamp, status }), getTransfers({ to, from, value: amount })]);

    return [...transferEvents, ...orderEvents];
}

export function listenTokenMintedEvent(callback = () => { }) {
    const contract = getContract();

    contract.on("additionalTokensMinted", (address, amount, message) => callback(address, utils.formatEther(amount.toString()), message));
}

export function unscribeTokenMintedEvent(callback = () => { }) {
    const contract = getContract();

    contract.off("additionalTokensMinted", callback)
}


export function listenTokenBurnedEvent(callback = () => { }) {
    const contract = getContract();

    contract.on("tokensBurned", (address, amount, message) => callback(address, utils.formatEther(amount.toString()), message));
}

export function unscribeTokenBurnedEvent(callback = () => { }) {
    const contract = getContract();

    contract.off("additionalTokensMinted", callback)
}






