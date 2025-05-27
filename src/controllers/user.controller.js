import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ id: newUser.id, username: newUser.username });

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// // Controlador para obtener datos del usuario logueado
// export const getMe = async (req, res) => {
//   try {
//     // Obtener el ID del usuario desde el token (middleware authMiddleware lo añade)
//     const userId = req.user.id;

//     // Buscar usuario en la base de datos (excluyendo la contraseña)
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         createdAt: true
//       }
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error en getMe:', error);
//     res.status(500).json({ message: 'Error del servidor' });
//   }
// };

export const getMe = async (req, res) => {
  try {
    console.log('Usuario del token:', req.user); // ← Debugging
    
    if (!req.user?.id) {
      return res.status(400).json({ message: 'ID de usuario no proporcionado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }, // ← Usar req.user.id directamente
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};