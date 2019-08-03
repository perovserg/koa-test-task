import Router from 'koa-router';
import * as controller from '../controllers/employees.controller';

const router = new Router();

router.post('/', controller.create);
router.get('/all', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

export default router.routes();
