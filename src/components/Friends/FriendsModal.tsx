import React from 'react';
import {
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderButton,
  PanelHeaderClose,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

import { Group as IGroup } from '../../api/types';
import { FriendsList } from './FriendsList';

interface FriendsModalProps {
  activeModal: string | null;
  modalBack: () => void;
  selectedGroup: IGroup;
}

export const FriendsModal: React.FC<FriendsModalProps> = ({
  activeModal,
  modalBack,
  selectedGroup,
}) => {
  const platform = usePlatform();
  const { sizeX } = useAdaptivityConditionalRender();
  const { friends = [] } = selectedGroup || {};

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
        {friends && friends.length > 0 && <FriendsList friends={friends} />}
      </ModalPage>
    </ModalRoot>
  );
};
