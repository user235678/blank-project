import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const { pipe, abort } = renderToPipeableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onAllReady() {
        const body = new PassThrough();
        responseHeaders.set("Content-Type", "text/html");
        return new Response(body as any, {
          status: responseStatusCode,
          headers: responseHeaders,
        });
      },
      onShellError(error: unknown) {
        throw error;
      },
    }
  );
  setTimeout(abort, ABORT_DELAY);
  const body = new PassThrough();
  pipe(body);
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body as any, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const { pipe, abort } = renderToPipeableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onShellReady() {
        const body = new PassThrough();
        responseHeaders.set("Content-Type", "text/html");
        return new Response(body as any, {
          status: responseStatusCode,
          headers: responseHeaders,
        });
      },
      onShellError(error: unknown) {
        throw error;
      },
      onError() {
        responseStatusCode = 500;
      },
    }
  );
  setTimeout(abort, ABORT_DELAY);
  const body = new PassThrough();
  pipe(body);
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body as any, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}