import { FiMic } from "react-icons/fi";

const JobToolbar = ({
                        searchText,
                        onSearchChange,
                        onVoiceSearch,
                        isListening,
                        sortOrder,
                        onSortChange,
                        lang,
                        onLanguageChange,
                        t,
                    }) => {
    return (
        <div className="p-4 sm:p-5">
            <div
                className="
                    grid gap-3
                    grid-cols-1
                    sm:grid-cols-4
                    lg:grid-cols-12
                    items-center
                    max-w-6xl
                    mx-auto
                "
            >
                <div
                    className="
                        relative
                        col-span-1 sm:col-span-3 lg:col-span-5
                        w-full
                    "
                >
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={t("common.searchJobTitle")}
                        className="
                            w-full
                            rounded-xl
                            border
                            px-4
                            py-2
                            pr-12
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-200
                        "
                    />

                    <button
                        type="button"
                        onClick={onVoiceSearch}
                        aria-label={t("common.voiceSearch")}
                        className={`
                            absolute
                            right-2
                            top-1/2
                            -translate-y-1/2
                            p-2
                            rounded-lg
                            transition
                            ${
                            isListening
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-700"
                        }
                        `}
                    >
                        <FiMic size={18} />
                    </button>
                </div>

                <select
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="
                        col-span-1 sm:col-span-2 lg:col-span-3
                        rounded-xl
                        border
                        px-3
                        py-2
                        w-full
                    "
                >
                    <option value="nearby">{t("common.nearbyFirst")}</option>
                    <option value="high">{t("common.salaryHighToLow")}</option>
                    <option value="low">{t("common.salaryLowToHigh")}</option>

                </select>

                <select
                    value={lang}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="
                        col-span-1 sm:col-span-2 lg:col-span-3
                        rounded-xl
                        border
                        px-3
                        py-2
                        w-full
                    "
                >
                    <option value="hi">हिंदी</option>
                    <option value="en">English</option>
                </select>
            </div>
        </div>
    );
};

export default JobToolbar;
