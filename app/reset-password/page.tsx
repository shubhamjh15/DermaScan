// app/reset-password/page.tsx
import React, { Suspense } from "react"; // Import Suspense
import ResetPassword from "@/components/Reset-password";

// You can create a more sophisticated loading component if you like
const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Loading Form...</div>
    </div>
  );
};

const ResetPasswordPage = () => { // Renamed variable for clarity (optional but good practice)
  return (
    // Wrap the Client Component (<ResetPassword />) in Suspense
    // Provide a fallback UI to show while it loads
    <Suspense fallback={<LoadingFallback />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage; // Export the correct component name