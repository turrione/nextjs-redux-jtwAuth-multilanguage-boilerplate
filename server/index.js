import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import next from 'next';
import { parse } from 'url';
import Server from './core/server';
import userRoutes from './controllers/user.controller';

import corsMiddleware from './utils/middleware/cors';//'@dubook-utils/middleware/cors';
import cacheMiddleware from './utils/middleware/cache';//'@dubook-utils/middleware/cache';

import { notFoundMiddleware, errorMiddleware } from './core/error';//'@dubook-core/error';

const server = new Server;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {

  try {
    await app.prepare();

    // Body Parser
    server.app.use(bodyParser.urlencoded({ extended: true }));
    server.app.use(bodyParser.json());

    // Cookie Parser
    server.app.use(cookieParser());

    // Cors
    server.app.options('*', corsMiddleware);

    // API Routes
    server.app.use('/api/user', corsMiddleware, cacheMiddleware, userRoutes);

    // NEXT (Client) Routes
    server.app.get('/signin', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/profile');
      } else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.app.get('/signup', (req, res) => {
      if (req.cookies.token) {
        res.redirect('/profile');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.app.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    // Middlewares
    server.app.use(notFoundMiddleware);
    server.app.use(errorMiddleware);


    // Start Server
    server.start((err) => {
      if (err) throw err;
      console.log(`Servidor corriendo en puerto ${server.port}`);
    });

  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }

})();