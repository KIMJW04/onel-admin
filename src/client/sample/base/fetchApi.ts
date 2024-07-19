// src/client/base.ts
import ky from "ky";

export const fetchApi = {
  get: async (url: string) => {
    const response = await ky.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  post: async (url: string, options: { body: string }) => {
    const response = await ky.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      json: JSON.parse(options.body),
    });
    return response.json();
  },

  put: async (url: string, options: { body: string }) => {
    const response = await ky.put(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      json: JSON.parse(options.body),
    });
    return response.json();
  },

  delete: async (url: string) => {
    const response = await ky.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};
