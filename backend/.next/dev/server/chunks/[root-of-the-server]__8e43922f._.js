module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/ethers [external] (ethers, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("ethers");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/blockchain.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "initializeContract",
    ()=>initializeContract,
    "mintCertificate",
    ()=>mintCertificate,
    "verifyCertificate",
    ()=>verifyCertificate
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/ethers [external] (ethers, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
let contract = null;
let signer = null;
async function initializeContract() {
    if (contract) return contract;
    try {
        // Read contract info from deployed contract - use absolute path
        const contractInfoPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "lib", "contractInfo.json");
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(contractInfoPath)) {
            throw new Error("Contract not deployed. Run: npx hardhat run scripts/deploy.js --network localhost");
        }
        const contractInfo = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(contractInfoPath, "utf8"));
        const provider = new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$29$__["ethers"].JsonRpcProvider("http://127.0.0.1:8545");
        // Get the first pre-funded account from Hardhat node
        // These accounts are automatically created with 10000 ETH when Hardhat node starts
        const accounts = await provider.listAccounts();
        if (!accounts || accounts.length === 0) {
            throw new Error("No accounts available. Make sure Hardhat node is running!");
        }
        // Use the first account (already has 10000 ETH pre-funded)
        signer = accounts[0];
        contract = new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$29$__["ethers"].Contract(contractInfo.address, contractInfo.abi, signer);
        console.log("Contract initialized at:", contractInfo.address);
        console.log("Signer address:", await signer.getAddress());
        return contract;
    } catch (error) {
        console.error("Failed to initialize contract:", error.message);
        throw error;
    }
}
async function mintCertificate(studentName, degree, certHash) {
    const cert = await initializeContract();
    const tx = await cert.issueCertificate(studentName, degree, certHash);
    const receipt = await tx.wait();
    return {
        blockNumber: receipt.blockNumber,
        transactionHash: receipt.hash,
        timestamp: Math.floor(Date.now() / 1000),
        certHash
    };
}
async function verifyCertificate(certHash) {
    const cert = await initializeContract();
    const [studentName, degree, issuer, issueDate, exists] = await cert.verifyCertificate(certHash);
    if (!exists) {
        return null;
    }
    return {
        studentName,
        degree,
        issuer,
        issueDate: issueDate.toString(),
        exists,
        certHash
    };
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[project]/lib/jwt.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sign",
    ()=>sign,
    "verify",
    ()=>verify
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
;
const SECRET = process.env.JWT_SECRET || 'default-secret-change-me';
const sign = (payload)=>__TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__["default"].sign(payload, SECRET, {
        expiresIn: '7d'
    });
const verify = (token)=>__TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__["default"].verify(token, SECRET);
}),
"[project]/lib/cors.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allowCors",
    ()=>allowCors
]);
function allowCors(req, res) {
    const origin = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}
}),
"[project]/pages/api/blockchain/mint.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blockchain$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/blockchain.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jwt.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cors.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blockchain$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blockchain$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function handler(req, res) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__["allowCors"])(req, res)) return;
    if (req.method !== 'POST') return res.status(405).end();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({
        error: 'Missing token'
    });
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["verify"])(token);
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
    const { studentName, degree, certHash } = req.body || {};
    if (!studentName || !degree || !certHash) {
        return res.status(400).json({
            error: 'Missing required fields: studentName, degree, certHash'
        });
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blockchain$2e$js__$5b$api$5d$__$28$ecmascript$29$__["mintCertificate"])(studentName, degree, certHash);
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (err) {
        console.error('Mint error:', err);
        return res.status(500).json({
            error: err.message || 'Failed to mint certificate'
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8e43922f._.js.map