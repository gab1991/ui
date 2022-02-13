import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProjectTemplate } from './ProjectTemplate';

jest.spyOn(window, 'alert').mockImplementation(() => null);

describe('ProjectTemplate tests', () => {
  it('renders element in the dom', () => {
    const mockFn = jest.fn();

    render(<ProjectTemplate onProjectSave={mockFn} onTemplateRemove={mockFn} templateId={0} />);

    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });

  it('grabs focus on render', () => {
    const mockFn = jest.fn();

    render(<ProjectTemplate onProjectSave={mockFn} onTemplateRemove={mockFn} templateId={0} />);
    const input = screen.queryByPlaceholderText(/Project name/i);

    expect(input).toHaveFocus();
  });

  it('calls onProjectSave if url matches github regex', async () => {
    const onProjectSave = jest.fn();
    const mockFn = jest.fn();
    const testProjectLink = 'https://github.com/ssss/retro-game-collection-app';

    render(<ProjectTemplate onProjectSave={onProjectSave} onTemplateRemove={mockFn} templateId={0} />);

    const input = screen.getByPlaceholderText(/Project link/i);
    userEvent.type(input, testProjectLink);

    await waitFor(() => {
      const btn = screen.getByText(/Save/i);
      userEvent.click(btn);
    });

    expect(onProjectSave).toHaveBeenCalledTimes(1);
  });

  it('dosent call onProjectSave if url dosent matches github regex', async () => {
    const onProjectSave = jest.fn();
    const mockFn = jest.fn();
    const testProjectLink = 'testurl';

    render(<ProjectTemplate onProjectSave={onProjectSave} onTemplateRemove={mockFn} templateId={0} />);

    const input = screen.getByPlaceholderText(/Project link/i);
    userEvent.type(input, testProjectLink);

    await waitFor(() => {
      const btn = screen.getByText(/Save/i);
      userEvent.click(btn);
    });

    expect(onProjectSave).toHaveBeenCalledTimes(0);
  });
});
