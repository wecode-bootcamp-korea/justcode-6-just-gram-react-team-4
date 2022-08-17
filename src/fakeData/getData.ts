import data from './data.json';

export type feedData = {
  title: string;
  content: string;
  userId: number;
  feedId: number;
  commentList?: {
    commentId: number;
    userId: number;
    commentMain: string;
  }[];
  images?: string[];
};

// 테스트용 Promise

const getData = (page: number) =>
  new Promise<feedData[]>(res => {
    setTimeout(() => res(data[page]), 1000);
  });

export default getData;
