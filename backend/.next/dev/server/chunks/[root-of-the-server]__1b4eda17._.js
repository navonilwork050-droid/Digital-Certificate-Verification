module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/pro/backend/lib/cors.js [api] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[project]/Desktop/pro/backend/lib/jwt.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const jwt = __turbopack_context__.r("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
const SECRET = process.env.JWT_SECRET || 'default-secret-change-me';
module.exports = {
    sign: (payload)=>jwt.sign(payload, SECRET, {
            expiresIn: '7d'
        }),
    verify: (token)=>jwt.verify(token, SECRET)
};
}),
"[project]/Desktop/pro/backend/pages/api/verification/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/cors.js [api] (ecmascript)");
;
const sampleVerifications = [
    {
        id: 'abc',
        verified: false,
        holder: 'John Doe'
    },
    {
        id: 'def',
        verified: true,
        holder: 'Alice Smith'
    }
];
async function handler(req, res) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__["allowCors"])(req, res)) return;
    // Check auth (convert middleware pattern for next.js api route)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({
        error: 'Missing token'
    });
    try {
        const { verify } = __turbopack_context__.r("[project]/Desktop/pro/backend/lib/jwt.js [api] (ecmascript)");
        const user = verify(token);
        req.user = user;
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
    if (req.method === 'GET') return res.status(200).json(sampleVerifications);
    res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b4eda17._.js.map