import React from 'react';
import { FormItem, Select } from '@vkontakte/vkui';

interface SelectFilterProps {
  id: string;
  title: string;
  placeholder: string;
  options: Array<{ [key in 'label' | 'value']: string }>;
  selectedValue: string;
  onChange: (value: string) => void;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  id,
  title,
  placeholder,
  options,
  selectedValue,
  onChange,
}) => (
  <FormItem top={title} htmlFor={id}>
    <Select
      id={id}
      placeholder={placeholder}
      options={options}
      onChange={(e) => onChange(e.target.value)}
      value={selectedValue}
      autoHideScrollbar
    />
  </FormItem>
);
