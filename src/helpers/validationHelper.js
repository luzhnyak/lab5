
export const hasMinLength = (value, minValue) => value.length >= minValue;

export const isURL = (value) =>
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(value);
