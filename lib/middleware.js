const getNewsData = () => [
    {
        heading: 'Shocking: 1 billion animals abandoned a day in Sligo',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'Axel Codron'
    },
    {
        heading: 'Meet our new volunteer: Sean',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        Auther: 'Axel Codron'
    }
]

const newsMiddleware = (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.newsContext = getNewsData();
    next()
}

module.exports = newsMiddleware;