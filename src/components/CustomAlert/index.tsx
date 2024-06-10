import style from "../../styles/styles.module.scss";

interface Props {
  message: string;
  onClose: () => void;
  onClickRegistrarUsuario: () => void;
  tryAgainButton?: boolean;
}

export default function CustomAlert({
  message,
  onClose,
  onClickRegistrarUsuario,
  tryAgainButton,
}: Props) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <p className="text-gray-800">{message}</p>
        <div className="flex justify-end space-x-4 mt-4">
          {tryAgainButton && (
            <button
              onClick={onClickRegistrarUsuario}
              className={`${style.buttonstyled} px-4 py-2 text-white rounded transition-colors"`}
            >
              Tentar novamente
            </button>
          )}
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
