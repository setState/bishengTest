const contentTmpl = './template/Content/index';

module.exports = {
    routes: {
        path: '/',
        component: './template/Layout/index',
        indexRoute: { component: './template/Home/index' },
        childRoutes: [{
            path: 'pageModule/:children',
            component: contentTmpl
        }]
    },
};
