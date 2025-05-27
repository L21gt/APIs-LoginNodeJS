// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import prisma from '../config/db.js';

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3. Crear payload del token (ESTRUCTURA CLAVE)
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };

    // 4. Generar token
    const token = jwt.sign(
      payload, // <- Payload completo
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5. Responder con el token
    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};