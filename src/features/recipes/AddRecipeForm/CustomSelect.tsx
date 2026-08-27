import { useEffect, useRef, useState } from 'react';
import { cn } from '@shared/lib';
import { FieldLabel, FormError } from '@shared/ui';
import sprite from '@/assets/icons.svg';
import type { Option } from '../../../types/recipe';
import css from './CustomSelect.module.css';

type Props = {
  label?: string;
  value: string;
  options: Option[];
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find((item) => String(item._id) === String(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    const id = String(option._id);
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className={css.selectWrap} ref={wrapperRef}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <button
        type="button"
        className={cn(css.select, error && css.invalid)}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={!selected ? css.placeholder : ''}>{selected?.name ?? placeholder}</span>

        <svg className={cn(css.chevron, isOpen && css.chevronOpen)} aria-hidden="true">
          <use href={`${sprite}#icon-chevron-down`} />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.options}>
          {options.length === 0 ? (
            <li>
              <span>No options available</span>
            </li>
          ) : (
            options.map((item) => (
              <li key={String(item._id)}>
                <button type="button" onClick={() => handleSelect(item)}>
                  {item.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <FormError variant="compact">{error}</FormError>
    </div>
  );
}
