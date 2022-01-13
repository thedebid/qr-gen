const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validateRequest");
const userService = require("../services/user.service");

// routes
router.post("/login", authenticateSchema, authenticate);
// router.post("/refresh-token", refreshToken);
// router.post("/revoke-token", authorize(), revokeTokenSchema, revokeToken);
router.post("/register", registerSchema, register);
// router.post("/verify-email", verifyEmailSchema, verifyEmail);
// router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
// router.post(
//   "/validate-reset-token",
//   validateResetTokenSchema,
//   validateResetToken
// );
// router.post("/reset-password", resetPasswordSchema, resetPassword);
// router.get("/", authorize(Role.Admin), getAll);
// router.get("/:id", authorize(), getById);
// router.post("/", authorize(Role.Admin), createSchema, create);
// router.put("/:id", authorize(), updateSchema, update);
// router.delete("/:id", authorize(), _delete);

module.exports = router;
function registerSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    address: Joi.string().required(),
    //  acceptTerms: Joi.boolean().valid(true).required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  // console.log(req.body);
  userService
    .register(req.body, req.get("origin"))
    .then((result) =>
      res.json({
        message:
          "Registration successful, please check your email for verification instructions",
      })
    )
    .catch(next);
}
function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  userService
    .authenticate({ email, password, ipAddress })
    .then(
      ({
        // refreshToken,
        ...account
      }) => {
        //   setTokenCookie(res, refreshToken);
        res.json(account);
      }
    )
    .catch(next);
}
