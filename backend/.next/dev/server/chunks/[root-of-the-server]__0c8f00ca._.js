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
"[externals]/bcryptjs [external] (bcryptjs, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("bcryptjs");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
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
"[project]/Desktop/pro/backend/pages/api/auth/signin.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/cors.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/bcryptjs [external] (bcryptjs, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/db.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/pro/backend/lib/jwt.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function handler(req, res) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$cors$2e$js__$5b$api$5d$__$28$ecmascript$29$__["allowCors"])(req, res)) return;
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({
        error: 'Missing credentials'
    });
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__["query"])('SELECT id, password_hash, name FROM users WHERE email = $1', [
            email
        ]);
        if (result.rowCount === 0) return res.status(401).json({
            error: 'Invalid credentials'
        });
        const user = result.rows[0];
        const valid = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$29$__["default"].compare(password, user.password_hash);
        if (!valid) return res.status(401).json({
            error: 'Invalid credentials'
        });
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$pro$2f$backend$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["sign"])({
            id: user.id,
            email
        });
        return res.status(200).json({
            id: user.id,
            email,
            name: user.name,
            token
        });
    } catch (err) {
        console.error('Signin error:', err);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0c8f00ca._.js.map