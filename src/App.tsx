import { useState, useEffect } from 'react';
import {
  AppRoot,
  PanelHeader,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  Group,
  usePlatform,
  Header,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { GetGroupsResponse, Group as GroupType } from './data/types';
import { GroupCard } from './components/GroupCard';

const App = () => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const platform = usePlatform();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('src/data/groups.json');
        const data = await response.json();

        const transformedData: GetGroupsResponse = {
          result: 1,
          data: data.map((group: GroupType) => ({
            ...group,
          })),
        };

        setTimeout(() => {
          setGroups(transformedData.data || []);
        }, 1010);
      } catch (error) {
        setError('Произошла ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <Group header={<Header mode="secondary">Groups</Header>}>
                {loading && <p>Загрузка....</p>}
                {loading && error && <p>{error}</p>}
                {!loading &&
                  groups?.map((group: GroupType) => <GroupCard key={group.id} {...group} />)}
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
