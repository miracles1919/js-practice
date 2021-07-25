import { useRef, useEffect, useState } from 'react';
/**
 * const [text, domRef] = useEllipsis('', 3)
 * <div ref={domRef}>{text}</div>
 */
export default function useEllipsis(text, line) {
  const dom = useRef(null);
  const [formatText, setFormatText] = useState(text);

  useEffect(() => {
    const textLen = text.length;

    const format = () => {
      const baseWidth = window.getComputedStyle(dom).width;
      const baseFontSize = window.getComputedStyle(dom).fontSize;
      const lineWidth = baseWidth.slice(0, -2);
      const fontWidth = baseFontSize.slice(0, -2);
      const strNum = Math.floor(lineWidth / fontWidth);
      let content = text;
      const totalNum = Math.floor(strNum * line);
      const lastIndex = totalNum - textLen;
      if (textLen > totalNum) {
        content = text.slice(0, lastIndex - 2).concat('...');
      }
      setFormatText(content);
    };

    format();

    window.addEventListener('resize', format);

    return function () {
      window.removeEventListener('resize', format);
    };
  }, []);

  return [formatText, dom];
}
