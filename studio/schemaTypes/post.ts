import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.warning("Alt text helps accessibility and SEO"),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.warning("Alt text helps accessibility and SEO"),
            }),
            defineField({
              name: "size",
              title: "Display size",
              type: "string",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large (full width)", value: "large" },
                ],
                layout: "radio",
              },
              initialValue: "large",
            }),
          ],
        },
        {
          type: "object",
          name: "gallery",
          title: "Photo Gallery",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alternative text",
                      type: "string",
                      validation: (rule) => rule.warning("Alt text helps accessibility and SEO"),
                    }),
                  ],
                },
              ],
              validation: (rule) => rule.min(2).error("Add at least 2 images for a gallery"),
            }),
          ],
          preview: {
            select: { images: "images" },
            prepare({ images }: { images?: { length: number }[] }) {
              return {
                title: `Photo Gallery (${images?.length ?? 0} photos)`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
