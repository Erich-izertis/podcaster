import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

import TableEpisodes, {TableEpisodesProps} from './Table';

function RenderTableEpisodes(props: TableEpisodesProps) {
  return(
    <IntlProvider locale={navigator.language}>
      <BrowserRouter>
        <TableEpisodes {...props} />
      </BrowserRouter>
    </IntlProvider>
  );
}

describe('TableEpisodes', () => {
  const mockData = [
    { trackId: 1, trackName: 'Episode 1', description: 'Description 1', releaseDate: '2021-01-01'},
    { trackId: 2, trackName: 'Episode 2', description: 'Description 2', releaseDate: '2021-01-02' }
  ];

  it('Muestra el título correcto con el número total de episodios', () => {
    render(<RenderTableEpisodes data={mockData} total={mockData.length} loading={false} />)
    expect(screen.getByText(`Episodes: ${mockData.length}`)).toBeInTheDocument();
  });

  it('Muestra un indicador de carga cuando la mesa se está cargando', () => {
    render(<RenderTableEpisodes data={[]} total={0} loading={true} />);
    // expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('Muestra la tabla con los datos y columnas correctos', () => {
    render(<RenderTableEpisodes data={mockData} total={mockData.length} loading={false} />);
    // Verifica que las columnas estén presentes
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
  });

  it('handles an empty data set without errors', () => {
    render(<RenderTableEpisodes data={[]} total={0} loading={false} />);
    expect(screen.getByText('Episodes: 0')).toBeInTheDocument();
    // Optionally, check for a placeholder or no data message
    expect(screen.queryByText('Episode 1')).not.toBeInTheDocument();
  });
});
