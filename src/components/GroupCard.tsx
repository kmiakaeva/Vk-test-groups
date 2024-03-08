import { Avatar, SimpleCell } from '@vkontakte/vkui';
import { Group } from '../api/types';

export const GroupCard: React.FC<Group> = (props) => {
  return (
    <SimpleCell
      before={
        props.avatar_color && (
          <Avatar
            size={100}
            gradientColor="custom"
            style={{ backgroundColor: props.avatar_color }}
          />
        )
      }
      subtitle={`${props.closed ? 'Закрытая' : 'Открытая'} группа`}
      expandable="auto"
      extraSubtitle={`${props.members_count ? `${props.members_count} участников` : ''}${
        props.members_count && props.friends?.length ? `, друзей: ${props.friends.length}` : ''
      }`}
    >
      {props.name}
    </SimpleCell>
  );
};
