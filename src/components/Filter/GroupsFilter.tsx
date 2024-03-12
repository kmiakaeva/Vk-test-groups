import React, { Dispatch, SetStateAction } from 'react';
import { FormLayoutGroup, Group, Header } from '@vkontakte/vkui';

import { SelectedFilters } from '../../api/types';
import { RadioFilter } from './RadioFilter';
import { SelectFilter } from './SelectFilter';

interface GroupsFilterProps {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
}

export const GroupsFilter: React.FC<GroupsFilterProps> = ({
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleFilterChange = (filterKey: string, value: string) => {
    setSelectedFilters({ ...selectedFilters, [filterKey]: value });
  };

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
