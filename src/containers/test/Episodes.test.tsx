import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {BrowserRouter, useParams} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
// Importa el componente y las dependencias necesarias
import Episodes from '../Episodes';
import PodcastApiProvider from "../../services/ApiProvider.tsx";
import { usePodcastDetailsQuery } from "../../services/podcastDetailsApi.ts";
import {vitest} from "vitest";

vitest.mock("../../services/podcastDetailsApi.ts", async () => ({
  ...(await vitest.importActual("../../services/podcastDetailsApi.ts")),
  usePodcastDetailsQuery: vitest.fn(),
}));

vitest.mock("react-router-dom", async () => ({
  ...(await vitest.importActual("react-router-dom")),
  useParams: vitest.fn(),
}));

// Función auxiliar para renderizar el componente dentro del contexto apropiado
function renderEpisodes() {
  return render(
    <PodcastApiProvider>
      <IntlProvider locale={navigator.language}>
        <BrowserRouter>
          <Episodes />
        </BrowserRouter>
      </IntlProvider>
    </PodcastApiProvider>
  );
}

describe('Episodes', () => {
  const mockUsePodcastDetailsQuery = vitest.fn();
  const mockUseParams = vitest.fn()

  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(mockUseParams);
    (usePodcastDetailsQuery as jest.Mock).mockImplementation(mockUsePodcastDetailsQuery);
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('Debe mostrar un mensaje de error cuando hay un error al cargar los datos.', () => {
    mockUseParams.mockReturnValue({ podcastId: '123' });
    mockUsePodcastDetailsQuery.mockReturnValue({ isError: true });
    renderEpisodes();
    expect(screen.getByText('Error al cargar los episodios del podcast.')).toBeInTheDocument();
  });

  it('debe mostrar los episodios cuando la carga es exitosa', () => {
    mockUseParams.mockReturnValue({ podcastId: '123' });
    mockUsePodcastDetailsQuery.mockReturnValue({
      isLoading: false,
      data: [
        { wrapperType: 'podcastEpisode', id: 'ep1', trackName: 'Episode 1', trackId: 1, releaseDate: '2021-01-01'},
        { wrapperType: 'podcastEpisode', id: 'ep2', trackName: 'Episode 2', trackId: 2, releaseDate: '2021-01-02' },
        { wrapperType: 'track', trackCount: 2 }
      ]
    });
    renderEpisodes();
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
  });

  // it('debe manejar la carga de datos', () => {
  //   mockUsePodcastDetailsQuery.mockReturnValue({ isLoading: true });
  //   renderEpisodes();
  //   expect(screen.getByText('Loading...')).toBeInTheDocument();  // Asegúrate de que tu componente muestre este mensaje cuando está cargando
  // });
});
