// src/client/sample/shop.ts
import { ISO8601DateTime } from "@/types/common";
import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "../base";

export interface IShop {
  _id: string; // Ensure _id is included here
  code: string;
  category: string;
  name: string;
  address: string;
  status: string;
  description?: string;
  css?: string;
  js?: string;
  createdAt: ISO8601DateTime;
  updatedAt: ISO8601DateTime;
}

export interface IShopFormValue extends Omit<IShop, "_id" | "createdAt" | "updatedAt"> { }

interface IShopsParams {
  page?: number;
}

interface IShopsResponse {
  items: IShop[];
  total: number;
}

export interface IShopResponse {
  code: number;
  message: string;
  data: IShop;
}

export const deleteShop = async (id: string) => {
  return fetchApi.delete(`/api/sample/shop/${id}`);
};

export const useShops = (params: IShopsParams = {}) => {
  const queryString = qs.stringify(params);
  return useSWR<IShopsResponse>(`/api/sample/shop?${queryString}`, fetchApi.get);
};

export const useShop = (id: string | number) => {
  return useSWR<IShopResponse>(`/api/sample/shop/${id}`, fetchApi.get);
};

export const createShop = (value: IShopFormValue) => {
  return fetchApi.post(`/api/sample/shop`, { body: JSON.stringify(value) });
};

export const updateShop = (id: string, value: IShopFormValue) => {
  return fetchApi.put(`/api/sample/shop/${id}`, { body: JSON.stringify(value) });
};
