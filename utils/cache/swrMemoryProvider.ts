// @see
// https://swr.vercel.app/docs/advanced/cache#localstorage-based-persistent-cache
function swrMemoryProvider() {
  return new Map<string, any>();
}

export { swrMemoryProvider };
