// ============================================================
// 234AFRICA — SANITY STUDIO SCHEMA: SITE SETTINGS
// File: schemas/siteSettings.js
// ============================================================

export default {
  name: 'siteSettings',
  title: 'Site Settings & Hero Copy',
  type: 'document',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Heading (HTML allowed for line spans & color)',
      type: 'string',
      description: 'Default: WE ARE THE ELECTRIC PULSE OF AFRICAN ENTERTAINMENT'
    },
    {
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      description: 'Default: Live Festivals. Unforgettable Music. Groundbreaking Ventures.'
    },
    {
      name: 'attendeesCount',
      title: 'Total Festival Attendees Count (Number)',
      type: 'number',
      description: 'Default: 30000'
    },
    {
      name: 'stagesCount',
      title: 'Major Stages Built Count',
      type: 'number',
      description: 'Default: 14'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email Address',
      type: 'string',
      description: 'Default: 234groupinfo@gmail.com'
    }
  ]
};
