import React, { useState, useEffect } from 'react';
import { setToken } from '../lib/api';

const SignIn = ({ onAuth }) => {
    const [mode, setMode] = useState('signin'); // or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (mode === 'signin') {
                const resp = await fetch(`${API_BASE}/auth/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await resp.json();
                if (!resp.ok) throw new Error(data.error || 'Signin failed');

                // Store JWT token
                setToken(data.token);

                // Call parent handler with user data
                if (onAuth) onAuth({ id: data.id, email: data.email, name: data.name });
            } else {
                const resp = await fetch(`${API_BASE}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await resp.json();
                if (!resp.ok) throw new Error(data.error || 'Signup failed');

                // Store JWT token
                setToken(data.token || '');

                // Call parent handler with user data
                if (onAuth) onAuth({ id: data.id, email: data.email, name: data.name });
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    useEffect(() => {
        // scroll to top whenever switching between sign in / sign up modes
        window.scrollTo(0, 0);
    }, [mode]);

    return (
        <section className="card" style={{ maxWidth: 720, margin: '2rem auto', padding: '2rem' }}>
            <div className="section-header">
                <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                <p className="text-center">{mode === 'signin' ? 'Access your account' : 'Create a new account'}</p>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffe0e0', borderRadius: '4px' }}>{error}</div>}

            <form onSubmit={submit} className="form">
                {mode === 'signup' && (
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>

                {mode === 'signup' && (
                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="organisation">Organisation</option>
                            <option value="verifier">Verifier</option>
                        </select>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary">
                        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                    >
                        {mode === 'signin' ? 'Create account' : 'Have an account? Sign In'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SignIn;
