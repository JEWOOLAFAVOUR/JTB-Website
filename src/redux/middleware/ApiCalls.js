const promiseMiddleware = () => {
    return next => action => {
        const { promise, type, ...rest } = action;

        if (!promise) return next(action);

        // GET_NEWS_DATA_REQUEST EXAMPLE
        // GET_NEWS_DATA_SUCCESS

        const SUCCESS = type + 'SUCCESS';
        const REQUEST = type + 'REQUEST';
        const FAILURE = type + '_FAILURE';

        next({ ...rest, type: REQUEST });

        return promise
            .then(responce => {
                next({ ...rest, responce: responce, type: SUCCESS });
                return true;
            }).catch(error => {
                next({ ...rest, error, type: FAILURE });
                return false;
            })
    }
}

export default promiseMiddleware;