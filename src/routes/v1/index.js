const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const headerInformationRoute = require('./headerInformation.route');
const carousalRoute = require('./carousal.route');
const statsRoute = require('./stats.route');
const faqRoute = require('./faq.route');
const infoRoute = require('./info.route');
const instructorRoute = require('./instructor.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/headerInformation',
    route: headerInformationRoute,
  },
  {
    path: '/carousal',
    route: carousalRoute,
  },
  {
    path: '/stats',
    route: statsRoute,
  },
  {
    path: '/faq',
    route: faqRoute,
  },
  {
    path: '/info',
    route: infoRoute,
  },
  {
    path: '/instructor',
    route: instructorRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
