const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Catch-all route should be at the end
router.use((req, res) => {
    res.send("<h1>Wrong Route</h1>")
});

module.exports = router;
