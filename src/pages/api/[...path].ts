import type { APIRoute } from 'astro';
import app from '../../../server/index.js';

export const ALL: APIRoute = async ({ request, params }) => {
  const path = params.path || '';
  
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    
    const mockRes = {
      statusCode: 200,
      headers: {} as Record<string, string>,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(data: any) {
        resolve(
          new Response(JSON.stringify(data), {
            status: this.statusCode,
            headers: {
              'Content-Type': 'application/json',
              ...this.headers,
            },
          })
        );
        return this;
      },
      setHeader(name: string, value: string) {
        this.headers[name] = value;
        return this;
      },
      send(data: any) {
        resolve(
          new Response(data, {
            status: this.statusCode,
            headers: this.headers,
          })
        );
        return this;
      },
      end(data?: any) {
        resolve(
          new Response(data || '', {
            status: this.statusCode,
            headers: this.headers,
          })
        );
        return this;
      },
    };

    request.text().then((body) => {
      const url = new URL(request.url);
      const mockReq: any = {
        method: request.method,
        url: `/api/${path}${url.search}`,
        headers: Object.fromEntries(request.headers.entries()),
        query: Object.fromEntries(url.searchParams.entries()),
      };

      if (body) {
        try {
          mockReq.body = JSON.parse(body);
        } catch {
          mockReq.body = body;
        }
      }

      app(mockReq, mockRes as any, () => {
        resolve(new Response('Not Found', { status: 404 }));
      });
    }).catch(() => {
      resolve(new Response('Internal Server Error', { status: 500 }));
    });
  });
};
