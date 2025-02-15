import { Response } from "@repo/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi<T>(
  path: string,
  method: "GET" | "POST",
  {
    body,
    params,
    headers = {},
  }: {
    body?: unknown;
    params?: Record<string, string | number | undefined>;
    headers?: HeadersInit;
  } = {}
): Promise<Response<T>> {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : "";
  const searchParams = queryString ? `?${queryString}` : "";

  const url = `${BASE_URL}/${path}${searchParams}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return (await response.json()) as Response<T>;
}
