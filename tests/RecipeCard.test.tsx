import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RecipeCard } from '@features/recipes/RecipeCard/RecipeCard';
import type { RecipeListItem } from '@shared/types';

const mocks = vi.hoisted(() => ({
  isFavorite: false,
  isDisabled: false,
  toggle: vi.fn(),
  openAuthorProfile: vi.fn(),
}));

vi.mock('@features/recipes/useRecipeFavorite', () => ({
  useRecipeFavorite: () => ({
    isFavorite: mocks.isFavorite,
    isDisabled: mocks.isDisabled,
    isPending: false,
    toggle: mocks.toggle,
  }),
}));

vi.mock('@features/recipes/useAuthorProfile', () => ({
  useAuthorProfile: () => mocks.openAuthorProfile,
}));

const recipe: RecipeListItem = {
  id: 'recipe-1',
  title: 'Tomato pasta',
  description: 'Quick pasta with tomatoes and basil',
  thumb: null,
  preview: null,
  time: '30',
  category: {
    id: 'category-1',
    name: 'Pasta',
  },
  area: {
    id: 'area-1',
    name: 'Italian',
  },
  owner: {
    id: 'user-1',
    name: 'Jane Doe',
    avatar: null,
  },
};

function renderCard() {
  return render(
    <MemoryRouter>
      <RecipeCard recipe={recipe} />
    </MemoryRouter>,
  );
}

describe('RecipeCard', () => {
  beforeEach(() => {
    mocks.isFavorite = false;
    mocks.isDisabled = false;
    mocks.toggle.mockReset();
    mocks.openAuthorProfile.mockReset();
  });

  it('renders recipe information', () => {
    renderCard();

    expect(screen.getByText('Tomato pasta')).toBeInTheDocument();
    expect(screen.getByText('Quick pasta with tomatoes and basil')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Tomato pasta')).toBeInTheDocument();
  });

  it('calls favorite toggle when favorite button is clicked', async () => {
    const user = userEvent.setup();
    renderCard();

    const button = screen.getByRole('button', {
      name: 'Add Tomato pasta to favorites',
    });

    await user.click(button);

    expect(mocks.toggle).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows active favorite state', () => {
    mocks.isFavorite = true;
    renderCard();

    const button = screen.getByRole('button', {
      name: 'Remove Tomato pasta from favorites',
    });

    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('disables favorite action while the hook reports a disabled state', () => {
    mocks.isDisabled = true;
    renderCard();

    expect(
      screen.getByRole('button', {
        name: 'Add Tomato pasta to favorites',
      }),
    ).toBeDisabled();
  });

  it('opens the author profile when the author button is clicked', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: 'Jane Doe' }));

    expect(mocks.openAuthorProfile).toHaveBeenCalledTimes(1);
  });
});
