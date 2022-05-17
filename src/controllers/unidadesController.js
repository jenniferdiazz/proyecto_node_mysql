
function add(req, res){
    res.render('unidades/add');
 }

function create(req, res){
 
    const { id, nombre, tipo, marca, modelo, capacidad, dependencia } = req.body;
    const newUnidad = {
        unidad_id: id,
        unidad_nombre : nombre,
        unidad_tipo : tipo,
        unidad_marca : marca, 
        unidad_modelo : modelo, 
        unidad_capadidad : capacidad, 
        unidad_dependencia : dependencia
    }

    req.getConnection((err, conn) => {
     
    conn.query('INSERT INTO unidades SET ?', [newUnidad], (err, rows) => {

        if (err){
              
            res.send("Ops! ha ocurrido un error /n" + err)
        }
        else{
          req.flash('success','guardado exitosamente')
          res.redirect('/unidades');
       }
    });
  });
   
}

function list(req, res){

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM unidades', (err, unidades) => {
          if(err) {
            res.json(err);
          }
          res.render('unidades/list',{unidades});
        });
      });
    
 };

 function destroy(req, res){
     console.log(req.params.id);

     id = req.params.id;

     req.getConnection((err, conn) => {
        conn.query('DELETE FROM unidades WHERE unidad_id = ?', [id], (err, rows) => {
            if (err){
              
                res.send("Ops! ha ocurrido un error /n" + err)
            }
            else{
              req.flash('success','eliminado exitosamente')
                res.redirect('/unidades');
            }
            //res.send('Eliminado');
        });
      })
 }

 
 function edit(req, res){
  id = req.params.id;
  req.getConnection((err, conn) => {
   conn.query('SELECT * FROM unidades WHERE unidad_id = ?', [id], (err, unidades) => {
     if(err) {
       res.json(err);
     }
    
     res.render('unidades/edit',{unidad: unidades[0]});
   });
 });

}

function update(req, res){
  id = req.params.id;
  //console.log(req.body)
   const { nombre, tipo, marca, modelo, capacidad, dependencia } = req.body;
    const newUnidad = {
        unidad_id: id,
        unidad_nombre : nombre,
        unidad_tipo : tipo,
        unidad_marca : marca, 
        unidad_modelo : modelo, 
        unidad_capadidad : capacidad, 
        unidad_dependencia : dependencia
    }
    //console.log(newUnidad);
  req.getConnection((err, conn) => {
   conn.query('UPDATE unidades SET ? WHERE unidad_id = ?', [newUnidad, id], (err, unidades) => {
     if(err) {
       res.json(err);
     }
     req.flash('success','actualizado exitosamente')
     res.redirect('/unidades');
   });
 });

}



 module.exports = {
    add,
    create,
    list,
    destroy,
    edit,
    update
  }