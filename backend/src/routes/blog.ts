import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();


blogRouter.post("", (c) => {
    return c.text("blog");
  });
  
blogRouter.put("/", (c) => {
    return c.text("signin");
  });
  
blogRouter.get("/:id", (c) => {
    return c.text("specific blog");
  });
  
blogRouter.get("/bulk", (c) => {
    return c.text("bulk blog");
  });