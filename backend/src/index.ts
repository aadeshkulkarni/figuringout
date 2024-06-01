import { Hono } from "hono";
import { cors } from 'hono/cors'
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { bookmarkRouter } from "./routes/bookmark";
import { clapRouter } from "./routes/clap";
import { tagRouter } from "./routes/tag";
import { subscriberRouter } from "./routes/subscriber";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use('/api/*', cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/bookmark', bookmarkRouter)
app.route('/api/v1/clap', clapRouter)
app.route('/api/v1/tag', tagRouter)
app.route('/api/v1/subscriber', subscriberRouter)

export default app;
