import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
import ListeningPopup from "./ListeningPopUp.jsx";
import JobToolbar from "./JobToolbar.jsx";
import JobGrid from "./JobGrid.jsx";
import { fetchJobs } from "../api/jobs/job_apis.js";
import { LANGUAGE_ACTION_TYPE } from "../reducers/languageReducer.js";
import QuickHelpBar from "./QuickHelpBar.jsx";

const JobList = () => {
    const dispatch = useDispatch();
    const { jobs = [], loading, error } = useSelector((state) => state.jobs);
    const lang = useSelector((s) => s.language.selected);
    const { t, i18n } = useTranslation();
    const [showHelp, setShowHelp] = useState(
        () => localStorage.getItem("helpDismissed") !== "true"
    );

    const [searchText, setSearchText] = useState("");
    const [sortOrder, setSortOrder] = useState("nearby");
    const [isListening, setIsListening] = useState(false);

    const recognitionRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        dispatch(fetchJobs());
    }, []);

    const dismissHelp = () => {
        localStorage.setItem("helpDismissed", "true");
        setShowHelp(false);
    };

    const startVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(t("common.voiceNotSupported"));
            return;
        }

        if (recognitionRef.current) recognitionRef.current.stop();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.lang =
            i18n.language === "hi"
                ? "hi-IN"
                : i18n.language === "te"
                    ? "te-IN"
                    : "en-IN";

        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        recognition.start();

        timeoutRef.current = setTimeout(() => recognition.stop(), 5000);

        recognition.onresult = (e) =>
            setSearchText(e.results[0][0].transcript);

        recognition.onerror = recognition.onend = () => {
            setIsListening(false);
            clearTimeout(timeoutRef.current);
        };
    };

    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        if (searchText.trim()) {
            const query = searchText.toLowerCase();
            result = result.filter((job) =>
                t(`jobTitle.${job.title}`).toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            if (sortOrder === "nearby") {
                if (a.location.distance_km !== b.location.distance_km) {
                    return a.location.distance_km - b.location.distance_km;
                }
                return b.salary.amount - a.salary.amount;
            }

            if (sortOrder === "high") {
                return b.salary.amount - a.salary.amount;
            }

            return a.salary.amount - b.salary.amount;
        });

        return result;
    }, [jobs, searchText, sortOrder, t]);

    const bestJobId = useMemo(() => {
        if (!filteredJobs.length) return null;

        return filteredJobs.reduce((best, job) =>
            job.salary.amount > best.salary.amount ? job : best
        ).id;
    }, [filteredJobs]);


    const changeLanguage = (lng) => {
        dispatch({
            type: LANGUAGE_ACTION_TYPE.SELECTED_LANGUAGE,
            payload: lng,
        });
        i18n.changeLanguage(lng);
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <p className="text-center text-red-500">
                {t("common.errorLoadingJobs")}
            </p>
        );
    }

    return (
        <div className="space-y-6 relative">
            {showHelp && <QuickHelpBar onClose={dismissHelp} t={t} />}
            <ListeningPopup
                open={isListening}
                text={t("common.listening")}
                listen_duration={5}
                onClose={() => setIsListening(false)}
            />

            <JobToolbar
                searchText={searchText}
                onSearchChange={setSearchText}
                onVoiceSearch={startVoiceSearch}
                isListening={isListening}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
                lang={lang}
                onLanguageChange={changeLanguage}
                t={t}
            />

            {filteredJobs.length === 0 ? (
                <p className="text-center text-gray-500">
                    {t("common.noJobsFound")}
                </p>
            ) : (
                <JobGrid jobs={filteredJobs} highlightedJobId={bestJobId} />
            )}
        </div>
    );
};

export default JobList;
