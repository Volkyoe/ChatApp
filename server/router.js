import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.send('server is up and running');
});

export default router;
