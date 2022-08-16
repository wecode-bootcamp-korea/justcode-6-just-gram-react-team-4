import { useEffect, useRef, useState } from 'react';

const useScrollDetector = () => {
  const [isDown, setIsDown] = useState(true);
  const [scrollOver, setScrollOver] = useState(false);
  const oldScroll = useRef(0);
  const newScroll = useRef(0);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 30) {
        setScrollOver(true);
      } else {
        setScrollOver(false);
      }

      newScroll.current = window.scrollY;

      if (newScroll.current > oldScroll.current) {
        setIsDown(true);
      } else if (newScroll.current < oldScroll.current) {
        setIsDown(false);
      }
      oldScroll.current = newScroll.current;
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return { isDown, scrollOver };
};

export default useScrollDetector;
