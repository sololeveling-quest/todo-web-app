import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [
    {
      path: '/register',
      method: 'post',
      handler: async (req) => {
        const body = req.json ? await req.json() : {}
        const user = await req.payload.create({
          collection: 'users',
          data: {
            email: body.email,
            name: body.name,
            password: body.password,
            role: 'user',
          },
        })
        return Response.json({ user })
      },
    },
  ],
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
  ],
}
