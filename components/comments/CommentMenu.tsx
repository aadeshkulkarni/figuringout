import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Ellipsis } from "lucide-react";
  
  import React from "react";
  
  interface CommentMenuProps {
    isAuthor: boolean;
  }
  
  const CommentMenu: React.FC<CommentMenuProps> = ({ isAuthor }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis width="24px" height="24px" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          {isAuthor && <DropdownMenuItem>Edit this comment</DropdownMenuItem>}
          {isAuthor && <DropdownMenuItem>Delete this comment</DropdownMenuItem>}
          <DropdownMenuItem>Report it</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CommentMenu;
  