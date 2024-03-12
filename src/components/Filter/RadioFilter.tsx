import React from 'react';
import { FormItem, Radio, RadioGroup } from '@vkontakte/vkui';

interface RadioFilterProps {
  id: string;
  title: string;
  options: Array<{ [key in 'label' | 'value']: string }>;
  onChange: (value: string) => void;
}

export const RadioFilter: React.FC<RadioFilterProps> = ({ id, title, options, onChange }) => (
  <FormItem top={title} style={{ flexBasis: '200px', flexGrow: 0 }}>
    <RadioGroup
      mode="vertical"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    >
      {options.map((option, i) => (
        <Radio key={option.value} name={`${id}`} value={option.value} defaultChecked={i === 0}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  </FormItem>
);
