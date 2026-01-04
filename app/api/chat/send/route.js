// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

import { NextResponse } from 'next/server'
import { inspect} from 'util'
import MongoDB from '../../../../utility/MongoDB'

export async function POST(request) {
  const mongodb = new MongoDB('message')
  try {
    await mongodb.send(await request.json())
    return NextResponse.json({success: true}, {status: 200})
  } catch (e) {
    return NextResponse.json({success: false, exception: inspect(e)}, {status: 500})
  } finally {
    mongodb.close()
  }
}
