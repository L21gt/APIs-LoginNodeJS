// import { Router } from 'express';
// import { registerUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

// const router = Router();
// router.post('/', authMiddleware, registerUser);
// export default router;

import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { getMe } from '../controllers/user.controller.js';

const router = Router();
router.post('/', registerUser); // Asegúrate que sea POST y la ruta '/'
router.get('/me', authMiddleware, getMe);
export default router;