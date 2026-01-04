import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
    FiMapPin,
    FiClock,
    FiStar,
    FiCheckCircle,
    FiVolume2,
    FiPhoneCall,
    FiMessageCircle,
    FiInfo,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";


const InfoChip = ({ icon, label }) => (
    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
        {icon}
        <span>{label}</span>
    </span>
);

const Tooltip = ({ children }) => {
    return (
        <span className="relative">
            <span className="cursor-pointer">
                {children}
            </span>
        </span>
    );
};

const JobCard = ({ job, isHighlighted }) => {
    const lang = useSelector((s) => s.language.selected);
    const { t, i18n } = useTranslation();

    const buildSpeechText = () => {
        if (lang === "hi") {
            return `
        ${t(`jobTitle.${job.title}`)} की नौकरी।
        जगह ${job.location.area}, ${job.location.city}।
        वेतन ${job.salary.amount} रुपये।
        समय ${t(`schedule.${job.schedule}`)}।
        रेटिंग ${job.trust.rating}।
        `;
        }


        return t("speech.jobSummary", {
            title: t(`jobTitle.${job.title}`),
            category: t(`category.${job.category}`),
            area: job.location.area,
            city: job.location.city,
            salary: job.salary.amount,
            salaryType: t(`salaryType.${job.salary.type}`),
            schedule: t(`schedule.${job.schedule}`),
            languages: job.language_required
                .map((l) => t(`language.${l}`))
                .join(", "),
            rating: job.trust.rating,
        });
    };

    const speak = () => {
        if (!window.speechSynthesis) return;

        const text = buildSpeechText();
        if (!text) return;

        const speakNow = () => {
            window.speechSynthesis.cancel();

            const msg = new SpeechSynthesisUtterance(text);
            msg.lang =
                lang === "hi"
                    ? "hi-IN"
                    : lang === "te"
                        ? "te-IN"
                        : "en-IN";
            msg.rate = 0.9;

            window.speechSynthesis.speak(msg);
        };

        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = speakNow;
        } else {
            speakNow();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100"
        >
            {/* Top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400" />

            {/* Best Match badge (safe placement) */}
            {isHighlighted && (
                <div className="px-5 pt-3">
                    <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        {t("common.bestMatch")}
                    </span>
                </div>
            )}

            <div className="p-5 space-y-4">

                {/* ---------- Header ---------- */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900">
                            {t(`jobTitle.${job.title}`)}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {t(`category.${job.category}`)}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            {job.location.area}, {job.location.city}
                        </p>
                    </div>

                    {job.trust.verified_employer && (
                        <Tooltip>
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                                <FiCheckCircle size={14} />
                                {t("common.verified")}
                                <FiInfo size={12} />
                            </span>
                        </Tooltip>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <InfoChip
                        icon={<FiMapPin size={14} />}
                        label={`${job.location.distance_km} ${t("common.km")}`}
                    />
                    <InfoChip
                        icon={<FiClock size={14} />}
                        label={t(`schedule.${job.schedule}`)}
                    />
                    <InfoChip
                        icon={<FaRupeeSign size={14} />}
                        label={`₹${job.salary.amount} / ${t(
                            `salaryType.${job.salary.type}`
                        )}`}
                    />
                    <InfoChip
                        icon={<FiStar size={14} />}
                        label={job.trust.rating}
                    />
                </div>

                <div className="grid grid-cols-4 gap-3 pt-2">

                    <button
                        onClick={speak}
                        className="col-span-1 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-700 py-3"
                        aria-label={t("common.readOut")}
                    >
                        <FiVolume2 size={20} />
                    </button>

                    {job.contact.call && (
                        <a
                            href={`tel:${job.contact.phone || ""}`}
                            className="col-span-3 flex items-center justify-center gap-2 rounded-2xl bg-green-600 text-white text-lg font-bold py-3"
                        >
                            <FiPhoneCall size={18} />
                            {t("common.call")}
                        </a>
                    )}

                    {job.contact.whatsapp && (
                        <a
                            href={`https://wa.me/${job.contact.whatsapp_number || ""}`}
                            className="col-span-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-white text-lg font-bold py-3"
                        >
                            <FiMessageCircle size={18} />
                            {t("common.whatsapp")}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;
