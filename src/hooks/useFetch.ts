import { useEffect, useState } from 'react';
import { feedData } from '../fakeData/getData';
import getData from '../fakeData/getData';

const useFetch = (lastLi: HTMLLIElement | null) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedList, setFeedList] = useState<feedData[]>([]);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (!end) {
      setLoading(true);
      getData(page).then(list => {
        if (list && list.length === 6) {
          setFeedList([...feedList, ...list]);
        } else if (list && list.length < 6) {
          setFeedList([...feedList, ...list]);
          setLoading(false);
          setEnd(true);
        } else if (!list) {
          setLoading(false);
          setEnd(true);
        }
      });
    }
  }, [page]);

  useEffect(() => {
    if (lastLi) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            observer.disconnect();
            setPage(page + 1);
          }
        });
      });

      observer.observe(lastLi);

      return () => {
        observer.disconnect();
      };
    }
  }, [lastLi]);

  return { loading, feedList, end, page };
};

export default useFetch;
