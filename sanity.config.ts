'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import { structureTool } from 'sanity/structure'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './sanity/schemas'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

// export default defineConfig({
//   name: 'Folio',
//   title: 'Portfolio CMS',

//   projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder',
//   dataset: process.env.SANITY_STUDIO_DATASET || 'production',

//   plugins: [structureTool(), visionTool(), codeInput()],

//   schema: {
//     types: schemaTypes,
//   },

//   document: {
//     // Customize document actions
//     actions: (prev, context) => {
//       // Enable live edit for all document types
//       return prev
//     },
//   },
// })