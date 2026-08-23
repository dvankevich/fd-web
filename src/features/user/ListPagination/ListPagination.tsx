import { RecipePagination } from '@features/recipes';

interface ListPaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export const ListPagination = ({ page, total, limit, onChange }: ListPaginationProps) => (
  <RecipePagination page={page} total={total} limit={limit} onChange={onChange} />
);
