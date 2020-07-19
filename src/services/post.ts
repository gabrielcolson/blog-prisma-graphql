import { Post } from 'nexus-plugin-prisma/client';
import slugify from 'slugify';

import { Context } from '../Context';

async function findBySlug(ctx: Context, slug: string): Promise<Post> {
  const post = await ctx.db.post.findOne({ where: { slug }, include: { author: true }});
  if (post === null) {
    throw new Error('post not found');
  }
  console.log('post:', post);
  return post;
}

interface PostData {
  title: string;
  content: string;
  authorId: string;
}

async function createPost(ctx: Context, { authorId, title, content }: PostData): Promise<Post> {
  const slug = slugify(title);

  return ctx.db.post.create({
    data: {
      title,
      slug,
      content,
      author: { connect: { id: authorId }},
    }
  });
}

export default { findBySlug, createPost };
