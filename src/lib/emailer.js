const nodemailer = require('nodemailer');

const createTrans =() =>{ 
    const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jennifer.diaz.zavala@gmail.com',
      pass: 'nfibrsfjhrmansvg', // generated ethereal password
    },
  });
  return transport;
}
const sendMail = async (user) =>{
    const transporter = createTrans()  
 const info = await transporter.sendMail({
    from: '"Bienvenida de usuario ✔" <jennifer.diaz.zavala@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `${user.username}, Bienvenida a JEDACAL ! `, // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
    <b>Hola ${user.username}, Bienvenida a JEDACAL</b>
    <i><p>Somos una empresa innovadora, de vanguardia y gran profesionalismo. Nuestros conocimiento y asesoría experta está completamente a su disposición.</p>
    <p>Contamos con una gama de profesionales y técnicos con vasta experiencia, junto a servicios de alta calidad y precios competitivos. Nuestro enfoque es la satisfacción del cliente,
    la rapidez operativa y gestión de soluciones, calidad, eficiencia e innovación en la elaboración de cada proyecto</p></i>
    <img src="https://www.jedacal.com/assets/images/jedacal-main-withborder-1400x1000.png">
    </div>`, // html body
  });
}
//   transporter.verify().then(()=>{
//       console.log('Ready for send emails');
//   });

exports.sendMail = (user) => sendMail(user)