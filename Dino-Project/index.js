// ------------------------------------------------------------------------------------------
const main = async () => {
    const { Connection, clusterApiUrl } = require('@solana/web3.js');

    // Kết nối đến devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Lấy thông tin phiên bản của mạng
    const version = await connection.getVersion();
    console.log('Connected to Solana:', version);
};

// main().catch(err => console.error(err));
// ------------------------------------------------------------------------------------------

const createWallet = () => {
    const { Keypair } = require('@solana/web3.js');

    const wallet = Keypair.generate();
    console.log('Public Key:', wallet.publicKey.toBase58());
    console.log('Secret Key:', wallet.secretKey.toString());
};

// createWallet();
// ------------------------------------------------------------------------------------------
// const { Keypair, Connection, clusterApiUrl } = require('@solana/web3.js');

const checkBalance = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const wallet = Keypair.generate();

    // Kiểm tra số dư
    const balance = await connection.getBalance(wallet.publicKey);
    console.log(`Wallet Address: ${wallet.publicKey.toBase58()}`);
    console.log('Balance:', balance);
};

// checkBalance().catch(err => console.error(err));
// ------------------------------------------------------------------------------------------
const {
    Keypair,
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
} = require('@solana/web3.js');

const transferSol = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Tạo 2 ví
    const sender = Keypair.generate();
    const recipient = Keypair.generate();

    console.log('Sender Public Key:', sender.publicKey.toBase58());
    console.log('Recipient Public Key:', recipient.publicKey.toBase58());

    // Airdrop 2 SOL vào ví người gửi
    console.log('Requesting Airdrop...');
    await connection.requestAirdrop(sender.publicKey, 2 * LAMPORTS_PER_SOL);

    // Chờ giao dịch hoàn tất
    await new Promise(r => setTimeout(r, 2000));

    // Kiểm tra số dư ban đầu
    const senderBalanceBefore = await connection.getBalance(sender.publicKey);
    console.log('Sender Balance Before:', senderBalanceBefore / LAMPORTS_PER_SOL, 'SOL');

    // Gửi 0.5 SOL từ ví sender sang ví recipient
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recipient.publicKey,
            lamports: 0.5 * LAMPORTS_PER_SOL,
        })
    );

    // Ký giao dịch và gửi
    console.log('Sending transaction...');
    await connection.sendTransaction(transaction, [sender]);

    // Kiểm tra số dư sau giao dịch
    const senderBalanceAfter = await connection.getBalance(sender.publicKey);
    const recipientBalance = await connection.getBalance(recipient.publicKey);
    console.log('Sender Balance After:', senderBalanceAfter / LAMPORTS_PER_SOL, 'SOL');
    console.log('Recipient Balance:', recipientBalance / LAMPORTS_PER_SOL, 'SOL');
};

// transferSol().catch(err => console.error(err));
// ------------------------------------------------------------------------------------------
// const { clusterApiUrl, TransactionInstruction, PublicKey, Transaction } = require('@solana/web3.js');

// const callSmartContract = async () => {
//     const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

//     const programId = new PublicKey('<PROGRAM_ID>'); // Thay bằng địa chỉ chương trình của bạn
//     const data = Buffer.from('Hello Solana'); // Dữ liệu gửi đến chương trình

//     const instruction = new TransactionInstruction({
//         keys: [], // Các tài khoản liên quan (nếu cần)
//         programId: programId,
//         data: data,
//     });

//     // Tạo giao dịch và gửi instruction
//     const transaction = new Transaction().add(instruction);
//     console.log('Sending instruction to the smart contract...');
//     // Gửi transaction (yêu cầu ví ký)
// };

// callSmartContract().catch(err => console.error(err));
