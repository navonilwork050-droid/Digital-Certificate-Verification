export default function Home() {
    return (
        <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
            <h1>Backend (Next.js) — API</h1>
            <p>Demo API routes:</p>
            <ul>
                <li><a href="/api/status">/api/status</a></li>
                <li><a href="/api/auth/signin">/api/auth/signin</a> (POST)</li>
                <li><a href="/api/auth/signup">/api/auth/signup</a> (POST)</li>
                <li><a href="/api/issuer">/api/issuer</a></li>
                <li><a href="/api/verification">/api/verification</a></li>
            </ul>
        </main>
    );
}
