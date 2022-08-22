import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [selectedFeed, setSeletedFeed] = useState<number | null>(null);

  const openModal = (idx: number) => {
    setSeletedFeed(idx);
    setModal(true);
  };

  const closeModal: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target instanceof Element && (!e.target.closest('ul.modal') || e.target.closest('li:last-of-type'))) {
      setSeletedFeed(null);
      setModal(false);
    }
  };

  return { modal, selectedFeed, openModal, closeModal };
};
export default useModal;
