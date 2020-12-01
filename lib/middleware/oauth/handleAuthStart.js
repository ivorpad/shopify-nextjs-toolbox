"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports["default"] = void 0

var nonce = require("nonce")

var createNonce = nonce()

var _default = function _default(req, res) {
  var body = JSON.parse(req.body)
  var scopes = process.env.SHOPIFY_AUTH_SCOPES
  var redirect_uri = process.env.SHOPIFY_AUTH_CALLBACK_URL

  if (!(body === null || body === void 0 ? void 0 : body.shop)) {
    return res.status(401).json({
      message: "Unauthorized: Required Query or Shop missing.",
    })
  }

  var authUrl = "https://"
    .concat(body.shop, "/admin/oauth/authorize?client_id=")
    .concat(process.env.SHOPIFY_API_PUBLIC_KEY, "&scope=")
    .concat(scopes, "&redirect_uri=https://")
    .concat(redirect_uri, "&state=")
    .concat(createNonce())
  res.status(200).json({
    redirectTo: authUrl,
  })
}

exports["default"] = _default
