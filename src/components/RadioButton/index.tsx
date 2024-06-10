import { AlertMessageProps } from "../../enum/AlertMessageProps";
import Alert from "../InputAlert";

interface Props {
  options: { label: string; value: string }[];
  name: string;
  selectedPersonType: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton({
  options,
  name,
  selectedPersonType,
  onChange,
}: Props) {

  return (
    <div className="mb-4">
      <div className="flex">
        {options.map((option) => (
          <div key={option.value} className="flex items-center mb-1">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedPersonType === option.value}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={option.value}
              className="ml-1 mr-2 block text-sm text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {!selectedPersonType && (
        <Alert alertMessage={AlertMessageProps.campoObrigatorio} />
      )}
    </div>
  );
}
