import { Request, Response } from 'express';

export interface IDistance {
  userId: number;
  partnerId: number;
  distanceValue: number;
  distanceUnid: 'KM' | 'CM';
}

export default class ServerSentEvent {
  private req: Request;
  private res: Response;
  private status = 200;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;

    this.res.writeHead(this.status, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
  }

  send(data: IDistance) {
    const response = `data: ${JSON.stringify(data)}\n\n`
    this.res.write(response)
  }

  close(listener: () => void) {
    return this.req.on('close', listener);
  }
}