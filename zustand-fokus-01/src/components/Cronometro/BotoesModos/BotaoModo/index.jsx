import styles from "./styles.module.css";
import { useCronometroStore } from "../../../../store";


export default function BotaoModo({ children, modoBotao }) {
  const modoCronometro = useCronometroStore((estado) => estado.modoCronometro);
  const setModoCronometro = useCronometroStore((estado) => estado.setModoCronometro);

  function aoClicar() {
    setModoCronometro(modoBotao);
  }

  const ativo = modoBotao.id === modoCronometro.id;

  return (
    <button
      onClick={aoClicar}
      className={`
        ${styles["cronometer-modes__button"]}
        ${ativo ? styles["cronometer-modes__button--active"] : ""}
      `}
    >
      {children}
    </button>
  );
}
