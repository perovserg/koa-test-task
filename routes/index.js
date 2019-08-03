import employees from './employees.route';

export default (router) => {
    router.use('/employees', employees);
};
