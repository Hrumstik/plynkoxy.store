import {defineType} from 'sanity'
import {appFields} from './appFields'
import {imageFields} from './imageFields'
import {descriptionFields} from './descriptionFields'
import {reviewFields} from './reviewFields'

export const eventType = defineType({
  name: 'event',
  title: 'PWA Content',
  type: 'document',
  fields: [...appFields, imageFields, ...descriptionFields, reviewFields],
  initialValue: {
    appName: 'Nine Casino',
    pwaLink: 'https://benioosn.com/DKdryy',
    developerName: 'Nine Dev',
    rating: '4.8',
    countOfReviews: '21 K+',
    countOfDownloads: '119k',
    version: '2.12.14',
    size: '15.23 MB',
  },
})
