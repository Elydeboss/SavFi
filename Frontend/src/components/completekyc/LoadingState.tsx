import React from 'react';
import progress from '../../assets/menu/Progress.png';

export const LoadingState: React.FC = () => (
  <div className="text-center">
    <div className="flex justify-center mb-4 animate-spin">
      <img src={progress} alt="loading icon" className=" h-12 w-12 " />
    </div>
    <h2 className="font-semibold text-lg">Verifying your identity</h2>
    <p className="text-sm mt-2">
      We"re confirming your details. This should only take a moment.
    </p>
  </div>
);
