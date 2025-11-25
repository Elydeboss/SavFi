import { ChevronRight, Copy, PlusCircle } from 'lucide-react';
import profileImg from '../assets/menu/profileImg.png';
import { motion } from 'framer-motion';

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
      <div className="w-full bg-gray dark:bg-gray-700 dark:text-white p-4 flex justify-center">
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
              <p className="text-xs text-gray-500 dark:text-gray-300">
                SaveFi ID: SF-1234XYZ
              </p>

              <h1 className="text-lg sm:text-xl font-semibold">Jolly Akeju</h1>

              <p className="text-xs text-gray-500 font-medium break-all">
                Jollyakeju@gmail.com
              </p>

              <div className="flex justify-between sm:justify-start sm:gap-3 items-center pt-2">
                <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-white bg-gray py-1 px-1.5 dark:bg-gray-700 font-medium rounded">
                  Signed up from Google
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue text-white text-xs rounded-full font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  Edit Profile
                </motion.button>
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
              <p className="font-medium text-xs text-gray-500">
                Auto-generated SaveFi wallet
              </p>

              <div className="flex gap-2 items-center flex-wrap">
                <p className="font-mono text-sm">0x1A2b...C3D4</p>
                <Copy className="w-4 h-4" />
              </div>

              <p className="p-1 rounded-xl text-[10px] text-gray-500 bg-gray max-w-[105px]">
                TRC-20 / ERC-20
              </p>

              <button className="text-blue text-xs font-medium flex items-center gap-1">
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
              <p className="font-medium text-xs text-gray-500">
                SaveFi point balance
              </p>
              <p className="text-lg font-semibold">1.0 SFP</p>
              <p className="text-xs text-gray-500">~3.01 USDT</p>

              <button className="text-blue font-medium text-xs flex items-center gap-1">
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
            <p className="text-xs font-medium">
              KYC status:{' '}
              <span className="text-yellow-600 text-xs py-0.5 px-1.5 bg-[#FFE6CB] rounded-3xl">
                KYC: Unverified
              </span>
            </p>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 dark:text-gray-300 max-w-[65%]">
                Verify your identity for full access
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-medium px-3 py-1 bg-black text-white rounded-xl dark:bg-gray-600"
              >
                Verify
              </motion.button>
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
                <p className="text-xs text-gray-500">~₦45,570.00</p>
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
