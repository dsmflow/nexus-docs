import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Clear the auth cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0), // Set expiration to past date to delete cookie
    })
  )

  res.status(200).json({ message: 'Logged out successfully' })
}
