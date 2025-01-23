import './config/module-alias';

import express from 'express';

import { env } from '@/main/config/env';

const app = express();

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
