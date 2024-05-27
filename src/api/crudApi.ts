import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createItem = async <T>(endpoint: string, data: T): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(
    `${API_BASE_URL}/${endpoint}`,
    data
  );
  return response.data;
};

export const readItems = async <T>(endpoint: string): Promise<T[]> => {
  const response: AxiosResponse<T[]> = await axios.get(
    `${API_BASE_URL}/${endpoint}`
  );
  return response.data;
};

export const readItem = async <T>(endpoint: string, id: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(
    `${API_BASE_URL}/${endpoint}/${id}`
  );
  return response.data;
};

export const updateItem = async <T>(
  endpoint: string,
  id: string,
  data: T
): Promise<T> => {
  const response: AxiosResponse<T> = await axios.put(
    `${API_BASE_URL}/${endpoint}/${id}`,
    data
  );
  return response.data;
};

export const deleteItem = async <T>(
  endpoint: string,
  id: string
): Promise<T> => {
  const response: AxiosResponse<T> = await axios.delete(
    `${API_BASE_URL}/${endpoint}/${id}`
  );
  return response.data;
};
