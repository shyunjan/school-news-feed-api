import { Logger, RawBodyRequest } from "@nestjs/common";
import { FastifyInstance, FastifyRequest } from "fastify";

function getModuleFileName(fullFileName: string): string {
  const filenameMatch = /([^/\\]+?).(js|ts)$/.exec(fullFileName);
  return (filenameMatch && filenameMatch[1]) ?? "";
}

const logger = new Logger(getModuleFileName(__filename));

export default function addLoggerHook(
  server: FastifyInstance
): FastifyInstance {
  // Register JSON body parser middleware here if needed.
  return server.addHook(
    "onResponse",
    (request: RawBodyRequest<FastifyRequest>, response, next) => {
      if (request.url !== "/") {
        const { ip, method, url, headers, rawBody } = request;
        const { statusCode } = response;
        const protocol = request.headers["x-forwarded-proto"] || "http";
        const fullUrl = `${protocol}://${headers.host}${url}`;

        logger.log(
          `method: ${method}, url: ${fullUrl}, statusCode: ${statusCode}, ip: ${ip}, content-type: ${
            headers["content-type"]
          }, body: ${JSON.stringify(rawBody?.toString()) || "undefined"}`
        );
      }

      next();
    }
  );
}
