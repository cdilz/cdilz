// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

import { inspect} from 'util'
import { NextResponse } from 'next/server'
import MongoDB from '../../../../utility/MongoDB'

export async function POST(request) {
  const mongodb = new MongoDB()
  try {
    const input = await request.json()
    const messages = mongodb.receive(input)    
    return NextResponse.json({success: true, messages}, {status: 200})
  } catch (e) {
    return NextResponse.json({success: false, exception: inspect(e)}, {status: 500})
  } finally {
    mongodb.close()
  }
}
