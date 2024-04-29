import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {BrowserRouter, useParams} from 'react-router-dom';
// Importa el componente y las dependencias necesarias
import Episode from '../Episode';
import { useQueryClient } from "@tanstack/react-query";
import PodcastApiProvider from "../../services/ApiProvider.tsx";
import {vitest} from "vitest";

vitest.mock("@tanstack/react-query", async () => ({
  ...(await vitest.importActual("@tanstack/react-query")),
  useQueryClient: vitest.fn(),
}));

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useParams: vitest.fn(),
}));

// Función auxiliar para renderizar el componente dentro del contexto apropiado
function renderEpisode() {
  return render(
    <PodcastApiProvider>
      <BrowserRouter>
        <Episode />
      </BrowserRouter>
    </PodcastApiProvider>
  );
}

describe('Episode', () => {
  const mockData = [
    { trackId: 456, trackName: 'Incredible Episode', episodeUrl: 'http://example.com', description: 'An in-depth look into unit testing.' }
  ]

  const mockGetQueryData = vitest.fn()
  const mockUseParams = vitest.fn()

  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(mockUseParams);
    (useQueryClient as jest.Mock).mockImplementation(() => ({ getQueryData: mockGetQueryData }));
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('debe mostrar los detalles del episodio', () => {
    mockGetQueryData.mockReturnValue(mockData);
    mockUseParams.mockReturnValue({ podcastId: '123', episodeId: '456' });

    renderEpisode();
    expect(screen.getByText('Incredible Episode')).toBeInTheDocument();
    expect(screen.getByText('An in-depth look into unit testing.')).toBeInTheDocument();
  });

  it('debe manejar la ausencia de datos', () => {
    mockGetQueryData.mockReturnValue([]);

    renderEpisode();
    expect(screen.queryByText('Incredible Episode')).not.toBeInTheDocument();
  });
});
