import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) res.status(401).redirect("/signin");

  try {
    const verify = jwt.verify(token, process.env.JWT_PASS);
    req.user = verify;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).redirect("/signin");
    
  }
};
export { auth };