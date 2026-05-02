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
"[externals]/pg [external] (pg, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pg", () => require("pg"));

module.exports = mod;
}),
"[project]/Desktop/pro/backend/lib/db.js [api] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { Pool } = __turbopack_context__.r("[externals]/pg [external] (pg, cjs)");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
module.exports = {
    query: (text, params)=>pool.query(text, params),
    pool
};
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
"[project]/Desktop/pro/backend/pages/api/issuer/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/cors.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/db.js [api] (ecmascript)");
;
;
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
    if (req.method === 'GET') {
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__["query"])('SELECT id, name, email, institution FROM issuers ORDER BY created_at DESC');
            return res.status(200).json(result.rows);
        } catch (err) {
            console.error('Issuer fetch error:', err);
            return res.status(500).json({
                error: 'Failed to fetch issuers'
            });
        }
    }
    if (req.method === 'POST') {
        const { name, email, institution } = req.body || {};
        if (!name) return res.status(400).json({
            error: 'Name required'
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__["query"])('INSERT INTO issuers (name, email, institution) VALUES ($1, $2, $3) RETURNING id, name, email, institution', [
                name,
                email,
                institution
            ]);
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            if (err.code === '23505') return res.status(409).json({
                error: 'Issuer already exists'
            });
            console.error('Issuer create error:', err);
            return res.status(500).json({
                error: 'Failed to create issuer'
            });
        }
    }
    res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f15c2914._.js.map