import cors from 'cors';
import { CORS } from '../../config'; //'@dubook-config';

///imp
const allowedOrigins = CORS.split(",").map((origin) => origin.trim());
const isWildCard = allowedOrigins.find((origin) => origin === "*");

export default cors({
  credentials: true,
  origin: function (origin, next) {
    if (!origin) {
      return next(null, false);
    }
    if (isWildCard || allowedOrigins.indexOf(origin) !== -1) {
      return next(null, true);
    }
    return next(new Error('Not allowed by CORS'));
  },
  exposedHeaders: ['Accept', 'Origin', 'Referer', 'User-Agent', 'Content-Type', 'Authorization', 'Refresh-Token', 'x-token', 'Access-Control-Allow-Origin'],
  allowedHeaders: ['Accept', 'Origin', 'Referer', 'User-Agent', 'Content-Type', 'Authorization', 'Refresh-Token', 'x-token', 'Access-Control-Allow-Origin'],
  methods: ['GET', 'PUT', 'POST', 'DELETE']
});