import { MiddlewareHandler } from "hono";
import multer from "multer";

export const multerMiddleware = (upload: multer.Multer): MiddlewareHandler => {
  return async (c, next) => {
    await new Promise<void>((resolve, reject) => {
      upload.single("coverImage")(
        c.req.raw as any,
        c.res as any,
        (err: any) => {
          if (err) {
            c.status(500);
            c.json({ error: "Error uploading file" });
            return reject(err);
          }
          resolve();
        }
      );
    });
    await next();
  };
};
