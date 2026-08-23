import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectCategories } from '@features/categories';
import { Recipes } from '@features/recipes';
import { ROUTE } from '@shared/lib';

export default function RecipesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categories = useSelector(selectCategories);

  const categoryName = searchParams.get('category');

  const selectedCategory = categories.find((category) => category.name === categoryName) ?? null;

  return <Recipes category={selectedCategory} onBack={() => navigate(ROUTE.home)} />;
}
