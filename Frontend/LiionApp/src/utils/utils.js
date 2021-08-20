export const clean = (rut) => {
  return typeof rut === "string"
    ? rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
    : "";
}

export const validate = (rut) => {
  if (typeof rut !== "string") {
    return false;
  }

  // if it starts with 0 we return false
  // so a rut like 00000000-0 will not pass
  if (/^0+/.test(rut)) {
    return false;
  }

  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false;
  }

  rut = clean(rut);

  let t = parseInt(rut.slice(0, -1), 10);
  let m = 0;
  let s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    t = Math.floor(t / 10);
  }

  const v = s > 0 ? "" + (s - 1) : "K";
  return v === rut.slice(-1);
}

export const format = (rut) => {
  rut = clean(rut);

  let result = rut.slice(-4, -1) + "-" + rut.substr(rut.length - 1);
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + "." + result;
  }

  return result;
}

export const getCheckDigit = (input) => {
  const rut = Array.from(clean(input), Number);

  if (rut.length === 0 || rut.includes(NaN)) {
    throw new Error(`"${input}" as RUT is invalid`);
  }

  const modulus = 11;
  const initialValue = 0;
  const sumResult = rut
    .reverse()
    .reduce(
      (accumulator, currentValue, index) =>
        accumulator + currentValue * ((index % 6) + 2),
      initialValue
    );

  const checkDigit = modulus - (sumResult % modulus);

  if (checkDigit === 10) {
    return "K";
  } else if (checkDigit === 11) {
    return "0";
  } else {
    return checkDigit.toString();
  }
}


export const validateEmail = (text) => {
    const reg =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
