import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserCard } from '@features/user/UserCard/UserCard';
import type { UserCardData } from '@features/user/types';

const mocks = vi.hoisted(() => ({
  isFollowing: false,
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');

  return {
    ...actual,
    useSelector: (selector: (state: unknown) => unknown) => selector({}),
  };
});

vi.mock('@features/user/selectors', () => ({
  selectIsFollowing: () => mocks.isFollowing,
}));

const data: UserCardData = {
  id: 'user-42',
  name: 'John Smith',
  avatar: null,
  ownRecipesCount: 12,
  recipes: Array.from({ length: 5 }, (_, index) => ({
    id: `recipe-${index + 1}`,
    title: `Recipe ${index + 1}`,
    thumb: null,
    preview: null,
  })),
};

interface RenderCardOptions {
  busy?: boolean;
  showRecipes?: boolean;
  onToggleFollow?: (id: string) => void;
}

function renderCard({
  busy = false,
  showRecipes = true,
  onToggleFollow = vi.fn(),
}: RenderCardOptions = {}) {
  render(
    <MemoryRouter>
      <UserCard data={data} busy={busy} showRecipes={showRecipes} onToggleFollow={onToggleFollow} />
    </MemoryRouter>,
  );
}

describe('UserCard', () => {
  beforeEach(() => {
    mocks.isFollowing = false;
  });

  it('renders user information', () => {
    renderCard();

    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Own recipes: 12')).toBeInTheDocument();
    expect(screen.getByAltText('John Smith')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });

  it('calls onToggleFollow with user id', async () => {
    const user = userEvent.setup();
    const onToggleFollow = vi.fn();
    renderCard({ onToggleFollow });

    await user.click(screen.getByRole('button', { name: 'Follow' }));

    expect(onToggleFollow).toHaveBeenCalledWith('user-42');
    expect(onToggleFollow).toHaveBeenCalledTimes(1);
  });

  it('shows Unfollow for an already followed user', () => {
    mocks.isFollowing = true;
    renderCard();

    expect(screen.getByRole('button', { name: 'Unfollow' })).toBeInTheDocument();
  });

  it('disables the follow button while an action is in progress', () => {
    renderCard({ busy: true });

    expect(screen.getByRole('button', { name: 'Follow' })).toBeDisabled();
  });

  it('renders no more than four recipe previews', () => {
    renderCard({ showRecipes: true });

    expect(screen.getByAltText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByAltText('Recipe 4')).toBeInTheDocument();
    expect(screen.queryByAltText('Recipe 5')).not.toBeInTheDocument();
  });

  it('hides recipe previews when showRecipes is false', () => {
    renderCard({ showRecipes: false });

    expect(screen.queryByAltText('Recipe 1')).not.toBeInTheDocument();
  });
});
