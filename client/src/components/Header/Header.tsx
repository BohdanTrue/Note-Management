import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

interface Props {
  title: string,
  setTitle: (title: string) => void,
  handleSubmit: (event:React.FormEvent<HTMLFormElement>) => void
}

export const Header:React.FC<Props> = ({ title, setTitle, handleSubmit }) => {
  const { t } = useTranslation();
  
  return (
    <header className={styles.header}>
      <LanguageSwitcher />

      <form onSubmit={handleSubmit}>
        <input className={styles.newNote}
          type="text" 
          placeholder={t("enterNote")}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  )
}
