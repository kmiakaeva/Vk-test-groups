import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { FormLayoutGroup, Group, Header } from '@vkontakte/vkui';

import { Group as IGroup } from '../../api/types';
import { RadioFilter } from './RadioFilter';
import { SelectFilter } from './SelectFilter';

interface GroupsFilterProps {
  setFilteredGroups: Dispatch<SetStateAction<IGroup[]>>;
  groups: IGroup[];
}

interface SelectedFilters {
  [key: string]: string;
}

const getFilteredGroups = (groups: IGroup[], selectedFilters: SelectedFilters) =>
  groups.filter(({ closed, avatar_color, friends }: IGroup) => {
    const { privacyType, avatarColor, friendStatus } = selectedFilters;
    const hasFriends = !!friends && friends.length > 0;

    return (
      (privacyType === 'all' || closed === (privacyType === 'closed')) &&
      (avatarColor === 'all' || avatar_color === avatarColor) &&
      (friendStatus === 'all' || hasFriends === (friendStatus === 'yes'))
    );
  });

export const GroupsFilter: React.FC<GroupsFilterProps> = ({ setFilteredGroups, groups }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    privacyType: 'all',
    avatarColor: 'all',
    friendStatus: 'all',
  });

  const filteredGroups = useMemo(
    () => getFilteredGroups(groups, selectedFilters),
    [groups, selectedFilters],
  );

  useEffect(() => {
    setFilteredGroups(filteredGroups);
  }, [groups, setFilteredGroups, filteredGroups]);

  const handleFilterChange = useCallback((filterKey: string, value: string) => {
    setSelectedFilters((prevSelectedFilters) => ({ ...prevSelectedFilters, [filterKey]: value }));
  }, []);

  return (
    <Group header={<Header mode="secondary">Фильтры</Header>}>
      <FormLayoutGroup mode="horizontal">
        <RadioFilter
          id="privacy-type"
          title="Тип приватности"
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Открытая', value: 'open' },
            { label: 'Закрытая', value: 'closed' },
          ]}
          onChange={(value) => handleFilterChange('privacyType', value)}
        />
        <SelectFilter
          id="avatar-color"
          title="Цвет аватарки"
          placeholder="Не задан"
          options={[
            { label: 'Любой', value: 'all' },
            { label: 'Красный', value: 'red' },
            { label: 'Зелёный', value: 'green' },
            { label: 'Жёлтый', value: 'yellow' },
            { label: 'Синий', value: 'blue' },
            { label: 'Фиолетовый', value: 'purple' },
            { label: 'Белый', value: 'white' },
            { label: 'Оранжевый', value: 'orange' },
          ]}
          selectedValue={selectedFilters.avatarColor}
          onChange={(value) => handleFilterChange('avatarColor', value)}
        />
        <SelectFilter
          id="friend-status"
          title="Наличие друзей"
          placeholder="Не задан"
          options={[
            { label: 'Все', value: 'all' },
            { label: 'Есть', value: 'yes' },
            { label: 'Нет', value: 'no' },
          ]}
          selectedValue={selectedFilters.friendStatus}
          onChange={(value) => handleFilterChange('friendStatus', value)}
        />
      </FormLayoutGroup>
    </Group>
  );
};
