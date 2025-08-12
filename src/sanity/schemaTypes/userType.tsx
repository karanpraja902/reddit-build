import { UserIcon } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { defineField, defineType } from "sanity";
import Image from "next/image";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon:UserIcon,
      fields: [
        defineField({
          name: "username",
          title: "Username",
          type: "string",
          description: "The unique username for this user",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          description: "User's email address",
          validation: (rule) => rule.required(),
        }),    
    defineField({
        name: "imageUrl",
        title: "Image URL",
        type: "string",
        description: "User's Clerk profile picture",
      }),
      
      defineField({
        name: "joinedAt",
        type: "datetime",
        description: "When the user joined the platform",
        initialValue: () => new Date().toISOString(),
      }),
      
      defineField({
        name: "isReported",
        title: "Is Reported",
        type: "boolean",
        description: "Whether this user has been reported",
        initialValue: false,
      }),
    ],      
    preview: {
        select: {
          title: "username",
          media: "imageUrl",
        },
        prepare({ title, media }) {
            return {
              title,
              media: media ? (
                <Image src={media} alt={`${title}'s avatar`} width={40} height={40} />
              ) : (
                <UserIcon/>
              ),
            };
          },
        },
    })          
