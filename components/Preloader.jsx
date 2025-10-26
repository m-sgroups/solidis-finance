"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // durée du préloader
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{
            background: "linear-gradient(135deg, #d90429, #008000)", // rouge → vert
          }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-white p-6 shadow-lg"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/solidis-finanza-logo.png"
              alt="Logo Solidis Finanza"
              width={120}
              height={120}
              priority
              className="rounded-full"
            />
          </motion.div>
          <p className="mt-4 text-white text-lg font-semibold tracking-wide">
            Solidis Finanza
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
