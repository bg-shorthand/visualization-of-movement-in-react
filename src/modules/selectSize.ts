export const selectSize = (size: number, maxSize: number) => {
  const unitSize = maxSize / 5;
  if (unitSize > size) {
    return 'xs';
  } else if (2 * unitSize > size) {
    return 's';
  } else if (3 * unitSize > size) {
    return 'm';
  } else if (4 * unitSize > size) {
    return 'l';
  } else {
    return 'xl';
  }
};
