import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true; // when the component is mounted
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if(isMounted.current) setData(json); //will not be loaded unless the component is mounted
        } else {
          throw response;
        }
      } catch (e) {
        if(isMounted.current) setError(e);  //will not be loaded unless the component is mounted
      } finally {
        if(isMounted.current) setLoading(false); //will not be loaded unless the component is mounted
      }
    }
    init();
    return ()=>{ // this will clear the useEffect and execute the below commands
      isMounted.current = false; // will executes when the component is unmounted
    }
  }, [url]);

  return { data, error, loading };
}
