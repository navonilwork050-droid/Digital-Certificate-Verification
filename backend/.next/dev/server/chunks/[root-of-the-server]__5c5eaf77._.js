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
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Desktop/pro/backend/lib/db.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "pool",
    ()=>pool,
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL
});
const query = (text, params)=>pool.query(text, params);
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[project]/Desktop/pro/backend/lib/jwt.js [api] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/pro/backend/pages/api/issuer/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/cors.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/db.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/jwt.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
        const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["verify"])(token);
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5c5eaf77._.js.map