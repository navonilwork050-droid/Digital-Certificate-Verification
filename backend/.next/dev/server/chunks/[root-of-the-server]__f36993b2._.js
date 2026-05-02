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
"[project]/Desktop/pro/backend/pages/api/certificates/issued.js [api] (ecmascript)", ((__turbopack_context__) => {
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
    // Only GET requests allowed
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        // Extract user ID from JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        const jwt = __turbopack_context__.r("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.userId;
        // Ensure tables exist
        await db.query(`
      CREATE TABLE IF NOT EXISTS certificate_tracking (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        student_name VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        cert_hash VARCHAR(100) NOT NULL UNIQUE,
        file_name VARCHAR(255),
        block_number INTEGER,
        transaction_hash VARCHAR(255),
        issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'active',
        issuer_address VARCHAR(255),
        revoked_at TIMESTAMP,
        revocation_reason VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Get all certificates issued by current user
        const result = await db.query(`SELECT id, student_name, degree, cert_hash, block_number, transaction_hash, 
              issue_date, status, file_name, revoked_at, revocation_reason
       FROM certificate_tracking 
       WHERE user_id = $1 
       ORDER BY created_at DESC`, [
            userId
        ]);
        return res.status(200).json({
            success: true,
            certificates: result.rows
        });
    } catch (err) {
        console.error('Error fetching issued certificates:', err);
        return res.status(500).json({
            error: err.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f36993b2._.js.map