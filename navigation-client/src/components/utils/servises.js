import config from '../config'
export const fetchData = async (url,requestOptions) => {
    return await  fetch(`${config.BASE_URL}${url}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(response);
          return response.json();
        });  
      
  }