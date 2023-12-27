import config from '../config'
export const fetchData = async (url,requestOptions) => {
      
  
      fetch(`${config.BASE_URL}${url}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        });
      
  }