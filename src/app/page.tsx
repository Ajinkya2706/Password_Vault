import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">SecureVault</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your passwords, encrypted and secure. Generate strong passwords and store them safely with client-side encryption.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-50 font-medium border border-gray-300"
          >
            Login
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-3xl mb-"></div>
            <h3 className="font-semibold mb-1">Client-Side Encryption</h3>
            <p className="text-gray-600">Your data is encrypted before leaving your device</p>
          </div>
          <div>
            <div className="text-3xl mb-2"></div>
            <h3 className="font-semibold mb-1">Instant Generation</h3>
            <p className="text-gray-600">Create strong passwords in milliseconds</p>
          </div>
          <div>
            <div className="text-3xl mb-2"></div>
            <h3 className="font-semibold mb-1">Simple & Fast</h3>
            <p className="text-gray-600">Clean interface, no clutter</p>
          </div>
        </div>
      </div>
    </div>
  );
}