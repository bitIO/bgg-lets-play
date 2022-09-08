async function fetcherAuthenticated(
  url: string,
  token: string,
  tokenType: string,
) {
  const response = await fetch(url, {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export { fetcherAuthenticated };
