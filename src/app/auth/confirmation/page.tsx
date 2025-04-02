'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Check your email
          </h2>
          <div className="mt-4 text-gray-600 dark:text-gray-400">
            <p>
              We've sent a confirmation link to <strong>{email}</strong>.
            </p>
            <p className="mt-2">
              Click the link in the email to confirm your account and complete the sign-up process.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Didn't receive an email?
          </h3>
          <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Allow a few minutes for the email to arrive</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/auth/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Try signing up again
            </Link>
          </div>
        </div>
        
        <div className="mt-6">
          <Link
            href="/"
            className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
