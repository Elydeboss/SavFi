import React from 'react';

export const LoadingState: React.FC = () => (
  <div className="text-center">
    <div className="animate-spin mb-4 text-4xl">🔄</div>
    <h2 className="font-semibold text-lg">Verifying your identity</h2>
    <p className="text-sm mt-2">
      We"re confirming your details. This should only take a moment.
    </p>
  </div>
);
