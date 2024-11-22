import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies.auth

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { email: string }
    res.status(200).json({ email: decoded.email })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
