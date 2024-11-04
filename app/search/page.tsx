import { Calculator, Calendar, Smile } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import React from "react";
import { fetchSearchSuggestions } from "../actions/users";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Search = async () => {
  const suggestions = await fetchSearchSuggestions();
  
  return (
    <div className="grid items-center justify-items-center  min-h-screen py-20 font-[family-name:var(--font-geist-sans)] shadow-md">
      <Command className="rounded-3xl border p-4 shadow-md md:max-w-[680px]">
        <CommandInput className="rounded-2xl p-4 tracking-wider text-md" placeholder="Search" />
        <CommandList className="p-4">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((user) => (
              <CommandItem key={user._id}>
                <div className="w-full h-full py-4 border-b flex items-center justify-between">
                <div className="flex items-center justify-between gap-4 text-primary font-semibold">
                  <Image
                    className="w-[40px] h-[40px] bg-secondary border-2 border-secondary rounded-full"
                    width="40"
                    height="40"
                    src={user?.profilePic}
                    alt={user?.name}
                  />
                  <div>{user?.name}</div>
                </div>
                <Button variant="outline" disabled>Follow</Button>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default Search;
