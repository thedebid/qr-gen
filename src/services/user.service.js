const db = require("../helpers/db");
const bcrypt = require("bcryptjs");
const config = require("../../config/config.json");
const jwt = require("jsonwebtoken");
module.exports = {
  register,
  authenticate,
};

async function register(params, origin) {
  // validate
  // if (findOne(params.email)) {
  //   // send already registered error in email to prevent account enumeration
  //   // return await sendAlreadyRegisteredEmail(params.email, origin);
  //   return findOne(params.email);
  // }

  // create account object
  const user = new db.User(params);

  //   // first registered account is an admin
  //   const isFirstAccount = (await db.User.count()) === 0;
  //   user.role = isFirstAccount ? Role.Admin : Role.User;
  //   user.verificationToken = randomTokenString();

  // hash password
  user.password = await hash(params.password);
  console.log(user);
  // save account
  await user.save();

  // send email
  //await sendVerificationEmail(user, origin);
}
async function hash(password) {
  return await bcrypt.hash(password, config.BCRYPT.SALT);
}

async function authenticate({ email, password, ipAddress }) {
  const account = await findOne(email);
  if (
    !account ||
    // !account.isVerified ||
    !(await bcrypt.compare(password, account.password))
  ) {
    throw "Email or password is incorrect";
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(account);
  //const refreshToken = generateRefreshToken(account, ipAddress);

  // save refresh token
  //await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    // refreshToken: refreshToken.token,
  };
}

async function findOne(email) {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  return user;
}
function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, config.JWT.JWT_SECRET, {
    expiresIn: "15m",
  });
}

function basicDetails(account) {
  const { id, name, email, createdAt, updatedAt } = account;
  return {
    id,
    name,
    email,
    createdAt,
    updatedAt,
  };
}
