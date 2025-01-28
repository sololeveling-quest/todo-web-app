import type { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'isPredefined',
      type: 'checkbox',
      defaultValue: false,
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

export default Categories
