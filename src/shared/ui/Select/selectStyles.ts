import type { StylesConfig, GroupBase } from 'react-select';

export type SelectOption = {
  value: string;
  label: string;
};

export const selectStyles: StylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  control: (base, state) => ({
    ...base,
    padding: '11px 14px',
    borderRadius: '30px',
    background: 'transparent',
    border: state.isFocused
      ? '1px solid rgba(5, 5, 5, 0.2)'
      : '1px solid rgba(5, 5, 5, 0.12)',
    boxShadow: 'none',
    minHeight: 'auto',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'rgba(5, 5, 5, 0.2)',
    },
    '@media (min-width: 768px)': {
      padding: '11px 18px',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgba(5, 5, 5, 0.6)',
    margin: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--main-black)',
    margin: 0,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    margin: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    color: 'var(--main-black)',
    '&:hover': {
      color: 'var(--main-black)',
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: 4,
    padding: '13px 0',
    border: '1px solid rgba(5, 5, 5, 0.2)',
    borderRadius: '15px',
    boxShadow: 'none',
    overflow: 'hidden',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    padding: '6px 18px',
    fontSize: '14px',
    color: 'var(--main-black)',
    backgroundColor:
      state.isSelected || state.isFocused ? 'rgba(5, 5, 5, 0.1)' : 'transparent',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'rgba(5, 5, 5, 0.1)',
    },
    '@media (min-width: 768px)': {
      fontSize: '16px',
    },
  }),
};
