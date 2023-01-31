// eslint-disable-next-line import/prefer-default-export
export const handleBlur = (e, errors, setErrors) => {
  const { name, value } = e.target;
  const keys = Object.keys(errors);
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  // eslint-disable-next-line consistent-return
  keys.forEach((item) => {
    if (item === name) {
      if (value) {
        return setErrors({ ...errors, [name]: '' });
      }
      return setErrors({ ...errors, [name]: `${formattedName} is required` });
    }
  });
};
