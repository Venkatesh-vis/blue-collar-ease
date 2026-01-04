import { useTranslation } from "react-i18next";

const OfflineFallback = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-yellow-100 text-yellow-900 p-3 text-center rounded-xl text-sm font-medium">
            {t("common.offlineFallback")}
        </div>
    );
};

export default OfflineFallback;
