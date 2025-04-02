import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Access Denied
          </h2>
          <div className="mt-4 text-gray-600 dark:text-gray-400">
            <p>
              You do not have permission to access this page.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            What can you do?
          </h3>
          <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
            <li>• Return to the homepage</li>
            <li>• Sign in with a different account</li>
            <li>• Contact support if you believe this is an error</li>
          </ul>
        </div>
        
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Return to homepage
          </Link>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
