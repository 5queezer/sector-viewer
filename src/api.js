import axios from 'axios';

async function getSectorInfo(args) {
    let { sector, resolution } = args;
    let { valueNames, startDate, endDate } = args;

    if (Array.isArray(valueNames)) {
        valueNames = valueNames.join(',');
    }

    if (startDate instanceof Date) {
        startDate = startDate.getTime();
    }

    if (endDate instanceof Date) {
        endDate = endDate.getTime();
    }

    resolution = resolution.toString();

    const response = await axios({
        method: 'get',
        url: `http://${process.env.REACT_APP_API_HOST}/api/data/${sector}`,
        params: {
            startDate: startDate,
            endDate: endDate,
            resolution: resolution,
            valueNames: valueNames
        },
        responseType: 'json' 
    })

    return response;
}

export default getSectorInfo;