import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

import React from "react";

const PostMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><Ellipsis width="24px" height="24px"/></DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Edit this post</DropdownMenuItem>
        <DropdownMenuItem>Delete this post</DropdownMenuItem>
        <DropdownMenuItem>Report it</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
