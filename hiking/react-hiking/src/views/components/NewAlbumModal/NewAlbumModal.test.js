import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NewAlbumModal } from './NewAlbumModal';

// Mock the addNewAlbum function
jest.mock('../../../services/addNewAlbum', () => ({
    addNewAlbum: jest.fn(),
  }));

describe('<NewAlbumModal />', () => {
    it('renders the modal when open prop is true', () => {
      render(<NewAlbumModal open={true} onClose={() => {}} />);
      const modal = screen.getByTestId('new-album-modal');
      expect(modal).toBeInTheDocument();
    });
  
    it('does not render the modal when open prop is false', () => {
      render(<NewAlbumModal open={false} onClose={() => {}} />);
      const modal = screen.queryByTestId('new-album-modal');
      expect(modal).not.toBeInTheDocument();
    });
  
    it('calls the onClose callback when close button is clicked', () => {
      const onClose = jest.fn();
      render(<NewAlbumModal open={true} onClose={onClose} />);
      const closeButton = screen.getByTestId('close-modal');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  
    it('updates the albumName state when input value changes', () => {
      render(<NewAlbumModal open={true} onClose={() => {}} />);
      const albumNameInput = screen.getByTestId('album-name');
      fireEvent.change(albumNameInput, { target: { value: 'New Album' } });
      expect(albumNameInput.value).toBe('New Album');
    });
  });
  