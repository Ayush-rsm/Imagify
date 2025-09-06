import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.headers; // Assuming token is sent as 'token' header

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body = req.body || {}; // ✅ Ensure req.body exists
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
