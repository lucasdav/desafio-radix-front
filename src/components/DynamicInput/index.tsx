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

  const updateAlertMessage = useCallback(
    (value: string) => {
      const validationMessage = validators(idInput, value) || "";
      if (alertMessage !== validationMessage) {
        setAlertMessage(validationMessage);
        if (setDynamicAlertMessage) {
          setDynamicAlertMessage(idInput, validationMessage);
        }
      }
    },
    [idInput, alertMessage, setDynamicAlertMessage]
  );

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

  return (
    <div className="mb-4">
      <label
        htmlFor={idInput}
        className="block text-sm font-medium text-gray-700"
      >
        {labelInput}
      </label>
      <input
        onBlur={(event) => updateAlertMessage(event.target.value)}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        maxLength={maxLenghtProp}
        value={inputValue}
        type={inputType}
        id={idInput}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {alertMessage && <InputAlert alertMessage={alertMessage} />}
    </div>
  );
}
