import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [ data, setData ] = useState(null);
  const [ pending, setPending ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(res => {
      if(!res.ok) {
        throw Error('could not fetch data')
      }
      return res.json();
    })
    .then(data => {
      setData(data);
      setPending(false);
      setError(null);
    })
    .catch(err => {
      setPending(false);
      setError("An Error as occured" + " " + err.message);
    })
  }, [url]);
  return { data, pending, error }
}



export default useFetch;
