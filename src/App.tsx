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

import { GetGroupsResponse, Group as GroupType } from './data/types';
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
    const fetchData = async () => {
      try {
        setLoadingScreenSpinner();
        // add fake delay
        await new Promise((resolve) => setTimeout(resolve, 1010));

        const response = await fetch('src/data/groups.json');
        const data = await response.json();

        const transformedData: GetGroupsResponse = {
          result: 1,
          data: data.map((group: GroupType) => ({
            ...group,
          })),
        };

        setGroups(transformedData.data || []);
      } catch (error) {
        setError('Произошла ошибка при загрузке данных');
      } finally {
        clearPopout();
      }
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
