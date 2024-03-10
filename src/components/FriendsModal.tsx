import React from 'react';
import {
  Avatar,
  Footnote,
  Group,
  Header,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderButton,
  PanelHeaderClose,
  SimpleCell,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

import { Group as IGroup, User } from '../api/types';

interface FriendsModalProps {
  activeModal: string | null;
  changeActiveModal: (activeModal: string) => void;
  modalHistory: string[];
  selectedGroup: IGroup;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  activeModal,
  changeActiveModal,
  modalHistory,
  selectedGroup,
}) => {
  const platform = usePlatform();
  const { sizeX } = useAdaptivityConditionalRender();
  const { friends } = selectedGroup;

  const userFriends = friends && (
    <React.Fragment>
      <Group
        header={
          <Header mode="secondary" indicator={<Footnote>{friends.length}</Footnote>}>
            Друзья
          </Header>
        }
      >
        {friends.map((friend: User, i: number) => (
          <SimpleCell key={i} before={<Avatar size={48} />}>
            {friend.first_name} {friend.last_name}
          </SimpleCell>
        ))}
      </Group>
    </React.Fragment>
  );

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
  };

  const renderAndroidCloseButton = sizeX.compact && platform === 'android' && (
    <PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />
  );

  const renderIOSCloseButton = platform === 'ios' && (
    <PanelHeaderButton onClick={modalBack}>
      <Icon24Dismiss />
    </PanelHeaderButton>
  );

  return (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
      <ModalPage
        id="fullscreen"
        onClose={modalBack}
        settlingHeight={100}
        hideCloseButton={platform === 'ios'}
        header={
          <ModalPageHeader
            before={renderAndroidCloseButton}
            after={renderIOSCloseButton}
          ></ModalPageHeader>
        }
      >
        {userFriends}
      </ModalPage>
    </ModalRoot>
  );
};
