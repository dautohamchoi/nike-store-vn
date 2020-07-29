import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';


const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
    })
  } else {
    res.status(404).send({ message: 'User not found.'})
  }
})

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    })
  } else {
    res.status(401).send({ msg: "Địa chỉ email hoặc mật khẩu không chính xác"});
  }
})

router.post("/signup", async (req, res) => {
  const signUpUser = await User.findOne({
    email: req.body.email
  })
  if (!signUpUser) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      });
     }
  } else {
    res.status(401).send({ msg: "Địa chỉ thư đã có người sử dụng"});
  }
})

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'Hoang',
      email: 'hoang@gmail.com',
      password: '1234',
      isAdmin: true,
    });
  
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: message.error })
  }

})

export default router;