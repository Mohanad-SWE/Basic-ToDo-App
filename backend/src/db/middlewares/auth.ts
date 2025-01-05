import type { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    // Get token from header
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = await verify(
        token,
        process.env.JWT_SECRET || "super-secret",
      );

      console.log(process.env.JWT_SECRET);

      console.log(payload);
    } catch (error) {
      return c.json({ message: "Invalid token" }, 401);
    }

    await next();
  } catch (error) {
    return c.json({ message: "Invalid token" }, 401);
  }
};

