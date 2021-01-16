const jwt = require('jsonwebtoken');

const schema = require('./auth.schema');
const users = require('./auth.model');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
          if (error) {
            console.log(error);
          }
          req.user = user;
          next();
        });
      } else {
        next();
      }
    } else {
      next();
    }
};
function isLoggedIn(req,res,next) {
    if(req.user) {
        next();
    } else {
      unAuthorized(res, next);
    }
}

function isAdmin(req, res, next) {
  if (req.user.role === 'volunteer') {
    next();
  } else {
    unAuthorized(res, next);
  }
}

function unAuthorized(res, next) {
  const error = new Error('🚫 Un-Authorized 🚫');
  res.status(401);
  next(error);
}

const validateUser = (defaultErrorMessage = '') => (req, res, next) => {
  console.log("validate user function req body = " ,req.body);
  const result = schema.validate(req.body);
  console.log("validate user function schema validation result = " ,result);
  if (!result.error) {
    next();
  } else {
    const error = defaultErrorMessage ? new Error(defaultErrorMessage) : result.error;
    res.status(422);
    next(error);
  }
}; 

const findUser = (defaultLoginError, isError, errorCode = 422) => async (req, res, next) => {
  try {
    const user = await users.findOne({
      email: req.body.email,
    });
    console.log("find user function user from db = " ,user);
    if (isError(user)) {
      res.status(errorCode);
      next(new Error(defaultLoginError));
    } else {
      req.loggingInUser = user;
      next();
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  checkTokenSetUser,
  isLoggedIn,
  isAdmin,
  validateUser,
  findUser,
};