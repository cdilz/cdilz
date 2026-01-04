// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

import { NextResponse } from 'next/server'
import { inspect} from 'util'
import MongoDB from '../../../../utility/MongoDB'

export async function POST() {
	const mongodb = new MongoDB('login')
	try {
		const logins = mongodb.get_users()
		  return NextResponse.json({success: true, logins}, {status: 200})
	} catch (e)	{
		return NextResponse.json({success: false, exception: inspect(e)}, {status: 500})
	} finally {
		mongodb.close()
	}
}
