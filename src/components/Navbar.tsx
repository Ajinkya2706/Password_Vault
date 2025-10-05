'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <nav className="border-b border-neutral-800 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">SecureVault</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}