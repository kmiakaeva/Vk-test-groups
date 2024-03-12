import { useCallback, useState } from 'react';

const useModalHistory = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currModalHistory, setCurrModalHistory] = useState<string[]>([]);

  const changeActiveModal = useCallback(
    (currActiveModal: string | null) => {
      currActiveModal = currActiveModal || null;

      let localModalHistory = currModalHistory;

      if (currActiveModal === null) {
        localModalHistory = [];
      } else if (currModalHistory.includes(currActiveModal)) {
        localModalHistory = localModalHistory.slice(
          0,
          localModalHistory.indexOf(currActiveModal) + 1,
        );
      } else {
        localModalHistory.push(currActiveModal);
      }

      setActiveModal(currActiveModal);
      setCurrModalHistory(localModalHistory);
    },
    [currModalHistory, setActiveModal, setCurrModalHistory],
  );

  const modalBack = useCallback(() => {
    changeActiveModal(currModalHistory[currModalHistory.length - 2]);
  }, [changeActiveModal, currModalHistory]);

  return { activeModal, changeActiveModal, modalBack };
};

export default useModalHistory;
