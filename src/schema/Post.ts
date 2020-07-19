import { extendType, idArg, objectType, stringArg } from '@nexus/schema';

import PostService from '../services/post';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.slug();
    t.model.author();
  }
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        slug: stringArg({ required: true }),
      },
      resolve: (root, { slug }, ctx) => {
        return PostService.findBySlug(ctx, slug);
      }
    })
  }
});

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOnePost', {
      type: 'Post',
      args: {
        title: stringArg({ required: true }),
        content: stringArg({ required: true }),
        authorId: idArg({ required: true }),
      },
      resolve: (root, postData, ctx) => {
          return PostService.createPost(ctx, postData);
      }
    })
  }
})
