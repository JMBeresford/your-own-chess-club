const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const jwtDecode = require('jwt-decode');

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    console.log(body);

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          email: body.email,
          username: body.username,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await User
          .findOne({
            where: {
              username,
            },
          });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getUser = async (req, res) => {
    try {
      if (req.header('Authorization')) {
        const token = req.header('Authorization').split(' ')[1];
        const { id } = jwtDecode(token);

        const user = await User.findOne({
          where: { id },
        });

        return res.status(200).json({ user: user.dataValues });
      }
      // const user = await User.findOne()
      return res.status(500).json({ msg: 'Internal server error' });
    } catch (e) {
      return console.log(e);
    }
  };


  return {
    register,
    login,
    validate,
    getAll,
    getUser,
  };
};

module.exports = UserController;
