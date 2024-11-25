import { useState, useEffect } from 'react';
import keys from './keys.json';

export default function useFetch(backendOperation, queryAttributesStr) {
  // Declaring the essential state variables for data and checking
  // if the request is loading or succeeded
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extracting API key and endpoint URL from the keys.json file
    const { backendUrl, proxyUrl } = keys;

    // Changing loading and success state to true whenever there's an effect
    setLoading(true);
    setSuccess(false);

    // Initializing a controller for the API call
    const controller = new AbortController();

    // Extracting data from queryAttributesStr
    const queryAttributes = JSON.parse(queryAttributesStr);

    // Function to construct and return the URL with
    // the required query parameters
    function getURLQuery(operation, inputData) {
      const queryParameters = new URLSearchParams(inputData);
      if (operation === 'getAllItems') {
        const endpointUrl = new URL(`${backendUrl}/items`);
        return {
          url: endpointUrl.toString(),
          method: 'GET',
        };
      }
      if (operation === 'getItem') {
        const endpointUrl = new URL(`${backendUrl}/items/${inputData.id}`);
        return {
          url: endpointUrl.toString(),
          method: 'GET',
        };
      }
      if (operation === 'addItem') {
        const endpointUrl = new URL(`${backendUrl}/items`);
        endpointUrl.search = queryParameters;
        return {
          url: endpointUrl.toString(),
          method: 'PUT',
        };
      }
      if (operation === 'editItem') {
        const endpointUrl = new URL(`${backendUrl}/items/${inputData.id}`);
        endpointUrl.search = queryParameters;
        return {
          url: endpointUrl.toString(),
          method: 'PATCH',
        };
      }
      if (operation === 'deleteItem') {
        const endpointUrl = new URL(`${backendUrl}/items/${inputData.id}`);
        return {
          url: endpointUrl.toString(),
          method: 'DELETE',
        };
      }
      return {
        url: backendUrl,
        method: 'GET',
      };
    }

    // asynchronous function to make API call
    async function fetchData() {
      try {
        // Constructing URL for request
        const backendUrlObject = getURLQuery(backendOperation, queryAttributes);

        // Constructing the options object
        const options = backendUrlObject.body ? {
          method: backendUrlObject.method,
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(backendUrlObject.body),
        } : {
          method: backendUrlObject.method,
          signal: controller.signal,
          headers: {
            'content-type': 'application/json',
          },
        };

        // Making API call through custom proxy server
        const response = await fetch(`${proxyUrl}/proxy/${backendUrlObject.url}`, options);

        // Checking if the request was a success
        setSuccess(response.ok);
        if (!response.ok) {
          if (response.errorMessage) {
            throw new Error(`Status Code: Internal Error\nError Message: ${response.errorMessage}`);
          } else if (!response.bodyUsed) {
            throw new Error(`Status Code: ${response.status}\nError Message: ${response.statusText}`);
          } else {
            const errorResponse = await response.json();
            throw new Error(`Status Code: ${response.status}\nAPI Error Message: ${errorResponse.message}`);
          }
        }

        // Identify and extract data from response through either text() or json()
        if (response.headers.get('content-type').includes('application/json')) {
          const content = await response.json();
          setData(content);
        } else {
          const content = await response.text();
          setData(content);
        }

        //         // Extracting the content body
        //         const content = await response.json();
        //
        //         // Saving retrieved data
        //         setData(content);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
        setData({ error: `${error}` });
        setSuccess(false);
      } finally {
        // Changing loading state to false whenever the API request ends in success or failure
        setLoading(false);
      }
    }

    // Making sure that a null field is not passed
    if (backendOperation) {
      fetchData();
    } else {
      setLoading(false);
      setSuccess(true);
    }

    // Cancelling the fetch request in case the user navigates
    // away from screen
    return () => {
      controller.abort();
    };

  // Defining variables that trigger useFetch
  }, [backendOperation, queryAttributesStr]);

  // Returning useFetch response
  return { data, success, loading };
}