import data from './data.json';

export type feedData = {
  title: string;
  content: string;
  userId: number;
  feedId: number;
};

const getData = (page: number) =>
  new Promise<feedData[]>(res => {
    setTimeout(() => res(data[page]), 2000);
  });

export default getData;
