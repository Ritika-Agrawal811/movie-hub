import { useEffect, useState } from "react";
import client from "../utils/api";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const getData = async () => {
      try {
        const { data } = await client.get(url, {
          params,
        });
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;
