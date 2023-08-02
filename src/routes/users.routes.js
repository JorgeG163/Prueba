const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post('/users/signin', passport.authenticate('local', {
  failureRedirect: '/users/signin', // Redirige a la página de inicio de sesión si hay un error de autenticación.
  failureFlash: true
}), (req, res) => {
  // Redirección personalizada después del inicio de sesión exitoso
  if (req.user.email === 'maria@gmail.com') {
    res.redirect('/users'); // Redirige a la ventana "about" si el usuario es "maria@gmail.com".
  } else {
    res.redirect('/home'); // Redirige a la ventana "home" si el usuario no es "maria@gmail.com".
  }
});

router.get("/users/logout", logout);

// Ruta para mostrar la lista de usuarios
router.get('/users', showUsers);

// Ruta para agregar un nuevo usuario
router.post("/users/add", addUser);

// Ruta para borrar un usuario
router.delete("/users/delete/:userId", deleteUser);

module.exports = router;
