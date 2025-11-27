import { ChevronRight, PlusCircle } from 'lucide-react';
import profileImg from '../assets/menu/profileImg.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProfileOverview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-hidden"
    >
      {/* Breadcrumb */}
      <div className="px-4 flex items-center gap-1 text-sm sm:text-base font-medium">
        Profile <ChevronRight className="w-4 h-4" />
        <span className="text-blue font-medium">Overview</span>
      </div>

      {/* Outer container */}
      <div className="w-full bg-gray dark:bg-gray-600 dark:text-white p-4 flex justify-center">
        <div
          className="
            w-full space-y-6
            max-w-full
            sm:max-w-[620px]
            md:max-w-[750px]
            lg:max-w-[900px]
          "
        >
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              bg-white dark:bg-gray-800 shadow rounded-2xl
              p-4 sm:p-6 md:p-6
              flex flex-col sm:flex-row md:flex-col lg:flex-row
              items-center sm:items-start gap-4
            "
          >
            <img
              src={profileImg}
              alt="User avatar"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div className="flex-1 w-full text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                SaveFi ID: SF-1234XYZ
              </p>

              <h1 className="text-xl sm:text-2xl font-semibold">Jolly Akeju</h1>

              <p className="text-sm text-gray-500 font-medium break-all">
                Jollyakeju@gmail.com
              </p>

              <div className="flex justify-between gap-3 items-center pt-2">
                <p className="text-sm text-neutral-500 dark:text-white bg-gray py-1 px-1.5 dark:bg-gray-700 font-medium rounded">
                  Signed up from Google
                </p>
                <Link to="edit">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue text-white text-base rounded-full font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Wallet + Points */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 md:gap-6 w-full">
            {/* Wallet */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-3"
            >
              <p className="font-medium text-sm text-gray-500">
                Auto-generated SaveFi wallet
              </p>

              <div className="flex gap-2 items-center flex-wrap">
                <p className="font-mono text-sm">0x1A2b...C3D4</p>

                {/* Copy Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 dark:text-blue-300"
                >
                  <path
                    d="M5 9.1665C5 6.80948 5 5.63097 5.73223 4.89874C6.46447 4.1665 7.64298 4.1665 10 4.1665H12.5C14.857 4.1665 16.0355 4.1665 16.7678 4.89874C17.5 5.63097 17.5 6.80948 17.5 9.1665V13.3332C17.5 15.6902 17.5 16.8687 16.7678 17.6009C16.0355 18.3332 14.857 18.3332 12.5 18.3332H10C7.64298 18.3332 6.46447 18.3332 5.73223 17.6009C5 16.8687 5 15.6902 5 13.3332V9.1665Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332V8.33317C2.5 5.19047 2.5 3.61913 3.47631 2.64281C4.45262 1.6665 6.02397 1.6665 9.16667 1.6665H12.5C13.8807 1.6665 15 2.78579 15 4.1665"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <p className="p-2 rounded-xl text-gray-500 bg-gray w-fit">
                TRC-20 / ERC-20
              </p>

              <button className="text-blue text-base font-medium flex items-center gap-1">
                Manage connected wallets <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Points */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-3"
            >
              <p className="font-medium text-sm text-gray-500">
                SaveFi point balance
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue dark:text-blue-300"
                >
                  <g clipPath="url(#clip0_527_5088)">
                    <path
                      d="M1.9375 16C1.9375 17.8467 2.30124 19.6753 3.00794 21.3815C3.71465 23.0876 4.75049 24.6379 6.05631 25.9437C7.36214 27.2495 8.91237 28.2853 10.6185 28.9921C12.3247 29.6988 14.1533 30.0625 16 30.0625C17.8467 30.0625 19.6753 29.6988 21.3815 28.9921C23.0876 28.2853 24.6379 27.2495 25.9437 25.9437C27.2495 24.6379 28.2853 23.0876 28.9921 21.3815C29.6988 19.6753 30.0625 17.8467 30.0625 16C30.0625 14.1533 29.6988 12.3247 28.9921 10.6185C28.2853 8.91237 27.2495 7.36214 25.9437 6.05631C24.6379 4.75049 23.0876 3.71465 21.3815 3.00794C19.6753 2.30124 17.8467 1.9375 16 1.9375C14.1533 1.9375 12.3247 2.30124 10.6185 3.00794C8.91237 3.71465 7.36214 4.75049 6.05631 6.05631C4.75049 7.36214 3.71465 8.91237 3.00794 10.6185C2.30124 12.3247 1.9375 14.1533 1.9375 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.25 12.875H9.75L14.75 19.125H17.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.75 12.875H17.25L22.25 19.125H24.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.25 19.125H9.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.25 12.875H24.75V15.375"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <defs>
                    <clipPath id="clip0_527_5088">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <p className="text-xl font-semibold">1.0 SFP</p>
              </div>

              <p className="text-sm text-gray-500 gap-1 flex items-center">
                ~3.01 USDT
              </p>

              <button className="text-blue font-medium text-base flex items-center gap-1">
                View referral rewards <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* KYC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-2"
          >
            <p className="text-sm font-medium">
              KYC status:{' '}
              <span className="text-sm text-yellow-600 py-0.5 px-1.5 bg-[#FFE6CB] rounded-3xl">
                KYC: Unverified
              </span>
            </p>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-300 max-w-[65%]">
                Verify your identity for full access
              </p>
              <Link to="kyc">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-base font-medium px-3 py-1 bg-black text-white rounded-xl dark:bg-gray-600"
                >
                  Verify
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Savings snapshot */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <h2 className="font-semibold text-base sm:text-lg mb-4">
              Savings snapshot
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total saved:
                </p>
                <p className="text-xl font-semibold">35.72 USDT</p>
                <p className="text-sm text-gray-500">~₦45,570.00</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total plans
                </p>
                <p className="text-xl font-semibold">3</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Your saving streaks
                </p>
                <p className="text-base font-semibold">
                  You saved 3 times this month!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
