import ReactSelect, { type Props as ReactSelectProps, type GroupBase } from 'react-select';
import { cn } from '@shared/lib';
import { selectStyles, type SelectOption } from './selectStyles';
import styles from './Select.module.css';

type SelectProps = Omit<ReactSelectProps<SelectOption, false, GroupBase<SelectOption>>, 'styles'>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <ReactSelect<SelectOption, false, GroupBase<SelectOption>>
      styles={selectStyles}
      isSearchable
      isClearable
      classNamePrefix="foodies-select"
      className={cn(styles.select, className)}
      {...props}
    />
  );
}

export type { SelectOption };
