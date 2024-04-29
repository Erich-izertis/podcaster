import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// Importa las dependencias necesarias
import Home from '../Home';
import PodcastApiProvider from "../../services/ApiProvider";
import { usePodcastsQuery } from "../../services/podcastsApi";

// Mocks para la API y la librería React Query
vitest.mock("../../services/podcastsApi", async () => ({
  ...(await vitest.importActual("../../services/podcastsApi")),
  usePodcastsQuery: vitest.fn(),
}));

// Función auxiliar para renderizar el componente dentro del contexto apropiado
function renderHome() {
  return render(
    <PodcastApiProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </PodcastApiProvider>
  );
}

describe('Home', () => {
  const mockUsePodcastsQuery = vitest.fn();

  beforeEach(() => {
    (usePodcastsQuery as jest.Mock).mockImplementation(() => mockUsePodcastsQuery());
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('debe mostrar "Loading..." cuando está cargando datos', () => {
    mockUsePodcastsQuery.mockReturnValue({ isLoading: true });
    renderHome();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('debe mostrar un mensaje de error cuando hay un error en la carga de datos', () => {
    mockUsePodcastsQuery.mockReturnValue({ isError: true });
    renderHome();
    expect(screen.getByText('Error while fetching podcasts.')).toBeInTheDocument();
  });

  it('debe mostrar los podcasts filtrados correctamente según el término de búsqueda', () => {
    mockUsePodcastsQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, title: 'React Podcast', artist: 'Facebook' },
        { id: 2, title: 'Vue Mastery', artist: 'Evan You' }
      ],
    });
    renderHome();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'React' } });
    expect(screen.getByText('React Podcast')).toBeInTheDocument();
    expect(screen.queryByText('Vue Mastery')).not.toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
});
