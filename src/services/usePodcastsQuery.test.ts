import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import wrapper from './ApiProvider';
import { transformFeed } from "./podcastsReducer";
import { usePodcastsQuery, url } from './podcastsApi';

const entry = [
  {
    id: { attributes: { 'im:id': '123456' } },
    title:{ label: 'Test Podcast' },
    summary: { label: 'Test Summary' },
    "im:image": [{ label: 'Test Image' }],
    "im:artist": { label: 'Test Artist' }
  }
];

// Setup MSW to intercept the network request
const server = setupServer(
  http.get(url, () => {
    return HttpResponse.json({
      feed: { entry }
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('usePodcastsQuery', () => {
  it('Recupera y transforma datos de podcasts con éxito', async () => {
    const { result } = renderHook(() => usePodcastsQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // asumir que transformFeed se llama con los datos correctos
    expect(result.current.data).toEqual(transformFeed({ entry }));
  });

  it('maneja errores durante la obtención de datos', async () => {
    // Modificar la respuesta del servidor para simular un error
    server.use(
      http.get(url, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(usePodcastsQuery, { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
