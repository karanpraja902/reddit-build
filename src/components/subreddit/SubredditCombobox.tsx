"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Subreddit = {
    _id: string;
    title?: string | undefined;
    slug: string | null;
};

interface SubredditComboboxProps {
    subreddits: Subreddit[];
    defaultValue?: string;
}

export function SubredditCombobox({
    subreddits,
    defaultValue = "",
}: SubredditComboboxProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // If defaultValue is a slug from URL, find the corresponding title
    const initialValue = defaultValue 
        ? subreddits.find(s => s.slug === defaultValue)?.title || defaultValue
        : "";
    const [value, setValue] = useState(initialValue);

    const handleSelect = (currentValue: string) => {
        setValue(currentValue);
        setOpen(false);
        // Find the selected subreddit to get its slug
        const selectedSubreddit = subreddits.find(s => s.title === currentValue);
        if (selectedSubreddit && selectedSubreddit.slug) {
            router.push(`/create-post?subreddit=${selectedSubreddit.slug}`);
        } else {
            router.push("/create-post");
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? subreddits.find((subreddit) => subreddit.title === value)?.title ||
                          "Select a community"
                        : "Select a community"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Search community..." />
                    <CommandList>
                        <CommandEmpty>No subreddit found.</CommandEmpty>
                        <CommandGroup>
                            {subreddits.map((subreddit) => (
                                <CommandItem
                                    key={subreddit._id}
                                    value={subreddit.title ?? ""}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === subreddit.title ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {subreddit.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}