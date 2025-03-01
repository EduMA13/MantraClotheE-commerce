import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import Stripe from 'stripe';

// Claves de Stripe
const PUBLISHABLE_KEY = "pk_test";
const SECRET_KEY = "sk_test";


const stripe = new Stripe(SECRET_KEY, { apiVersion: "ApiVersion" });


const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'IP',
  user: 'root',
  password: '***',
  database: 'register_info',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Rutas
app.post('/register', (req, res) => {
  const { name, mail, password, address, phone, securityQuestion, securityAnswer } = req.body;
  const query = 'INSERT INTO register_info (Name, Mail, Password, Address, Phone, SecurityQuestion, SecurityAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, mail, password, address, phone, securityQuestion, securityAnswer], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al registrar el usuario');
    } else {
      res.status(200).send('Usuario registrado con éxito');
    }
  });
});

app.post('/login', (req, res) => {
  const { mail, password } = req.body;
  const query = 'SELECT * FROM register_info WHERE Mail = ? AND Password = ?';
  db.query(query, [mail, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    } else if (result.length > 0) {
      // Responde con los datos del usuario
      res.status(200).json({ user: result[0] });
    } else {
      res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
  });
});


app.get('/get-security-question', (req, res) => {
  const { email } = req.query;
  const query = 'SELECT SecurityQuestion FROM register_info WHERE Mail = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en el servidor.');
    }
    if (result.length === 0) {
      return res.status(404).send('Correo no encontrado.');
    }
    res.json({ securityQuestion: result[0].SecurityQuestion });
  });
});

app.post('/reset-password', (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;
  const query = 'SELECT * FROM register_info WHERE Mail = ? AND SecurityAnswer = ?';
  db.query(query, [email, securityAnswer], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en el servidor.');
    }
    if (result.length === 0) {
      return res.status(400).send('Respuesta incorrecta.');
    }

    const updateQuery = 'UPDATE register_info SET Password = ? WHERE Mail = ?';
    db.query(updateQuery, [newPassword, email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al restablecer la contraseña.');
      }
      res.status(200).send('Contraseña actualizada.');
    });
  });
});

app.get('/productos', (req, res) => {
  const { categoria, color, talla, precio_min, precio_max, palabra_clave } = req.query;

  let query = 'SELECT id, nombre, descripcion, precio, descuento, categoria, etiquetas, imagenes, colores, tallas, stock, portada FROM productos WHERE 1=1';

  if (categoria) query += ` AND categoria = '${categoria}'`;
  if (color) query += ` AND JSON_CONTAINS(colores, '"${color}"')`;
  if (talla) query += ` AND JSON_CONTAINS(tallas, '"${talla}"')`;
  if (precio_min) query += ` AND precio >= ${precio_min}`;
  if (precio_max) query += ` AND precio <= ${precio_max}`;
  if (palabra_clave) query += ` AND nombre LIKE '%${palabra_clave}%'`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (results.length === 0) return res.status(404).send('Producto no encontrado');
    const producto = results[0];
    try {
      producto.colores = JSON.parse(producto.colores.replace(/^\$\[/, '['));
      producto.tallas = JSON.parse(producto.tallas.replace(/^\$\[/, '['));
    } catch (error) {
      console.error('Error al parsear colores o tallas:', error);
      producto.colores = [];
      producto.tallas = [];
    }
    res.json(producto);
  });
});

app.post('/create-payment-intent', async (req, res) => {
  const { total } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
