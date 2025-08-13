import * as React from "react"
import { FlameIcon, GalleryVerticalEnd, HomeIcon, Minus, Plus, TrendingUpIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits"
import CreateCommunityButton from "./header/createCummunityButton"

// This is sample data.
type SideBarData={
navMain:{
  title:string;
  url:string;
  items:{
    title:string;
    url:string;
    isActive:boolean;

  }[];
}[];
}
const sideBarData:SideBarData = {
  navMain: [
    {
      title: "Communities",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
          isActive:false,
        },
        {
          title: "Project Structure",
          url: "#",
          isActive:false,
        },
      ]
    }
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const subreddits=await getSubreddits();
  console.log(subreddits)
  const sideBarData:SideBarData = {
    navMain: [
      {
        title: "Communities",
        url: "#",
        items: subreddits?.map((subreddit)=>({
title:subreddit.title||"unknown",
url:`/community/${subreddit.slug}`,
isActive:false,
        }))||[],
      }
    ],
  }
  return (
    //TODO GET ALL SIDE REDDITS FROM SANITY
    //const subreddits=await get Subreddits();
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/images/Reddit logo Only.svg" alt="logo" width={50} height={50} className="object-contain"/>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
              <CreateCommunityButton/>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="p-5">
<Link href='/' >
<HomeIcon className="w-4 h-4 mr-2"/>
Home
</Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="p-5">
              <Link href='/popular' >
<TrendingUpIcon className="w-4 h-4 mr-2"/>
Popular
</Link>
              </SidebarMenuButton><SidebarMenuButton asChild className="p-5">
              <Link href='/hot' >
<FlameIcon className="w-4 h-4 mr-2"/>
Hot/Controversial
</Link>
              </SidebarMenuButton>
              
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            {sideBarData.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
