export default {
  name: 'brand',
  title: 'Brand Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      description: 'Upload the brand logo here. For best results, use SVG or PNG files with a transparent background.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    }
  }
}
