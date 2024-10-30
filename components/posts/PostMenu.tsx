import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

import React from "react";

interface PostMenuProps {
  isAuthor: boolean;
}

const PostMenu: React.FC<PostMenuProps> = ({ isAuthor }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis width="24px" height="24px" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {isAuthor && <DropdownMenuItem>Edit this post</DropdownMenuItem>}
        {isAuthor && <DropdownMenuItem>Delete this post</DropdownMenuItem>}
        <DropdownMenuItem>Report it</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
