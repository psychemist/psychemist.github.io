import {defineType} from 'sanity'

export const profileSchema = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Professional tagline (e.g., "software engineer · future theorist · reality carver")',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'bio_formal',
      title: 'Formal Bio',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      description: 'Professional bio for the hero section',
    },
    {
      name: 'email_public',
      title: 'Public Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub URL',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        },
        {
          name: 'substack',
          title: 'Substack URL',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        },
      ],
    },
    {
      name: 'resume_url',
      title: 'Resume URL',
      type: 'string',
      initialValue: '/resume.pdf',
      description: 'Path to resume file (usually /resume.pdf)',
    },
    {
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        },
      ],
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'newsletter',
      title: 'Newsletter Settings',
      type: 'object',
      fields: [
        {
          name: 'provider',
          title: 'Newsletter Provider',
          type: 'string',
          options: {
            list: [
              {title: 'Substack', value: 'substack'},
              {title: 'ConvertKit', value: 'convertkit'},
              {title: 'Mailchimp', value: 'mailchimp'},
              {title: 'None', value: 'none'},
            ],
          },
          initialValue: 'substack',
        },
        {
          name: 'embedUrl',
          title: 'Newsletter Embed URL',
          type: 'url',
          description: 'Embed URL for newsletter signup form',
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          description: 'Brief description for newsletter signup',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      media: 'avatar',
    },
  },
})