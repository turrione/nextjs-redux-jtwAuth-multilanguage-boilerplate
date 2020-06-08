import Token from '../../core/token';//'@dubook-core/token';

export const verifyToken = async (req, res, next) => {
  const userToken = req.get('x-token');
  try {
    const decoded = await Token.compareToken(userToken);
    if (decoded) {
      console.log('Decoded', decoded);
      req.user = decoded.user;
      next();
    } else {
      res.json({
        ok: false,
        message: 'El token no es correcto, vuelve a iniciar sessión'
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      message: 'El token no es correcto, vuelve a iniciar sessión',
      error
    });
  }
};