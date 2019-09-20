const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: () => links,
    link: () => links[0]
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const updateLink = {
        id: "link-0",
        description: args.description,
        url: args.url
      };

      links[0] = updateLink;

      return updateLink;
    },
    deleteLink: parent => {
      let deleteLinks = {
        id: "link-0"
      };

      if (deleteLinks === links[0]) {
        deleteLinks = links;
      }

      links.shift();

      return deleteLinks;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
