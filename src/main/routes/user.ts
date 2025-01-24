import type { Router } from 'express';

export default (router: Router): void => {
  router.get('/user/create', (req, res) => {
    res.send({ data: 'any_data' });
  });
};
