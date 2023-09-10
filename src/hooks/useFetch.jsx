import { useEffect, useState } from "react";
import client from "../utils/api";

const useFetch = (url, params) => {
  const [response, setResponse] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setResponse({ data: null, loading: true, error: null });

    const getData = async () => {
      try {
        const { data } = await client.get(url, {
          params,
        });
        setResponse((prev) => ({ ...prev, data }));
      } catch (error) {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      } finally {
        setResponse((prev) => ({ ...prev, loading: false }));
      }
    };

    getData();
  }, [url, params]);

  return { ...response };
};

export default useFetch;
