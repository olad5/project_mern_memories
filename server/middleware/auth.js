import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
  try {
    // we need to verify the user using the JWT
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = 'test' // should be hiidden when deploying 

    const isCustomAuth = token.length < 500
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, jwtSecret)
      req.userId = decodedData?.id;

    } else {
      decodedData = jwt.decode(token)// this case, it is Google auth and it decodes it
      req.userId = decodedData?.sub;// sub is google variable for an id of each user
    }


    next(); // don't forget this, it is very important

  } catch (error) {
    res.status(500).json({message: 'Something went wrong'});
  }
};

export default auth
