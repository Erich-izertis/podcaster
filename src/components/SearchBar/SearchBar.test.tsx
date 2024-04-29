import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vitest.fn();
  const props = {
    onSearch: mockOnSearch,
    totalCount: 5
  };

  it('renders correctly with initial totalCount', () => {
    render(<SearchBar {...props} />);

    // Verificar que el texto del total count sea correcto
    expect(screen.getByText('5')).toBeInTheDocument();

    // Verificar que el input de búsqueda esté presente
    expect(screen.getByPlaceholderText('Filter podcasts...')).toBeInTheDocument();
  });

  it('calls the onSearch function on input change', () => {
    render(<SearchBar {...props} />);

    // Simular un cambio en el input
    const input = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(input, { target: { value: 'new podcast' } });

    // Verificar que la función onSearch fue llamada con el valor correcto
    expect(mockOnSearch).toHaveBeenCalledWith('new podcast');
  });

  it('displays a tooltip when totalCount is greater than zero', () => {
    render(<SearchBar {...props} />);

    // Asegurarse de que el tooltip esté presente cuando hay items
    expect(screen.getByRole('img', { name: 'icono-informativo' })).toBeInTheDocument();
  });

  it('does not display a tooltip when totalCount is zero', () => {
    const propsWithZeroCount = { ...props, totalCount: 0 };
    render(<SearchBar {...propsWithZeroCount} />);

    // El tooltip no debería estar presente cuando no hay items
    expect(screen.queryByRole('img', { name: 'icono-informativo' })).not.toBeInTheDocument();
  });
});
