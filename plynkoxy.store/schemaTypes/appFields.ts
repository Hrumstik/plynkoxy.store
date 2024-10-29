import {defineField} from 'sanity'

export const appFields = [
  defineField({
    name: 'appName',
    type: 'string',
    title: 'App Name',
  }),
  defineField({
    name: 'appIcon',
    type: 'image',
    title: 'App Icon',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'pwaLink',
    type: 'string',
    title: 'PWA Link',
  }),
  defineField({
    name: 'developerName',
    type: 'string',
    title: 'Developer Name',
  }),
  defineField({
    name: 'rating',
    type: 'string',
    title: 'Rating',
  }),

  defineField({
    name: 'countOfStars',
    type: 'number',
    title: 'Count of rating stars',
  }),
  defineField({
    name: 'size',
    type: 'string',
    title: 'The size of the App',
  }),
  defineField({
    name: 'countOfDownloads',
    type: 'string',
    title: 'The number of downloads',
  }),
  defineField({
    name: 'version',
    type: 'string',
    title: 'The version of the app',
  }),
  defineField({
    name: 'lastUpdate',
    type: 'date',
    title: 'Updated on',
    options: {
      dateFormat: 'MMM D, YYYY',
    },
  }),
]
