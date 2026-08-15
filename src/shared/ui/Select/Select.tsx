import ReactSelect, {
  type Props as ReactSelectProps,
  type GroupBase,
} from 'react-select';
import { selectStyles, type SelectOption } from './selectStyles';

interface SelectProps
  extends Omit<
    ReactSelectProps<SelectOption, false, GroupBase<SelectOption>>,
    'styles'
  > {}

export function Select(props: SelectProps) {
  return (
    <ReactSelect<SelectOption, false, GroupBase<SelectOption>>
      styles={selectStyles}
      isSearchable
      isClearable
      classNamePrefix="foodies-select"
      {...props}
    />
  );
}

export type { SelectOption };
