import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@shared/ui/Button/Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save recipe</Button>);

    expect(screen.getByRole('button', { name: 'Save recipe' })).toBeInTheDocument();
  });

  it('calls onClick when the user clicks the button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards native button attributes', () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });
});
