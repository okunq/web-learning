const accuracyGeo = {timeout: 15000,enableHighAccuracy: true};//15sec wait until timeout//high accuracy, slower but more accurate
//maximumAge - чи можна взяти збережену браузером позицію, якщо вона не старша за стільки мілісекунд
const storageL = localStorage;
storageL.setItem("Object Geo",JSON.stringify(accuracyGeo));//для використання властивостей використати JSON.parse();

navigator.geolocation.getCurrentPosition(currentGeo, geoError, accuracyGeo);

function currentGeo(position){//об'єкт position
    var latitude = position.coords.latitude;
    console.log(latitude);
    var longitude = position.coords.longitude;
    console.log(longitude);
    storageL.setItem("latitude", latitude);
    storageL.setItem("longitude", longitude);

}

function geoError(error){//об'єкт error
    switch(error.code){
        case 1:
            console.log(`Error "PERMISSION_DENIED": Користувач заборонив доступ до геолокації`);
            break;
        case 2:
            console.log(`Error "POSITION_UNAVAILABLE": не вдалося визначити позицію`)
            break;
        case 3:
            console.log(`Error "TIMEOUT: час очікування вийшов"`)
            break;
    }
}

