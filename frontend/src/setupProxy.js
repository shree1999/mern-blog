const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxy = app => {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

module.exports = setupProxy;
