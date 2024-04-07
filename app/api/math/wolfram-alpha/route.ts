import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams.get('wolfram-query')

  console.log('query params: ', queryParams)
  return NextResponse.json({ message: 'Hello from get request!' })
}
