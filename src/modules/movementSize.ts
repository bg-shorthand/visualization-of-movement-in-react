export const arrowSize = (size: number, maxSize: number) => {
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

export const marketSize = (movement: number, maxMovement: number) => {
  const MAX_CIRCLE_SIZE = 180;
  const MIN_CIRCLE_SIZE = 90;

  const storeSize = `${
    (MAX_CIRCLE_SIZE - MIN_CIRCLE_SIZE) * (movement / maxMovement) + MIN_CIRCLE_SIZE
  }px`;
  const halfStoreSize =
    ((MAX_CIRCLE_SIZE - MIN_CIRCLE_SIZE) * (movement / maxMovement) + MIN_CIRCLE_SIZE) / 2;
  return { storeSize, halfStoreSize };
};
