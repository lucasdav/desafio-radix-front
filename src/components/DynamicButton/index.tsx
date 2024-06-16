import styles from "./dynamic-button.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  required?: boolean;
  to?: string;
  label: string;
  buttonWidth?: string;
  disableButton?: boolean;
  onClickRegistrarUsuario?: () => void;
}

export default function DynamicButton({
  required,
  to,
  label,
  buttonWidth,
  disableButton,
  onClickRegistrarUsuario,
}: Props) {
  const navigate = useNavigate();

  to = "/" + to;

  const handleClick = () => {
    if (label === "Voltar") {
      navigate(-1);
    } else if (label === "Cadastrar" && onClickRegistrarUsuario) {
      onClickRegistrarUsuario();
    }
    else {
      navigate(to);
    }
  };

  return (
    <button
      style={{ width: buttonWidth ? buttonWidth : "100%" }}
      onClick={!disableButton && required ? undefined : handleClick}
      className={`${
        label === "Voltar" ? styles.voltarbutton : styles.contiuarbutton
      }
        ${!disableButton && required && styles.disabled}
        inline-block px-4 py-2 text-white font-semibold text-sm rounded shadow-md 
        focus:outline-none focus:ring-2 focus:ring-opacity-75`}
      disabled={!disableButton && required}
    >
      {label}
    </button>
  );
}
