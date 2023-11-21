import { Request, Response } from 'express';

export function PartnershipDistanceSEE(req: Request, res: Response) {
  let metters = 20

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })

  const intervalId = setInterval(() => {
    metters += 1
    const data = `data: ${JSON.stringify(metters)}\n\n`
    res.write(data)
  }, 1000)

  req.on('close', () => {
    console.log('close connection')
    clearInterval(intervalId)
  })
}