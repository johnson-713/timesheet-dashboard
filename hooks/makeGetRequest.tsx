/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const makeGetRequest = async (
  endpoint: string,
  params: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<any> => {
  const { data } = await axios.get(endpoint, {
    headers,
    params,
  });
  return data;
};

export default makeGetRequest;
