import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

import React from "react";
import { toast } from "sonner";

interface PostMenuProps {
  isAuthor: boolean;
}

const PostMenu: React.FC<PostMenuProps> = ({ isAuthor }) => {

  const editPost = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toast("The action is recorded. Feature is under development.")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis width="24px" height="24px" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {isAuthor && <DropdownMenuItem onClick={editPost}>Edit this post</DropdownMenuItem>}
        {isAuthor && <DropdownMenuItem onClick={editPost}>Delete this post</DropdownMenuItem>}
        <DropdownMenuItem onClick={editPost}>Report it</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostMenu;
