import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../database/models/User';
import { TokenPrivate } from '../config/config_tokens';

async function register(req, res) {
  // Error Handling
  if (!req.body.username) return res.status(400).json({ error: 'Username Required !' });
  if (!req.body.email) return res.status(400).json({ error: 'Email Required !' });
  if (!req.body.password) return res.status(400).json({ error: 'Password Required !' });

  // Check if the user already exists in the database
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) return res.status(400).json({ error: 'User already exist !' });

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Recording of data in the database
  const registerUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  if (registerUser) return res.status(200).json({ success: true, message: 'User successfuly created' });
}

async function login(req, res) {
  // Error Handling
  if (!req.body.email) return res.status(400).json({ error: 'Email Required !' });
  if (!req.body.password) return res.status(400).json({ error: 'Password Required !' });

  // Check if the user already exists in the database
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  // console.log(user);

  if (!user) return res.status(400).json({ error: 'User does not exist !' });

  // Password verification
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: 'Incorrect ID' });

  // console.log(TokenPrivate)

  // Create the authentication token
  const token = jwt.sign({ _id: user.id }, TokenPrivate, { algorithm: 'RS256', expiresIn: '1d' });
  if (!token) throw Error('Couldn\'t sign the token');

  // console.log(token);

  return res.status(200).cookie('token', token, {
    sameSite: 'strict', httpOnly: true, path: '/', expires: new Date(new Date().getTime() + 100000 * 1000), // Expiration of the token 1d
  }).json({ message: 'Login Successful !' });
}

async function updateUser(req, res) {
  const users = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  if (users) {
    res.status(200).send({ success: true, message: 'User successfuly updated.' });
  } else {
    res.status(404).send({ error: '404 - NOT FOUND' });
  }
}

async function deleteUser(req, res) {
  const users = await User.destroy({ where: { id: req.params.id } });

  if (users) {
    res.status(200).send({ success: true, message: 'User successfuly deleted.' });
  } else {
    res.status(404).send({ error: '404 - NOT FOUND' });
  }
}



export {
  register,
  login,
  updateUser,
  deleteUser
};
