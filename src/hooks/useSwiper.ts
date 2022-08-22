import { useRef, useEffect, useState } from 'react';

const useSwiper = (list: any[] | undefined) => {
  const swipedTarget = useRef<HTMLDivElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(0);
  const oldTrans = useRef(0);
  const start = useRef(0);
  const trans = useRef(0);
  const clicked = useRef(false);

  useEffect(() => {
    if (list) {
      const clickStart = ({ clientX }: MouseEvent) => {
        clicked.current = true;
        start.current = clientX;

        if (swipedTarget.current) {
          swipedTarget.current.style.transition = '0s';
        }
      };

      const clickMove = ({ clientX }: MouseEvent) => {
        if (clicked.current) {
          trans.current = clientX - start.current + oldTrans.current;

          if (swipedTarget.current) {
            swipedTarget.current.style.transform = `translateX(${trans.current}px)`;
          }
        }
      };

      const clickEnd = () => {
        if (clicked.current) {
          if (swipedTarget.current) {
            swipedTarget.current.style.transition = '0.3s';

            const width = swipedTarget.current.getBoundingClientRect().width / list.length;

            if (trans.current > -width * 0.5) {
              trans.current = 0;
              setPage(0);
            }

            list.forEach((_, i) => {
              if (trans.current <= -width * (i + 0.5) && trans.current > -width * (i + 1.5)) {
                trans.current = -width * (i + 1);
                setPage(i + 1);
              }
            });

            if (trans.current <= -width * (list.length - 1.5)) {
              trans.current = -width * (list.length - 1);
              setPage(list.length - 1);
            }

            swipedTarget.current.style.transform = `translateX(${trans.current}px)`;
          }

          oldTrans.current = trans.current;
          clicked.current = false;
        }
      };

      const prevSlide = () => {
        if (page > 0 && swipedTarget.current) {
          swipedTarget.current.style.transition = '0.3s';

          const width = swipedTarget.current.getBoundingClientRect().width / list.length;
          trans.current = -width * (page - 1);
          swipedTarget.current.style.transform = `translateX(${trans.current}px)`;
          oldTrans.current = trans.current;

          setPage(page - 1);
        }
      };

      const nextSlide = () => {
        if (page < list.length - 1 && swipedTarget.current) {
          swipedTarget.current.style.transition = '0.3s';

          const width = swipedTarget.current.getBoundingClientRect().width / list.length;

          trans.current = -width * (page + 1);
          swipedTarget.current.style.transform = `translateX(${trans.current}px)`;
          oldTrans.current = trans.current;

          setPage(page + 1);
        }
      };

      swipedTarget.current?.addEventListener('mousedown', clickStart);
      swipedTarget.current?.addEventListener('mousemove', clickMove);
      swipedTarget.current?.addEventListener('mouseup', clickEnd);
      swipedTarget.current?.addEventListener('mouseleave', clickEnd);
      prevBtn.current?.addEventListener('click', prevSlide);
      nextBtn.current?.addEventListener('click', nextSlide);

      return () => {
        swipedTarget.current?.removeEventListener('mousedown', clickStart);
        swipedTarget.current?.removeEventListener('mousemove', clickMove);
        swipedTarget.current?.removeEventListener('mouseup', clickEnd);
        swipedTarget.current?.removeEventListener('mouseleave', clickEnd);
        prevBtn.current?.removeEventListener('click', prevSlide);
        nextBtn.current?.removeEventListener('click', nextSlide);
      };
    }
  }, [list, page]);

  return { swipedTarget, prevBtn, nextBtn, page };
};

export default useSwiper;
