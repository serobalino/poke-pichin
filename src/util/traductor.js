import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {Config} from "./config";

i18n.use(initReactI18next).init({
    resources: Config.idiomas,
    lng: Config.idiomaini,
    fallbackLng: Config.idiomaini,
});

export default i18n;
