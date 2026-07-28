// ============================================================
// 234AFRICA — SANITY STUDIO SCHEMA: EVENTS & FESTIVALS
// File: schemas/event.js
// ============================================================

export default {
  name: 'event',
  title: 'Festival & Rave Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Name',
      type: 'string',
      description: 'e.g., 234 SOUNDFEST \'26'
    },
    {
      name: 'date',
      title: 'Event Date / Month',
      type: 'string',
      description: 'e.g., DEC 2026'
    },
    {
      name: 'location',
      title: 'Location / City',
      type: 'string',
      description: 'e.g., LAGOS'
    },
    {
      name: 'description',
      title: 'Event Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'status',
      title: 'Ticket / Status Badge Text',
      type: 'string',
      description: 'e.g., TICKETS SELLING FAST or SOLD OUT'
    },
    {
      name: 'hot',
      title: 'Highlight as Hot (Orange Neon Badge)?',
      type: 'boolean',
      initialValue: true
    }
  ]
};
