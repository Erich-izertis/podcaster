import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  const testUrl = 'http://example.com/audio.mp3';

  it('debe mostrar un indicador de carga hasta que el audio esté cargado', () => {
    render(<AudioPlayer url={testUrl} />);
    // Verificar que el indicador de carga está visible
    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
    expect(screen.getByRole('audio', { hidden: true })).toHaveClass('opacity-50');

    // Simular que el audio ha terminado de cargar
    fireEvent.loadedData(screen.getByRole('audio', { hidden: true }));

    // Verificar que el indicador de carga se haya ocultado
    expect(loadingIndicator).not.toBeInTheDocument();
    expect(screen.getByRole('audio')).not.toHaveClass('opacity-50');
  });

  it('debe incluir una fuente de audio y el mensaje de soporte de navegador', () => {
    render(<AudioPlayer url={testUrl} />);
    expect(screen.getByRole('audio')).toBeInTheDocument();
    expect(screen.getByText('Tu navegador no soporta el elemento de audio.')).toBeInTheDocument();
    expect(screen.getByRole('audio').querySelector('source')).toHaveAttribute('src', testUrl);
    expect(screen.getByRole('audio').querySelector('source')).toHaveAttribute('type', 'audio/mpeg');
  });
});
