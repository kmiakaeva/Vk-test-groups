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
import { Group as IGroup, SelectedFilters } from './api/types';
import useModalHistory from './hooks/useModalHistory';

import { GroupCard } from './components/GroupCard';
import { FriendsModal } from './components/Friends/FriendsModal';
import { GroupsFilter } from './components/Filter/GroupsFilter';

const App: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    privacyType: 'all',
    avatarColor: 'all',
    friendStatus: 'all',
  });

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

  const selectedGroup = groups.find((group: IGroup) => group.id === selectedGroupId) as IGroup;

  const filteredGroups = groups.filter(({ closed, avatar_color, friends }: IGroup) => {
    const { privacyType, avatarColor, friendStatus } = selectedFilters;
    const hasFriends = !!friends && friends.length > 0;

    return (
      (privacyType === 'all' || closed === (privacyType === 'closed')) &&
      (avatarColor === 'all' || avatar_color === avatarColor) &&
      (friendStatus === 'all' || hasFriends === (friendStatus === 'yes'))
    );
  });

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
              {error && <Group header={error} />}
              {!error && groups.length > 0 && (
                <>
                  <GroupsFilter
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                  />
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
