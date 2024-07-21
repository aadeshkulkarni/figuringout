import { createThoughtInput, updateThoughtInput } from '@aadeshk/medium-common';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { getFormattedDate, shuffleArray } from '../utils';
import { generateArticle, generateChatResponse } from '../genAI';
import OpenAI from 'openai';
import {
  buildQuery,
  buildPostSearchQuery,
  buildUserSearchQuery,
  buildTagSearchQuery,
} from '../db/queries';
import { getDBInstance } from '../db/util';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const thoughtRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    OPENAI_API_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();


thoughtRouter.get('/bulk', async (c) => {
  try {
    const userId = await c.req.param('id');
    let page = Math.max(parseInt(c.req.query('page') || `${DEFAULT_PAGE}`), 1);
    let pageSize = Math.max(
      parseInt(c.req.query('pageSize') || `${DEFAULT_PAGE_SIZE}`),
      1
    );
    const prisma = getDBInstance(c);
    const query = buildQuery(userId, undefined);
    query.skip = (page - 1) * pageSize;
    query.take = pageSize;
    const thoughts = await prisma.thought.findMany(query);
    const countQuery = buildQuery(userId, undefined);
    delete countQuery.skip;
    delete countQuery.take;
    const totalCount = await prisma.thought.count({ where: countQuery.where });
    return c.json({
      thoughts: shuffleArray(thoughts),
      totalCount: totalCount,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: 'Error while fetching thought',
      error: e,
    });
  }
});

thoughtRouter.get('/bulk/:id?', async (c) => {
  try {
    const userId = await c.req.param('id');
    const tagId = c.req.query('tagId');
    let page = Math.max(parseInt(c.req.query('page') || `${DEFAULT_PAGE}`), 1);
    let pageSize = Math.max(
      parseInt(c.req.query('pageSize') || `${DEFAULT_PAGE_SIZE}`),
      1
    );
    const prisma = getDBInstance(c);
    const query = buildQuery(userId, tagId);
    query.skip = (page - 1) * pageSize;
    query.take = pageSize;
    const thoughts = await prisma.thought.findMany(query);
    const countQuery = buildQuery(userId, tagId);
    delete countQuery.skip;
    delete countQuery.take;
    const totalCount = await prisma.thought.count({ where: countQuery.where });
    return c.json({
      thoughts: shuffleArray(thoughts),
      totalCount: totalCount,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: 'Error while fetching thought',
      error: e,
    });
  }
});


thoughtRouter.use('/*', async (c, next) => {
  try {
    const header = c.req.header('authorization') || '';
    const token = header.split(' ')[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user && typeof user.id === 'string') {
      c.set('userId', user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: 'Unauthorized ' });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      error: 'Credentials failed',
    });
  }
});

thoughtRouter.post('/', async (c) => {
  const prisma = getDBInstance(c);
  const body = await c.req.json();
  const { success } = createThoughtInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs incorrect',
    });
  }
  const authorId = c.get('userId');
  try {
    const thought = await prisma.thought.create({
      data: {
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: thought.id,
    });
  } catch (ex) {
    c.status(403);
    return c.json({ error: 'Something went wrong ', stackTrace: ex });
  }
});

thoughtRouter.put('/', async (c) => {
  const prisma = getDBInstance(c);
  const body = await c.req.json();
  const { success } = updateThoughtInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: 'Inputs incorrect',
    });
  }
  try {
    const thought = await prisma.thought.update({
      where: {
        id: body.id,
      },
      data: {
        content: body.content,
      },
    });
    return c.json({
      id: thought.id,
    });
  } catch (ex) {
    c.status(403);
    return c.json({ error: 'Something went wrong ', stackTrace: ex });
  }
});

thoughtRouter.delete('/:id', async (c) => {
  try {
    const prisma = getDBInstance(c);
    const thoughtId = c.req.param('id');
    await prisma.thought.delete({
      where: { id: thoughtId },
    });

    return c.json({
      message: 'thought deleted successfully',
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: 'Error while deleting thought',
    });
  }
});



