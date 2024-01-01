import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
const nodeHtmlToImage = require('node-html-to-image')


type ResponseData = {
message: string
}

export async function GET() {
    nodeHtmlToImage({
        output: './files/image.png',
        // output: './../../../files/image.png',
        html: '<html><body>Hello world!</body></html>'
    })
    .then(() => console.log('The image was created successfully!'))

return NextResponse.json({ message: 'Hello from Next.js!' })
}