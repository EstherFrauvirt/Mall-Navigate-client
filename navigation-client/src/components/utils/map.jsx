export const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        // Check if the geolocation API is available
        if ('geolocation' in navigator) {
            // Get user's current location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lng: longitude });
                },
                (error) => {
                    reject(`Error getting user location: ${error.message}`);
                }
            );
        } else {
            reject('Geolocation is not supported by your browser');
        }
    });
};



const calculateDistance = (coord1, coord2) => {

    const [lat, lng] = coord2;
    coord2 = { lat, lng }


    const rad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers


    const dLat = rad(coord2.lat - coord1.lat);

    const dLon = rad(coord2.lng - coord1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(coord1.lat)) * Math.cos(rad(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
};


export const findClosestCoordinate = (userLocation, coordinateList) => {
    let closestCoordinate = null;
    let minDistance = Number.MAX_VALUE;
    console.log(coordinateList);


    coordinateList.forEach((coordinate) => {
        console.log(coordinate);
        console.log(userLocation);

        const distance = calculateDistance(userLocation, coordinate);
        if (distance < minDistance) {
            minDistance = distance;
            closestCoordinate = coordinate;
        }
    });

    return closestCoordinate;
};
