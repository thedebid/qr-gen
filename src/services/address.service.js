const db = require('../helpers/db');
const Address = db.Address;

// add address query function
async function addAddress(params) {
  try {
    console.log(params);
    let { uid, country, state, city, localAddress, postalCode } = params;
    const data = await Address.create({
      user_id: uid,
      country: country,
      state: state,
      city: city,
      localAddress: localAddress,
      postalCode: postalCode,
    });
    return data;
  } catch (err) {
    console.log('Error >> ', err);
  }
}

//delete address query function
async function delAddress(params) {
  try {
    const checkData = await Address.findByPk(params.id);
    if (checkData === null) {
      return `Address with id ${params.id} not found!`;
    } else {
      const data = await Address.destroy({ where: { id: params.id } });
      const msg = `Address deleted successfully!`;
      return `${msg}, ${data}`;
    }
  } catch (err) {
    console.log('Error: ', err);
  }
}

// update address using address id
async function updateAddress(params) {
  let { id, country, state, city, localAddress, postalCode } = params;
  try {
    const checkData = await Address.findByPk(id);
    if (checkData === null) {
      return `Address with id ${id} not found!`;
    } else {
      const data = await Address.update(
        {
          country: country,
          state: state,
          city: city,
          localAddress: localAddress,
          postalCode: postalCode,
        },
        {
          where: { id: id },
        }
      );
      const msg = `Address updated successfully!`;
      const response = {
        msg: `Address updated successfully!`,
        data: data,
      };
      return response;
    }
  } catch (err) {
    console.log('Error: ', err);
  }
}

module.exports = {
  addAddress,
  delAddress,
  updateAddress,
};
