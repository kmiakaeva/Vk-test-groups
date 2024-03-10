import React from 'react';
import { Avatar, Counter, Group, Header, SimpleCell } from '@vkontakte/vkui';
import {
  Icon20LockOutline,
  Icon20UnlockOutline,
  Icon20Users3Outline,
  Icon20UsersOutline,
} from '@vkontakte/icons';

import { Group as IGroup } from '../api/types';

interface GroupCardProps extends IGroup {
  changeActiveModal: (activeModal: string) => void;
  setSelectedGroup: (selectedGroup: IGroup) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  changeActiveModal,
  setSelectedGroup,
  ...group
}) => {
  const { name, avatar_color, members_count, friends, closed } = group;

  const handleClick = () => {
    setSelectedGroup({ ...group });
    changeActiveModal('fullscreen');
  };

  return (
    <Group header={<Header mode="secondary">{name}</Header>}>
      {avatar_color && (
        <SimpleCell before={<Avatar size={100} style={{ backgroundColor: avatar_color }} />} />
      )}
      <SimpleCell
        expandable="auto"
        before={closed ? <Icon20LockOutline /> : <Icon20UnlockOutline />}
      >
        {closed ? 'Закрытая' : 'Открытая'} группа
      </SimpleCell>
      <SimpleCell
        expandable="auto"
        before={<Icon20Users3Outline />}
        indicator={<Counter>{members_count}</Counter>}
      >
        Подписчики
      </SimpleCell>
      {friends && (
        <SimpleCell
          expandable="auto"
          before={<Icon20UsersOutline />}
          indicator={<Counter>{friends.length}</Counter>}
          onClick={handleClick}
        >
          Друзей в группе
        </SimpleCell>
      )}
    </Group>
  );
};
