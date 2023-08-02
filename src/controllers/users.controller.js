const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password,claveregistro } = req.body;
  //clave de registro para no permitir registros no deseados
  if (claveregistro != "Manglar2023") {
    errors.push({ text: "Clave de registro no coincide" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      claveregistro,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

usersCtrl.showUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios de la base de datos
    res.render('users', { users }); // Renderizar la vista "users" con la lista de usuarios
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Controlador para agregar un nuevo usuario
usersCtrl.addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save(); // Guardar el nuevo usuario en la base de datos
    res.redirect("/users"); // Redirigir a la lista de usuarios después de agregar un usuario
  } catch (err) {
    res.status(500).send("Error al agregar el usuario.");
  }
};

// Controlador para borrar un usuario
usersCtrl.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId); // Buscar y borrar el usuario por su ID
    res.redirect('/users'); // Redirigir a la lista de usuarios después de borrar un usuario
  } catch (err) {
    console.error('Error al borrar el usuario:', err);
    res.status(500).send('Error al borrar el usuario');
  }
};

module.exports = usersCtrl;
