export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  const users = {
    "mock-admin-token": {
      id: "1",
      name: "Anquab",
      role: "admin",
    },
    "mock-manager-token": {
      id: "2",
      name: "Manager User",
      role: "manager",
    },
    "mock-developer-token": {
      id: "3",
      name: "Developer User",
      role: "developer",
    },
  };

  // Simulate an expired token
  if (token === "mock-expired-token") {
    return res.status(401).json({
      message: "Access token expired",
    });
  }

  const user = users[token];

  if (!user) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = user;

  next();
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    next();
  };
};