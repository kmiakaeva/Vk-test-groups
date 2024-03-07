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

import GroupsData from './data/groups.json';
import { Group as GroupType } from './data/types';
import { GroupCard } from './components/GroupCard';

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <Group header={<Header mode="secondary">Groups</Header>}>
                {GroupsData.map((group: GroupType) => (
                  <GroupCard key={group.id} {...group} />
                ))}
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
