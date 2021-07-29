const { BadRequest, Unauthorized, InternalServerError } = require('http-errors');
const { ApiClient }  = require('../../api-client')

async function vehiclesHandler(req, res, next) {
    const apiToken = req.headers['x-api-token'];
    if (!apiToken) {
        res.status(400).send((new BadRequest('Missing api token')));
        return new BadRequest('Missing api token');
    }

    const apiClient = new ApiClient({
                                        baseUrl: 'https://app.ecofleet.com/seeme', //TODO: pull from config
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