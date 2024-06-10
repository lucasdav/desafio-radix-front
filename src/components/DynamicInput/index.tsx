import { useCallback, useEffect, useState } from "react";
import { validators } from "../../validators";
import { inputMaskFormat } from "../../util/inputMaskFormat";
import InputAlert from "../InputAlert";

interface Props {
  inputType: string;
  idInput: string;
  labelInput: string;
  maxLenghtProp: number;
  setDynamicAlertMessage?: (id: string, message: string) => void;
  inputValue: string;
  onChangeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DynamicInput({
  inputType,
  idInput,
  labelInput,
  maxLenghtProp,
  setDynamicAlertMessage,
  inputValue,
  onChangeInputValue,
}: Props) {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [inputFieldType, setInputFieldType] = useState<string>(inputType);

  const updateAlertMessage = useCallback((value: string) => {
    const validationMessage = validators(idInput, value) || "";
    if (alertMessage !== validationMessage) {
      setAlertMessage(validationMessage);
      if (setDynamicAlertMessage) {
        setDynamicAlertMessage(idInput, validationMessage);
      }
    }
  }, [idInput, alertMessage, setDynamicAlertMessage]);

  useEffect(() => {
    updateAlertMessage(inputValue);
  }, [inputValue, updateAlertMessage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInputValue(event);
    updateAlertMessage(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const maskedValue = inputMaskFormat(idInput, event.currentTarget.value);
    event.currentTarget.value = maskedValue;
    updateAlertMessage(maskedValue);
  };

  const togglePasswordVisibility = () => {
    setInputFieldType(inputFieldType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="mb-4">
      <label htmlFor={idInput} className="block text-sm font-medium text-gray-700">
        {labelInput}
      </label>
      <div className="flex">
        <input
          onBlur={(event) => updateAlertMessage(event.target.value)}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          maxLength={maxLenghtProp}
          value={inputValue}
          type={inputFieldType}
          id={idInput}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {idInput === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2 px-2 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
          >
            {inputFieldType === 'password' ? 'Mostrar' : 'Ocultar'}
          </button>
        )}
      </div>
      {alertMessage && <InputAlert alertMessage={alertMessage} />}
    </div>
  );
}