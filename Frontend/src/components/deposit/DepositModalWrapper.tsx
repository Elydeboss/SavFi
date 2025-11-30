// DepositModalWrapper.tsx
import React from 'react';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function DepositModalWrapper({ isOpen, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
