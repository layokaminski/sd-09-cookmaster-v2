const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, email, password, role }) => {
  const connect = await connection();

  const createdUser = await connect.collection('users')
  .insertOne({ name, email, password, role });

  return {
    user: {
      _id: createdUser.insertedId,
      name,
      email,
      role,
    },
  };
};

const getByEmail = async ({ email }) => {
  const connect = await connection();
  const findEmail = await connect.collection('users').findOne({ email });

  return findEmail;
};

const getById = async (userId) => {
  const connect = await connection();
  const findUserId = await connect.collection('users').findOne({ _id: ObjectId(userId) });

  return findUserId;
};

module.exports = {
  create,
  getByEmail,
  getById,
};
