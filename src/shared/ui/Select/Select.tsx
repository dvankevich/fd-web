import ReactSelect, {
  type Props as ReactSelectProps,
  type GroupBase,
} from 'react-select';
import { selectStyles } from './selectStyles';

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps
  extends Omit<
    ReactSelectProps<SelectOption, false, GroupBase<SelectOption>>,
    'styles'
  > {
  // можна додавати свої пропси за потреби
}

export function Select(props: SelectProps) {
  return (
    <ReactSelect
      styles={selectStyles}
      isSearchable
      isClearable
      classNamePrefix="foodies-select"
      {...props}
    />
  );
}
