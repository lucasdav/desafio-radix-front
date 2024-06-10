export interface FormDataContextProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}