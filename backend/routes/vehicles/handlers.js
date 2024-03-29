const { BadRequest, Unauthorized, InternalServerError } = require('http-errors');
const { ApiClient }  = require('../../api-client')
const { validateApiToken } = require('../../utils');

async function vehiclesHandler(req, res) {
    const apiToken = req.headers['x-api-token'];
    if (!apiToken) {
        res.status(400).send((new BadRequest('Missing api token')));
        return;
    }

    const apiClient = new ApiClient({
                                        baseUrl: process.env.BASE_API_URL,
                                        apiToken,
                                    });
    let response;
    try {
        response = await apiClient.getLatestVehiclesData();
    } catch (err) {
        switch (err.name) {
            case 'UnauthorizedException':
                res.status(401).send((new Unauthorized()));
                break;
            default:
                res.status(500).send((new InternalServerError()));
        }
        return;
    }
    res.json(response);
}

module.exports = {
    vehiclesHandler,
}