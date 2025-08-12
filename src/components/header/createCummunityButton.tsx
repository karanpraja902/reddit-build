"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function CreateCommunityButton(){
    const [open, setOpen]= useState(false);
    const {user}=useUser()
    const [errorMessage,setErrorMessage]=useState("")
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
const [slug,setSlug]=useState("")
const handleNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
const value=e.target.value
setName(value)

// Auto-generate slug from name
if (!slug || slug === generateSlug(name)){
    setSlug(generateSlug(value));
}
}
    const generateSlug=(text: string)=>{
        return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-1]/g, "")
        .slice(0, 21);
    };
   

return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className="w-full p-2 pl-5 flex items-center rounded-md cursor-pointer bg-black text-white ☐ hover:bg-black transition-all duration-200 disabled:text-sm disabled opacity-50 disabled:cursor-not-allowed"
    disabled={!user}>
        <Plus className="h-4 w-4 mr-2"/>
        {user?"Create a Community":"Sign-in to Create Community"}
        </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a Community</DialogTitle>
        <DialogDescription>
        
        Create a community/subreddit to share ideas and get feedback
        </DialogDescription>
        <form>
{errorMessage 
           &&(<div className="text-red-500 text-sm">{errorMessage}</div>)}
<div className="space-y-2">
<label htmlFor="name" className="text-sm font-medium">
Community Name
</label>
<Input
id="name"
name="name"
placeholder="My Community"
className="w-full focus:ring-2 focus:ring-blue-500"
value={name}
onChange={handleNameChange}
required
minLength={3}
maxLength={21}/>
</div>
<div className="space-y-2">
<label htmlFor="name" className="text-sm font-medium">
Community Slug
</label>
<Input
id="slug"
name="slug"
placeholder="Enter community slug/url"
className="w-full focus:ring-2 focus:ring-blue-500"
value={slug}
onChange={(e)=>{setSlug(e.target.value)}}
required
minLength={3}
maxLength={21}
pattern="[a-z0-9-]+"
title="Lowcase letters,numbers and hypens only"
/>
<p>
    This will be used in the URL: reddit.com/community/{slug||"community-slug"}
</p>
</div>
<div className="space-y-2">
<label htmlFor="description" className="text-sm font-medium">
    Add description
</label>
    <Textarea 
    id="description"
    name="description"
    value={description}//without it form will be blank
    onChange={(e)=>{setDescription(e.target.value)}}
    className="w-full focus:ring-2 focus:ring-blue-500"
    placeholder="What is this community about?"
    rows={3}
    />
</div>
</form>
      </DialogHeader>
    </DialogContent>
  </Dialog>
}
export default CreateCommunityButton