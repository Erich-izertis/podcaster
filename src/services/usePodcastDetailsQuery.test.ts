import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import wrapper from './ApiProvider';
import { usePodcastDetailsQuery } from './podcastDetailsApi';

const results = [{ podcastId: '123', name: 'Test Podcast' }]

// Setup MSW
const server = setupServer(
  http.get('https://itunes.apple.com/lookup', ({ request }) => {
    const url = new URL(request.url)
    if (url.searchParams.get('id') === '123') {
      return HttpResponse.json({
        resultCount: 1,
        results,
      });
    } else {
      return new HttpResponse(null, { status: 500 });
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('usePodcastDetailsQuery', () => {
  it('fetch detalles del podcast', async () => {
    const { result } = renderHook(() => usePodcastDetailsQuery('123'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(results);
  });

  it('Control de error para podcasts inexistentes', async () => {
    const { result } = renderHook(() => usePodcastDetailsQuery('unknown'), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
