import { Router } from 'express';
import Token from '../core/token';
import { verifyToken } from '../utils/middleware/user';

const fakeUser = {
  email: 'fake@email.com',
  password: '123456'
}

const router = Router();

// Login
router.post('/login', async (req, res, next) => {
  try {
    const user = { ...req.body };
    console.warn('USER => ', user);
    if (user.email !== fakeUser.email && user.password !== fakeUser.password) {
      return res.json({
        ok: false,
        message: 'Usuario/contraseña no son correctos NO USERDB'
      });
    }

    const userToken = Token.getJwToken({
      email: user.email
    });

    res.json({
      ok: true,
      token: userToken,
      user
    });

  } catch (error) {
    return next(error);
  }
});


// Create user
router.post('/signup', async (req, res, next) => {

  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const userToken = Token.getJwToken({
      email: user.email
    });

    res.json({
      ok: true,
      token: userToken,
      user
    });

  } catch (error) {
    res.json({
      ok: false,
      message: error
    });
    return next(error);
  }
});

// Get user by token
router.get('/', verifyToken, async (req, res, next) => {
  try {
    let user = req.user;
    if (!user) return res.json({ ok: false, message: "Token is not valid" });
    res.json({
      ok: true,
      user
    });
  } catch (error) {
    return next(error);
  }
});

export default router;