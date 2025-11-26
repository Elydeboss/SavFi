import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function KycVerification() {
  const isVerified = false; // false → show Unverified only

  return (
    <div>
      <div className="px-2 flex items-center gap-1 font-medium text-sm">
        Profile <span className="text-blue-500">› KYC verification</span>
      </div>

      <motion.div
        className="w-full bg-gray-100 dark:bg-gray-600 dark:text-white min-h-screen p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center mt-4">
          <div className="w-full max-w-md space-y-6">
            {/* ===========================
                UNVERIFIED BLOCK
            ============================ */}
            {!isVerified && (
              <motion.div
                className="bg-white dark:bg-gray-700 shadow rounded-2xl p-6 relative"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <p className="font-semibold text-lg mb-2">
                  Verification status
                </p>

                <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  KYC: Unverified
                </span>

                <p className="text-sm text-gray-500 dark:text-gray-300 mt-4 leading-relaxed">
                  You have not completed your identity verification. Use your
                  NIN to complete KYC to unlock withdrawals and higher deposit
                  limits.
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-5 px-5 py-2 text-sm bg-black text-white dark:bg-gray-600 rounded-full font-medium"
                >
                  <Link to="">Complete KYC</Link>
                </motion.button>
              </motion.div>
            )}

            {/* ===========================
                VERIFIED SECTION
            ============================ */}
            {isVerified && (
              <motion.div
                className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 space-y-4"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                {/* Top status */}
                <div>
                  <p className="font-semibold text-lg">Verification status</p>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    KYC: Verified
                  </span>
                </div>

                {/* Summary */}
                <p className="font-semibold text-base pt-2">
                  Verification summary
                </p>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Full Name
                    </span>
                    <span className="flex items-center gap-1">
                      Jolly Akeju <Lock size={14} />
                    </span>
                  </div>

                  {/* NIN */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      NIN
                    </span>
                    <span>234******89</span>
                  </div>

                  {/* Verification date */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Verification date
                    </span>
                    <span>18 November, 2025</span>
                  </div>

                  {/* Method */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Verification method
                    </span>
                    <span>NIN lookup</span>
                  </div>
                </div>

                <hr className="border-gray-300/60 dark:border-gray-600 my-3" />

                <p className="text-xs text-gray-500 dark:text-gray-300">
                  To upgrade your KYC information,
                  <button className="text-blue-500 underline ml-1">
                    Contact support
                  </button>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
