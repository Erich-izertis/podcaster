import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import CardEpisode from './CardEpisode';

describe('CardEpisode', () => {
  const props = {
    title: "Episode 1: Introduction to Testing",
    description: "Check out this link for more info: http://example.com",
    url: "http://example.com/audio.mp3"
  };

  it('debe renderizar el título, descripción y el reproductor de audio', () => {
    render(<CardEpisode {...props} />);

    // Verificar el título
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(props.title);

    // Verificar la descripción y que Linkify esté aplicado
    const description = screen.getByText(/check out this link for more info:/i);
    expect(description).toBeInTheDocument();
    expect(description).toContainHTML('a'); // Verifica si Linkify convierte el texto en un enlace

    // Verificar el reproductor de audio
    expect(screen.getByRole('audio')).toBeInTheDocument();
    expect(screen.getByRole('audio').querySelector('source')).toHaveAttribute('src', props.url);
  });

  it('debe incluir un divider visual entre la descripción y el reproductor de audio', () => {
    render(<CardEpisode {...props} />);

    // Verificar la presencia del divider
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
