import {defineField} from 'sanity'

export const reviewFields = defineField({
  name: 'reviews',
  type: 'array',
  title: 'Reviews',
  of: [
    {
      type: 'object',
      fields: [
        defineField({
          name: 'reviewAuthorName',
          type: 'string',
          title: 'Author Name',
        }),
        defineField({
          name: 'reviewAuthorIcon',
          type: 'image',
          title: 'Author Icon',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'reviewAuthorRating',
          type: 'number',
          title: 'Review Rating',
        }),
        defineField({
          name: 'reviewDate',
          type: 'date',
          title: 'Review Date',
          options: {
            dateFormat: 'DD/MM/YY',
          },
        }),
        defineField({
          name: 'reviewText',
          type: 'object',
          title: 'Review Text',
          fields: [
            defineField({
              name: 'en',
              type: 'string',
              title: 'English',
            }),
            defineField({
              name: 'fr',
              type: 'string',
              title: 'French',
            }),
            defineField({
              name: 'nl',
              type: 'string',
              title: 'Dutch',
            }),
            defineField({
              name: 'de',
              type: 'string',
              title: 'German',
            }),
            defineField({
              name: 'es',
              type: 'string',
              title: 'Spanish',
            }),
            defineField({
              name: 'it',
              type: 'string',
              title: 'Italian',
            }),
            defineField({
              name: 'pl',
              type: 'string',
              title: 'Polish',
            }),
            defineField({
              name: 'pt',
              type: 'string',
              title: 'Portuguese',
            }),
            defineField({
              name: 'tr',
              type: 'string',
              title: 'Turkish',
            }),
            defineField({
              name: 'fi',
              type: 'string',
              title: 'Finnish',
            }),
          ],
        }),
        defineField({
          name: 'reviewResponseText',
          type: 'object',
          title: 'Review Response Text',
          fields: [
            defineField({
              name: 'en',
              type: 'string',
              title: 'English',
            }),
            defineField({
              name: 'fr',
              type: 'string',
              title: 'French',
            }),
            defineField({
              name: 'nl',
              type: 'string',
              title: 'Dutch',
            }),
            defineField({
              name: 'de',
              type: 'string',
              title: 'German',
            }),
            defineField({
              name: 'es',
              type: 'string',
              title: 'Spanish',
            }),
            defineField({
              name: 'it',
              type: 'string',
              title: 'Italian',
            }),
            defineField({
              name: 'pl',
              type: 'string',
              title: 'Polish',
            }),
            defineField({
              name: 'pt',
              type: 'string',
              title: 'Portuguese',
            }),
            defineField({
              name: 'tr',
              type: 'string',
              title: 'Turkish',
            }),
            defineField({
              name: 'fi',
              type: 'string',
              title: 'Finnish',
            }),
          ],
        }),
      ],
    },
  ],
})
