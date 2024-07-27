import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@aadeshk/medium-common";
import { getDBInstance } from "../db/util";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    R2_UPLOAD: R2Bucket;
    R2_SUBDOMAIN_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid email or password.",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      c.status(409);
      return c.json({ error: "User with the email already exists" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      message: "Sign up successful",
      jwt: token,
      user: newUser,
    });
  } catch (ex) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid email or password.",
    });
  }
  try {
    const email = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!email) {
      c.status(403);
      return c.json({ error: "Account with this email does not exist." });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "Email and Password Mismatch" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
      user: user,
      message: "Sign in successful",
    });
  } catch (ex) {
    return c.status(403);
  }
});

userRouter.post("/google/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { access_token } = body;

    if (!access_token) {
      return c.json({ error: "Access token is required" }, 400);
    }

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      // console.error("Error from Google API:", errorData);
      return c.json({ error: errorData || "Failed to fetch user info" }, 502);
    }

    const userData = await response.json();

    // console.log(userData);
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
        provider: "google",
      },
    });
    if (!user) {
      c.status(403);
      return c.json({
        message: "Email not Found",
      });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    //console.log(user, token);
    return c.json({
      message: "completed",
      user: user,
      jwt: token,
    });
  } catch (error) {
    //console.error("Error during Google login:", error);
    return c.json({ error: "Internal Server Error" }, 503);
  }
});
userRouter.post("/google/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { access_token } = body;

    if (!access_token) {
      return c.json({ error: "Access token is required" }, 400);
    }

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      // console.error("Error from Google API:", errorData);
      return c.json({ error: errorData || "Failed to fetch user info" }, 502);
    }

    const userData = await response.json();

    //console.log(userData);
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
        provider: "google",
      },
    });
    if (user) {
      c.status(409);
      return c.json({
        message: "Email already Exist",
      });
    }
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        googleId: userData.id,
        name: userData.name,
        verifiedEmail: true,
        provider: "google",
        profilePic: userData.picture,
      },
    });
    if (!newUser) {
      c.status(500);
      return c.json({
        message: "Internal Server Error",
      });
    }
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    return c.json({
      message: "completed",
      user: newUser,
      jwt: token,
    });
  } catch (error) {
    //console.error("Error during Google login:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
userRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header && header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized " });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Credentials failed",
    });
  }
});

userRouter.get("/:id", async (c) => {
  const prisma = getDBInstance(c);
  const userId = await c.req.param("id");
  const authorizedUserId = c.get("userId");
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      c.status(400);
      return c.json({ error: "User does not exist" });
    }
    return c.json({
      user,
      isAuthorizedUser: authorizedUserId === userId,
      message: "Found user",
    });
  } catch (ex) {
    return c.status(403);
  }
});
userRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const users = await prisma.user.findMany();
    return c.json({
      payload: users,
      message: "All users",
    });
  } catch (ex) {
    return c.status(403);
  }
});

userRouter.post("/updateDetail", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const userId = c.get("userId");
    const body = await c.req.parseBody();
    const profileImage = body["file"];
    const name = body["name"].toString();
    const detail = body["detail"].toString();
    if (name && detail && profileImage && profileImage instanceof File) {
      const uploadedResponse = await c.env.R2_UPLOAD.put(
        `${userId}-${profileImage.name}`,
        profileImage
      );
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          details: detail,
          profilePic: `${c?.env?.R2_SUBDOMAIN_URL}/${uploadedResponse?.key}`,
        },
      });
      return c.json({
        id: user.id,
        name: user.name,
        details: user.details,
        profilePic: user.profilePic,
        email: user.email,
      });
    }
    c.status(411);
    return c.json({
      error: "Profile picture could not be processed.",
    });
  } catch (ex) {
    console.log(ex);
    c.status(403);
    return c.json({ error: "Something went wrong" });
  }
});
