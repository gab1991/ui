import { render, screen } from '@testing-library/react';

import { ProjectTemplate } from './ProjectTemplate';

describe('ProjectTemplate tests', () => {
  it('renders learn react link', () => {
    const mockFn = jest.fn();

    render(<ProjectTemplate onProjectSave={mockFn} onTemplateRemove={mockFn} templateId={0} />);

    expect(screen.queryByText(/Save/i)).toBeInTheDocument();
  });
});
