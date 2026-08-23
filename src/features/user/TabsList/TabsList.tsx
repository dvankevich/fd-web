import { useSelector } from 'react-redux';
import { cn } from '@shared/lib';
import { visibleTabs } from '../lib';
import { selectIsOwner } from '../selectors';
import type { TabKey } from '../types';
import styles from './TabsList.module.css';

interface TabsListProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

export const TabsList = ({ active, onChange }: TabsListProps) => {
  const isOwner = useSelector(selectIsOwner);
  const tabs = visibleTabs(isOwner);

  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active === key}
          className={cn(styles.tab, active === key && styles.active)}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
