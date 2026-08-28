import type { StylesConfig, GroupBase } from 'react-select';

export type SelectOption = {
  value: string;
  label: string;
};

export const selectStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  control: (base, state) => ({
    ...base,
    padding: '11px 14px',
    borderRadius: 'var(--radius-pill)',
    background: 'transparent',
    border: state.isFocused ? '1px solid var(--main-black-20)' : '1px solid var(--border-grey-12)',
    boxShadow: 'none',
    minHeight: 'auto',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'var(--main-black-20)',
    },
    '@media (min-width: 768px)': {
      padding: '11px 18px',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--text-grey)',
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
    border: '1px solid var(--main-black-20)',
    borderRadius: 'var(--radius-15)',
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
    backgroundColor: state.isSelected || state.isFocused ? 'var(--main-black-10)' : 'transparent',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'var(--main-black-10)',
    },
    '@media (min-width: 768px)': {
      fontSize: '16px',
    },
  }),
};
