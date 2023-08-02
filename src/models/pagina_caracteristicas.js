router.get('/ruta_de_tu_pagina_de_caracteristicas_del_arbol', async (req, res) => {
  try {
    // Aquí obtienes el id_arbol desde la consulta
    const id_arbol = req.query.id_arbol;

    // Aquí debes realizar una consulta a tu base de datos para obtener las características del árbol con el id_arbol
    // Supongamos que tienes un objeto con las características del árbol (reemplaza esto con tu consulta a la base de datos)
    const arbol = await Formulario.findById(id_arbol);

    // Renderizas la página de características y pasas el objeto arbol como datos
    res.render('pagina_caracteristicas', { arbol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});