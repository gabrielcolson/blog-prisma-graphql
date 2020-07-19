import { objectType, extendType, idArg, stringArg } from '@nexus/schema';
import UserService from '../services/user';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts();
  }
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: User,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (root, { id }, ctx) => {
        return UserService.findById(ctx, id);
      },
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User,
      args: {
        name: stringArg({ required: true }),
        email: stringArg({ required: true }),
      },
      resolve: (root, userData, ctx) => {
        return UserService.createOne(ctx, userData);
      },
    });
  },
});
