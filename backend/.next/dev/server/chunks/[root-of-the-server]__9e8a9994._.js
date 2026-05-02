module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[project]/Desktop/pro/backend/pages/api/certificates/verifications.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
(()=>{
    const e = new Error("Cannot find module '../../lib/db'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../lib/cors'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
async function handler(req, res) {
    allowCors(req, res);
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        const jwt = __turbopack_context__.r("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.userId;
        // Ensure verification_logs table exists
        await db.query(`
      CREATE TABLE IF NOT EXISTS verification_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cert_hash VARCHAR(100) NOT NULL,
        verified_by_user_id UUID REFERENCES users(id),
        student_name VARCHAR(255),
        degree VARCHAR(255),
        verification_method VARCHAR(50),
        is_valid BOOLEAN DEFAULT false,
        issuer_address VARCHAR(255),
        verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Get all verification attempts by current user
        const result = await db.query(`SELECT id, cert_hash, student_name, degree, verification_method, is_valid, 
              issuer_address, verified_at
       FROM verification_logs 
       WHERE verified_by_user_id = $1 
       ORDER BY verified_at DESC 
       LIMIT 100`, [
            userId
        ]);
        return res.status(200).json({
            success: true,
            verifications: result.rows,
            total: result.rows.length
        });
    } catch (err) {
        console.error('Error fetching verification logs:', err);
        return res.status(500).json({
            error: err.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9e8a9994._.js.map