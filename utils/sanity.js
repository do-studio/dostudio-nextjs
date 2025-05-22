// lib/sanity.js
import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: '0hjyj1bs', // get this from sanity.json or sanity manage
    dataset: 'production', // or your dataset name
    apiVersion: '2023-01-01', // use a fixed date
    useCdn: true, // `false` if you want fresh data
})

