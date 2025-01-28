import type { CollectionConfig } from 'payload'
import mongoose from 'mongoose'

const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (!req.user) {
        return false
      }

      if (req.user.role === 'user') {
        return {
          user: {
            equals: req.user.id,
          },
        }
      }

      if (req.user.role === 'admin') {
        return true
      }

      return false
    },
  },
  hooks: {
    beforeRead: [
      ({ doc, req, query }) => {
        const category = req.query.category
        if (!req.user) {
          throw new Error('You must be logged in to view tasks')
        }

        if (req.user.role === 'user') {
          if (category) {
            query.where = {
              ...query.where,
              user: {
                equals: req.user.id,
              },
            }
          }
        }

        return doc
      },
    ],
  },
  endpoints: [
    {
      path: '/categories-count',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          throw new Error('You must be logged in to view tasks')
        }

        const taskCollection = req.payload.db.collections.tasks

        // aggregate the count of tasks for each category using mongodb
        const result = await taskCollection.aggregate([
          {
            $match: {
              user: new mongoose.Types.ObjectId(req.user.id),
              category: { $ne: null },
            },
          },
          {
            $group: {
              _id: '$category',
              count: { $sum: 1 },
            },
          },
        ])

        return Response.json({ stats: result.map((r) => ({ category: r._id, count: r.count })) })
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'dueDate',
      type: 'date',
    },
    {
      name: 'reminder',
      type: 'date',
    },
    {
      name: 'hashtags',
      type: 'json',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'completed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'notes',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'textarea',
        },
        {
          name: 'createdAt',
          type: 'date',
        },
      ],
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hooks: {
        beforeValidate: [
          async ({ value, req }) => {
            if (value) return value

            if (!req.user) {
              throw new Error('You must be logged in to create a category')
            }

            return req.user.id
          },
        ],
      },
    },
  ],
}

export default Tasks
