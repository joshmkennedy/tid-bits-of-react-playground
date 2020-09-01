---
title: Adding and Customizing Gatsby Graphql Schema
date: '2020-09-01T18:10:58.268Z'
tags: ['graphql', 'gatsby']
---

For more in depth information go to: [Gatsby Docs on schema customization](https://www.gatsbyjs.com/docs/schema-customization/)

There are A bunch of ways to edit or add to the Graphql schema.  The two ways that I have found easiest are using the `createResolvers` api, and the `onCreateNode` api and `createNodeField` function to add fields to existing nodes. Depending on where and, and how the nodes were pulled in depicts which api I use.

### Third Party API

If the Nodes were created from a third party graphql schema _(github)_, then our options are smaller and our lives are a little harder.

The easiest way I have found is just customizing the Type with the `createResolvers` api.  All you need to do is create an object with keys of the Types of the object you wish to add fields to or change, with all the resolvers or that the fields will use, and then add that object to the `createResolvers()` function. This will then add the fields the type in the schema. 

```js
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GitHub_Gist: {
      description: {
        resolve: (source, args, context, info) => {
          return source.description && source.description.toLowerCase()
        },
      },
      title: {
        type: 'String',
        resolve: source => {
          return source.files[0].name
        },
      },
    }
  }

  createResolvers(resolvers)
}
```
This will change the description to be all lowercase (not sure why you would want to), and will add a title property to the gist that is based on the first file name.  

__one thing to note:__ In order for title to be able to be used, you have to pull in the `files.name` fields, because if we don't gatsby wont be able to use it in our resolver.


### Gatsby Graphql Schema 

If the nodes have a `internal.type` our lives are made so much easier. We can use the method mentioned above, and there are even ways around having to query fields that are used in our custom resolvers.

```js
const resolvers = {
  Frontmatter: {
    author: {
      resolve(source, args, context, info) {
        return context.nodeModel.getNodeById({
          id: source.author,
          type: "AuthorJson",
        })
      },
    },
  },
}
createResolvers(resolver)
```
The Context Parameter has some methods attached to it which allows you to run queries with in the resolver. More information can be found here: [Accessing Gatsby's data store from field resolvers](https://www.gatsbyjs.com/docs/schema-customization/#accessing-gatsbys-data-store-from-field-resolvers).

While that method certainly works, there is a simpler way to do it (at least I think so).

Using the `onCreateNode` api, which runs when a new gatsby node is created, we can add fields to the node.

```js
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

  }
}
```
We basically check to see if the node that was created was the correct type, and if it is we run the function `createNodeField()` and give it our options. The one Caveat about this way is that the fields created are under the property fields. Not the biggest deal but it is something to note.

###  Thats it.
There is more information on the [Gatsby Docs](https://www.gatsbyjs.com/docs/)

also [jason lengstorf has a bunch of videos](https://www.youtube.com/playlist?list=PLz8Iz-Fnk_eQLjd3BXEcWHCpmFAadA4Te)

