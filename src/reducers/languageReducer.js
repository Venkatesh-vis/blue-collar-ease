import i18next from "i18next";
import {translationsEnglish} from "../languages/English.js";
import {translationsHindi} from "../languages/Hindi.js";
import { initReactI18next } from "react-i18next";



export const LANGUAGE_ACTION_TYPE = {
    SELECTED_LANGUAGE: 'SELECTED_LANGUAGE',
}

export const resources = {
    en: {translation: translationsEnglish},
    hi: {translation: translationsHindi},
}

const initializeI18next = () => {
    i18next
        .use(initReactI18next)
        .init({
            resources,
            lng: "en",
            fallbackLng: "en",
            interpolation: {
                escapeValue: false,
            },
        });
};

initializeI18next();

const initialState = {
    selected: "en"
};

export default function languageReducer(state = initialState, action) {
    switch (action.type) {
        case LANGUAGE_ACTION_TYPE.SELECTED_LANGUAGE:
            return { selected: action.payload };
        default:
            return state;
    }
}
