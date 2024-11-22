import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

// In a real application, these would be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 1 week

// This would typically be replaced with your actual user database
const VALID_USERS = [
  {
    email: 'user@nexustrading.com',
    // In production, this would be a hashed password
    password: 'your-secure-password'
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    // In production, you would verify against your user database
    const user = VALID_USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', serialize('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/'
    }))

    return res.status(200).json({ message: 'Logged in successfully' })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
