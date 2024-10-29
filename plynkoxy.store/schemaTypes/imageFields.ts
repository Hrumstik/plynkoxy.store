import {defineField} from 'sanity'

export const imageFields = defineField({
  name: 'screens',
  type: 'array',
  title: 'Screens',
  of: [
    defineField({
      name: 'screen',
      type: 'image',
      title: 'Screen',
      options: {
        hotspot: true,
      },
    }),
  ],
})
