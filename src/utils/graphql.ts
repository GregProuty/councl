export const gqlQuery = async (subgraphURL: string, query: string) => {
  const res = await fetch(subgraphURL, {
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

  const resp = await res.json()

  if (!res?.ok) {
    const error = resp?.message || res.status
    throw new Error(error)
  }

  if (resp.errors) {
    return Promise.reject(resp.errors)
  }

  return resp.data
}
