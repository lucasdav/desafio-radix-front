import React from 'react';
import FormDataContext from '../context/FormDataContext';

export const useFormData = () => {
  const context = React.useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};