import { useCallback, useState } from 'react';

const useModalHistory = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);

  const changeActiveModal = useCallback(
    (activeModal: string | null) => {
      activeModal = activeModal || null;
      let localModalHistory = modalHistory ? [...modalHistory] : [];

      if (activeModal === null) {
        localModalHistory = [];
      } else if (modalHistory.indexOf(activeModal) !== -1) {
        localModalHistory = localModalHistory.slice(0, localModalHistory.indexOf(activeModal) + 1);
      } else {
        localModalHistory.push(activeModal);
      }

      setActiveModal(activeModal);
      setModalHistory(localModalHistory);
    },
    [modalHistory, setActiveModal, setModalHistory],
  );

  const modalBack = useCallback(() => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
  }, [changeActiveModal, modalHistory]);

  return { activeModal, changeActiveModal, modalBack };
};

export default useModalHistory;
