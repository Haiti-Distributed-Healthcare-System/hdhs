import React from "react";

const useApi = (route: string) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  /* istanbul ignore next */
  const getUrl = () => {
    if (process.env.environment === "docker") {
      return "http://api:4000/";
    } else {
      return "http://localhost:4000/";
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(getUrl() + route);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { response, error, isLoading };
};

export default useApi;
