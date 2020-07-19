import * as path from 'path';

import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

import * as User from './User';
import * as Post from './Post';

const schema = makeSchema({
  types: [User, Post],
  outputs: {
    schema: path.join(__dirname, '../../schema.graphql'),
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
  },
  plugins: [nexusSchemaPrisma({ prismaClient: (ctx) => ctx.db })],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('../Context'),
        alias: 'Context'
      }
    ]
  },
});

export default schema;
