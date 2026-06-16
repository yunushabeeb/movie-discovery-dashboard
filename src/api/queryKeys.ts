export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (type: string) => [...movieKeys.lists(), type] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: number) => [...movieKeys.details(), id] as const,
  similar: (id: number) => [...movieKeys.all, 'similar', id] as const,
  credits: (id: number) => [...movieKeys.all, 'credits', id] as const,
  search: (params: string) => [...movieKeys.all, 'search', params] as const,
  discover: (params: string) => [...movieKeys.all, 'discover', params] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
};
