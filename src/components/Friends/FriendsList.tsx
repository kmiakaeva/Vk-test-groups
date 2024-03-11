import {
  Avatar,
  Footnote,
  Group,
  Header,
  SimpleCell,
  calcInitialsAvatarColor,
} from '@vkontakte/vkui';

import { User } from '../../api/types';

interface FriendsListProps {
  friends: User[];
}

export const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <Group
      header={
        <Header mode="secondary" indicator={<Footnote>{friends.length}</Footnote>}>
          Друзья
        </Header>
      }
    >
      {friends.map((friend: User, i: number) => (
        <SimpleCell
          key={i}
          before={<Avatar size={48} gradientColor={calcInitialsAvatarColor(i)} />}
        >
          {friend.first_name} {friend.last_name}
        </SimpleCell>
      ))}
    </Group>
  );
};
