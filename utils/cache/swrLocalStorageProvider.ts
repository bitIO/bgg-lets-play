// @see
// https://swr.vercel.app/docs/advanced/cache#localstorage-based-persistent-cache
function swrLocalStorageProvider() {
  if (typeof window !== 'undefined') {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map<string, any>(
      JSON.parse(localStorage.getItem('app-cache') || '[]'),
    );

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
      const appCache = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem('app-cache', appCache);
    });

    // We still use the map for write & read for performance.
    return map;
  }
  return new Map<string, any>();
}

export { swrLocalStorageProvider };
