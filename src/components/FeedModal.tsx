import styled from 'styled-components';
import { useAppSelector } from '../redux/hooks';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);

  ul.modal {
    max-width: 400px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.modalBg};
    border-radius: 10px;
    overflow: hidden;

    li {
      text-align: center;
      padding: 20px;
      cursor: pointer;
      border-bottom: 1px solid lightgray;

      &:last-of-type {
        border: none;
      }
    }
  }
`;

type IFeedModal = {
  closeModal: React.MouseEventHandler<HTMLDivElement>;
  selectedFeed: number | null;
};

const FeedModal = ({ closeModal, selectedFeed }: IFeedModal) => {
  return (
    <StyledModal onClick={closeModal}>
      <ul className='modal'>
        <li>{selectedFeed}번째 피드 신고</li>
        <li>팔로우 하기</li>
        <li>퍼가기</li>
        <li>취소</li>
      </ul>
    </StyledModal>
  );
};

export default FeedModal;
