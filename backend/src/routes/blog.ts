import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "You are unauthorized" });
  }
  try {
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ error: "unauthorized" }, 401);
    }
    c.set("jwtPayload", payload.id);
    await next();
  } catch (error) {
    return c.json({
      error: "invalid token",
    });
  }
});

blogRouter.post("/", async (c) => {
  const payload = c.get("jwtPayload");
  console.log(payload);

  const { title, content } = await c.req.json();

  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await Prisma.post.create({
    data: {
      title,
      content,
      authorId: payload,
    },
  });
  console.log(blogs);
  return c.json(
    {
      id: blogs.id,
    },
    200
  );
});

blogRouter.put("/", async (c) => {
  const payload = c.get("jwtPayload");
  const { title, content, id } = await c.req.json();

  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await Prisma.post.update({
    where: {
      id,
      authorId: payload,
    },
    data: {
      title,
      content,
    },
  });
  console.log(blog);
  return c.json({ message: "blog is updated" }, 200);
});


blogRouter.get("/get/bulk", async (c) => {
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(c.env.DATABASE_URL)

  const bulk = await Prisma.post.findMany();

  return c.json({ bulk });
});


blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  console.log(id);
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await Prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  console.log(post);
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post);
});

