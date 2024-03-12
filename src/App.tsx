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
  Header,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { groupsApi } from './api/groupsApi';
import { Group as IGroup } from './api/types';
import useModalHistory from './hooks/useModalHistory';

import { GroupCard } from './components/GroupCard';
import { FriendsModal } from './components/Friends/FriendsModal';
import { GroupsFilter } from './components/Filter/GroupsFilter';

const App: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [popout, setPopout] = useState<React.JSX.Element | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { activeModal, changeActiveModal, modalBack } = useModalHistory();

  const clearPopout = () => setPopout(null);

  const setLoadingScreenSpinner = () => {
    setPopout(<ScreenSpinner state="loading" />);
  };

  useEffect(() => {
    setLoadingScreenSpinner();

    const fetchData = () => {
      groupsApi()
        .then((response) => {
          const data = response.data;
          if (!data || data.length === 0) {
            throw new Error('Данные отсутствуют');
          }
          setGroups(data);
        })
        .catch((error) => {
          if (error instanceof Error) {
            setError(error.message);
          }
        })
        .finally(clearPopout);
    };

    fetchData();
  }, []);

  const selectedGroup = groups.find((group: IGroup) => group.id === selectedGroupId) as IGroup;

  return (
    <AppRoot>
      <SplitLayout
        header={<PanelHeader delimiter="none" />}
        modal={
          <FriendsModal
            activeModal={activeModal}
            modalBack={modalBack}
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
              <PanelHeader>Сообщества</PanelHeader>
              {error && <Group header={<Header mode="secondary">{error}</Header>} />}
              {!error && groups.length > 0 && (
                <>
                  <GroupsFilter setFilteredGroups={setFilteredGroups} groups={groups} />
                  {filteredGroups.map((group: IGroup) => (
                    <GroupCard
                      key={group.id}
                      changeActiveModal={changeActiveModal}
                      setSelectedGroupId={setSelectedGroupId}
                      {...group}
                    />
                  ))}
                </>
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
