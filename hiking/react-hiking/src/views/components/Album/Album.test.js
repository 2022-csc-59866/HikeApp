// Import react testing methods.
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
//Simulate router
import { MemoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
// Import Jest matchers.
import '@testing-library/jest-dom'
// Import the components to test.
import { Album } from './Album.js'

// Add scaffolding for unit tests.
describe('<Album />', () => {
    it('displays album-cover', () => {
      render(
        <MemoryRouter>
          <Album albumId="1" albumName="Hikes Near Me" coverUrl="album1.jpg" />
        </MemoryRouter>
      );
      expect(screen.getByTestId('album-cover')).toHaveAttribute('src', 'album1.jpg');
    });
  
    it('displays album-name', () => {
      render(
        <MemoryRouter>
          <Album albumId="1" albumName="Hikes Near Me" coverUrl="album1.jpg" />
        </MemoryRouter>
      );
      expect(screen.getByTestId('album-name')).toHaveTextContent('Hikes Near Me');
    });
  
    it('redirect to an album page', async () => {
      const history = createMemoryHistory();
      render(
        <MemoryRouter>
          <Album albumId="1" albumName="Album 1" coverUrl="album1.jpg" />
        </MemoryRouter>
      );
  
      fireEvent.click(screen.getByTestId('link-to-new-album-page'));
      await waitFor(() => {
        expect(screen.getByTestId('album-name')).toHaveTextContent('Album 1');
      });
    });
  });