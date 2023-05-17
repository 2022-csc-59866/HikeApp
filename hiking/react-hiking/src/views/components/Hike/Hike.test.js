// Import react testing methods.
import {render, screen} from '@testing-library/react'
//Simulate router
import { MemoryRouter} from 'react-router-dom';
// Import Jest matchers.
import '@testing-library/jest-dom'
// Import the components to test.
import { Hike } from './Hike.js'

// Add scaffolding for unit tests.
describe('<Hike />', () => {
  it('displays trail length', () => {
      const hike = {
          name: 'Hike 1',
          lon: 123.456,
          lat: 78.9,
          city: 'City',
          state: 'State',
          country: 'Country',
          miles: '10',
          apiId: 'hike-1',
        };

    render(
      <MemoryRouter>
        <Hike hike={hike} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('trail-length')).toHaveTextContent('10');
  });
  
  it('displays trail coordinates', () => {
      const hike = {
          name: 'Hike 1',
          lon: 123.456,
          lat: 78.9,
          city: 'City',
          state: 'State',
          country: 'Country',
          miles: '10',
          apiId: 'hike-1',
        };

    render(
      <MemoryRouter>
        <Hike hike={hike} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('trail-coordinates')).toHaveTextContent("Coordinates: 78.9, 123.456");
  });

  it('displays trail location', () => {
      const hike = {
          name: 'Hike 1',
          lon: 123.456,
          lat: 78.9,
          city: 'City',
          state: 'State',
          country: 'Country',
          miles: '10',
          apiId: 'hike-1',
        };

      render(
        <MemoryRouter>
          <Hike hike={hike}/>
        </MemoryRouter>
      );
      expect(screen.getByTestId('trail-location')).toHaveTextContent('City, State, Country');
    });

    it('renders thumbnail if available', () => {
      const hike = {
      name: 'Hike 1',
      thumbnail: 'path/to/thumbnail.jpg',
      lon: 123.456,
      lat: 78.9,
      city: 'City',
      state: 'State',
      country: 'Country',
      miles: "10",
      apiId: 'hike-1'
      };
  
      const { getByTestId } = render(
          <MemoryRouter>
            <Hike hike={hike} />
            </MemoryRouter>
        );
      const thumbnail = getByTestId('trail-thumbnail');
      expect(thumbnail).toBeInTheDocument();
    });
  });