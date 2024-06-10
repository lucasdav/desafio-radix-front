import React, { createContext, useState } from 'react';
import { FormDataContextProps } from '../interfaces/FormDataContextProps';

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

export const FormDataProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;