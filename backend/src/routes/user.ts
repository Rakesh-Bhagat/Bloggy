import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// function to hash password using webCrypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // console.log(user)
  if (!user) {
    return c.json({ message: "user not found" }, 403);
  }

  if (hashedPassword !== user?.password) {
    return c.json(
      {
        error: "invalid username or password ",
      },
      500
    );
  }
  const token = await sign({ id: user?.id }, c.env.JWT_SECRET);

  return c.json({ token });
});



userRouter.post("/signup", async (c) => {
  const Prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, email, password } = await c.req.json();

  try {
    const hashedPassword = await hashPassword(password);
    const user = await Prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(token);
  } catch (error) {
    console.log(error);
    return c.status(403);
  }
});
