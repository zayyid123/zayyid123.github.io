const removePunctuation = (str) => {
  // Gunakan ekspresi reguler untuk mencocokkan semua tanda baca
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  // Gantikan semua tanda baca dengan string kosong
  return str.replace(regex, "");
};

export default removePunctuation
