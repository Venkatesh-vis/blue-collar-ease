import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";


const ListeningPopup = ({ open, text, onClose, listen_duration }) => {
    const [secondsLeft, setSecondsLeft] = useState(listen_duration);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (!open) return;

        setSecondsLeft(listen_duration);

        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    onClose?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl min-w-[240px]"
                    >
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <motion.span
                                    key={i}
                                    className="w-2 bg-blue-500 rounded-full"
                                    animate={{ height: ["8px", "28px", "8px"] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-lg font-semibold text-gray-800">
                            {text}
                        </p>
                        <p className="text-sm text-gray-500">
                            {t("common.speakTimeLeft", { seconds: secondsLeft })}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ListeningPopup;
