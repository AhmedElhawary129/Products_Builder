/**
 *
 * @param {string} text - the input text to be sliced.
 * @param {number} [maxLength=50] - the maximum length before truncation.
 * @returns The sliced text, with an ellipsis (...) appended if truncated.
 */
export function textSlicer(text: string, maxLength: number = 50) {
  if (text.length >= maxLength) {
    return `${text.slice(0, maxLength)} ...`;
  } else {
    return text;
  }
}
