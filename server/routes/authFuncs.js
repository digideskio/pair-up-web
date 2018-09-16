const authorized = (req, res, next) => {
  if(!req.user) {
    return next({ status: 401 });
  }
  next();
};

//for confirming user is logged in
const isParamUser = (paramName) => {
  return (req, res, next) => {
    if(req.params[paramName] === req.user.id || req.user.userStatus === 'admin' || req.user.userStatus === 'master') {
      return next();
    }
    next({ status: 401 });
  };
};

//for confirming whether the user is an organization admin or master
const isAdmin = (req, res, next) => {
  if(req.user.userStatus === 'admin' || req.user.userStatus === 'master') {
    return next();
  }
  next({ status: 401 });
};

//limited to master only
const isMaster = (req, res, next) => {
  if(req.user.userStatus === 'master') return next();
  next({ status: 401 });
};

module.exports = {
  authorized,
  isParamUser,
  isAdmin,
  isMaster
};
