import { HonoRequest } from "hono";
import { Request } from "express";

declare module "hono" {
  interface HonoRequest {
    file?: Express.Multer.File;
  }
}
