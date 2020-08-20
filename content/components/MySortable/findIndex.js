import {distance, clamp} from '@popmotion/popcorn'

const buffer = 10;

export const findIndex = (
  i,
  xOffset,
  positions
) => {
  let target = i;
  const { left, width } = positions[i];
  const right = left + width;

  if (xOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(right, nextItem.left + nextItem.width / 2) + buffer;
    if (xOffset > swapOffset) target = i + 1;


  } else if (xOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevRight = prevItem.left + prevItem.width;
    const swapOffset = distance(left, prevRight - prevItem.width / 2) + buffer;
    if (xOffset < -swapOffset) target = i - 1;
  }
  console.log('ram')
  return clamp(0, positions.length, target);
};