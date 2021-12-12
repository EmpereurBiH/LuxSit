import axios from "axios";

const baseUrl = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = 'e844cea3eee79de2a3a081aaab0d74ac';

export const getWeatherData = async () => {
    try{
        const {data} = await axios.get(baseUrl + `q=${"Novi Travnik"}&appid=${apiKey}`);
        return data;
    }catch(error) {
        throw error;
    }
}


