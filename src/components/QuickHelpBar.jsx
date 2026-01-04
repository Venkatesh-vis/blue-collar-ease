import { FiMic, FiVolume2, FiX } from "react-icons/fi";

const QuickHelpBar = ({ onClose, t }) => {
    return (
        <div className="flex items-center justify-between gap-3 bg-blue-50 border border-blue-200 p-3 text-sm">
            <div className="flex flex-wrap gap-4 text-blue-800">
                <span className="flex items-center gap-1">
                    <FiMic /> {t("help.voiceSearch")}
                </span>
                <span className="flex items-center gap-1">
                    <FiVolume2 /> {t("help.audioRead")}
                </span>
            </div>

            <button onClick={onClose} aria-label="Close help">
                <FiX />
            </button>
        </div>
    );
};

export default QuickHelpBar;
