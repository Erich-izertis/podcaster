import React from 'react';
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';

function PodcastApiProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 86400000,
        gcTime: 86400000,
        placeholderData: keepPreviousData,
      },
    },
  });

  persistQueryClient({
    queryClient,
    persister: createSyncStoragePersister({
      storage: window.localStorage,
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default PodcastApiProvider;
