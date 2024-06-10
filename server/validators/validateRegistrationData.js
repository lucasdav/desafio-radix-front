const validateRegistrationData = (req, res, next) => {
  const { accountType } = req.body;
  let requiredFields;

  if (accountType === 'pf') {
    requiredFields = ['nome', 'email', 'cpf', 'dataNascimento', 'telefone', 'password'];
  } else if (accountType === 'pj') {
    requiredFields = ['razaoSocial', 'email', 'cnpj', 'dataAbertura', 'telefone', 'password'];
  } else {
    return res.status(400).json({
      message: 'Invalid account type',
    });
  }

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Missing required fields',
      missingFields,
    });
  }

  next();
};

export default validateRegistrationData;
