// components/navbar-wrapper.tsx
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Navbar from './navbar'; // Ensure this path is correct

export default async function NavbarWrapper() {
  let session = null;
  try {
    // Option 1 (Most Direct - Try this first):
    // Pass the ReadonlyHeaders directly. better-auth might handle it.
    const requestHeaders = headers(); // Get ReadonlyHeaders
    session = await auth.api.getSession({ headers: requestHeaders });

    // Option 2 (Fallback - If Option 1 still errors):
    // Convert ReadonlyHeaders to a plain object. This is often compatible.
    // const readOnlyHeaders = headers();
    // const headersObject: { [key: string]: string } = {};
    // readOnlyHeaders.forEach((value, key) => {
    //   headersObject[key] = value;
    // });
    // // Pass the plain object (Note: better-auth might expect a Headers instance,
    // // so this is less likely but worth trying if Option 1 fails)
    // // session = await auth.api.getSession({ headers: headersObject as any }); // Using 'as any' if type conflict


  } catch (error) {
    // Log the specific error during session fetching
    console.error("Error fetching session in NavbarWrapper:", error);
    // Potentially add more specific error handling based on the error type
  }

  // Render the Navbar client component, passing the session data (or null)
  // The next error fix addresses the 'initialSession' prop issue
  return <Navbar initialSession={session} />;
}