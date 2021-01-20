import axios from 'axios';

async function getSectorInfo(args) {
    const { sector, startDate, endDate, resolution } = args;
    let { valueNames } = args;

    if (Array.isArray(valueNames)) {
        valueNames = valueNames.join(',');
    }

    const response = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_API_HOST}/api/data/${sector}`,
        params: {
            startDate: startDate,
            endDate: endDate,
            resolution: resolution,
            valueNames: valueNames
        },
        headers: {
            'Content-Type': 'application/json'
        }    
    })

    return response;
}

export default getSectorInfo;