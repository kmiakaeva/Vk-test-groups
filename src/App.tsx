import { useState, useEffect } from 'react';
import {
  AppRoot,
  PanelHeader,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  Group,
  Header,
  ScreenSpinner,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { groupsApi } from './api/groupsApi';
import { Group as GroupType } from './api/types';
import { GroupCard } from './components/GroupCard';

const App = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [popout, setPopout] = useState<React.JSX.Element | null>(null);

  const clearPopout = () => setPopout(null);

  const setLoadingScreenSpinner = () => {
    setPopout(<ScreenSpinner state="loading" />);
  };

  useEffect(() => {
    setLoadingScreenSpinner();

    const fetchData = () => {
      return groupsApi()
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

  return (
    <AppRoot>
      <SplitLayout
        header={<PanelHeader delimiter="none" />}
        popout={popout}
        aria-live="polite"
        aria-busy={!!popout}
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              {error && <Header mode="secondary">{error}</Header>}
              {!error && (
                <Group header={<Header mode="secondary">Groups</Header>}>
                  {groups?.map((group: GroupType) => (
                    <GroupCard key={group.id} {...group} />
                  ))}
                </Group>
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
