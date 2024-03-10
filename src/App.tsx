import React, { useState, useEffect } from 'react';
import {
  AppRoot,
  PanelHeader,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  Group,
  ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { groupsApi } from './api/groupsApi';
import { Group as IGroup } from './api/types';
import { GroupCard } from './components/GroupCard';
import { FriendsModal } from './components/FriendsModal';

const App: React.FC = () => {
  const [popout, setPopout] = useState<React.JSX.Element | null>(null);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>({} as IGroup);
  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);

  const clearPopout = () => setPopout(null);

  const setLoadingScreenSpinner = () => {
    setPopout(<ScreenSpinner state="loading" />);
  };

  useEffect(() => {
    setLoadingScreenSpinner();

    const fetchData = () => {
      groupsApi()
        .then((data) => setGroups(data.data || []))
        .catch((error) => {
          if (error instanceof Error) {
            setError(error.message);
          }
        })
        .finally(clearPopout);
    };

    fetchData();
  }, []);

  const changeActiveModal = (activeModal: string | null) => {
    activeModal = activeModal || null;
    let localModalHistory = modalHistory ? [...modalHistory] : [];

    if (activeModal === null) {
      localModalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
    } else {
      localModalHistory.push(activeModal);
    }

    setActiveModal(activeModal);
    setModalHistory(localModalHistory);
  };

  return (
    <AppRoot>
      <SplitLayout
        header={<PanelHeader delimiter="none" />}
        modal={
          <FriendsModal
            activeModal={activeModal}
            changeActiveModal={changeActiveModal}
            modalHistory={modalHistory}
            selectedGroup={selectedGroup}
          />
        }
        popout={popout}
        aria-live="polite"
        aria-busy={!!popout}
      >
        <SplitCol autoSpaced>
          <View activePanel={'groups'}>
            <Panel id="groups">
              <PanelHeader>Groups</PanelHeader>
              {error && <Group header={error} />}
              {!error &&
                groups.length > 0 &&
                groups.map((group: IGroup) => (
                  <GroupCard
                    key={group.id}
                    changeActiveModal={changeActiveModal}
                    setSelectedGroup={setSelectedGroup}
                    {...group}
                  />
                ))}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
