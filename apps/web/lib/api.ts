const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
}
