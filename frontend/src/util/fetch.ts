export type FetchParamsType = Record<string, string>
export type FetchDataType = object
export type FetchResponseType = object

export type FetchMethod = 'get' | 'post' | 'put' | 'delete'

class SerializationError extends Error {
  constructor(message: string) {
    super(`Serialization error: ${message}`);
  }
}

export type FetchOptions<
  Data extends FetchDataType,
  Params extends FetchParamsType
> = Omit<RequestInit, 'method' | 'body'> & {
  body?: Data
  params?: Params
}

type ResponseData<Data> = Data & {
  error?: string
}

/**
 * Function that removes keys with empty values from object.
 * @example removeEmptyParams({x: 'a', b: '', c: null}) => {x: 'a'}
 * */
function removeEmptyParams<T extends FetchParamsType>(params: T): T {
  return Object.keys(params)
    .filter((key) => !!params[key])
    .reduce((acc, key) => ({ ...acc, [key]: params[key] }), {}) as T;
}

async function fetch<
  Response extends FetchResponseType,
  Data extends FetchDataType = Record<string, never>,
  Params extends FetchParamsType = Record<string, never>
>(
  method: FetchMethod,
  path: string,
  options?: FetchOptions<Data, Params>,
): Promise<ResponseData<Response> | null> {
  const { params, body, headers, ...fetchOptions } = options || {};
  const filteredParams: Params | undefined = params && removeEmptyParams(params);
  const queryParams = filteredParams
    ? `?${new URLSearchParams(filteredParams)}`
    : '';

  const url = `${process.env.API_URL || 'http://localhost:5000'}/${path}${queryParams}`;

  const response = await window.fetch(url, {
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    ...fetchOptions,
    body: body && JSON.stringify(body),
    method,
  });

  const data = await response.json().catch(() => {
    const message = response.statusText;
    throw new SerializationError(message);
  });

  if (!response.ok) {
    const message = data?.error || response.statusText;
    throw new Error(message);
  }

  return data;
}

export default fetch;
