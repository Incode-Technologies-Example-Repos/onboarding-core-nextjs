import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const params = req.body ? JSON.parse(req.body) : {};
    const options = {
      countryCode: "ALL",
      configurationId: process.env.INCODE_CLIENT_ID,
      ...params
    }

    const config: RequestInit = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'api-version': "1.0",
            'x-api-key': process.env.INCODE_API_KEY + ''
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(options) // body data type must match "Content-Type" header
    };
    
    const url: any = process.env.INCODE_API_URL + 'start';

    const response = await fetch(url, config);
    const sessionData = await response.json();
    console.log(sessionData)
    if (!response.ok) {
        throw new Error(sessionData.message);
    }
    res.statusCode = response.status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(sessionData))
}
