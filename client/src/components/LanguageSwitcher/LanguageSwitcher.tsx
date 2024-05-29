import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.scss"

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const lngs: Record<string, { nativeLanguage: string }> = {
    en: { nativeLanguage: `${t("languageEN")}` },
    ua: { nativeLanguage: `${t("languageUA")}` }
  };

  return (
    <div className={styles.container}>
      <div className={styles.languageSwitcher}>      
        {Object.keys(lngs).map((lng) => (
          <button
            type="button"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeLanguage}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
