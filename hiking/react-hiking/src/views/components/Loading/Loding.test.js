import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('<Loading />', () => {
  it('renders the loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
