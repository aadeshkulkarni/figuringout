import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const PostShimmer = () => {
  return (
    <Card className="w-full md:w-[680px] md:min-h-[200px]">
      <CardHeader className="p-4 w-full">
        <div className="bg-accent w-[100px] h-[20px] animate-pulse"></div>
      </CardHeader>
      <CardContent className="text-lg w-full p-4 ">
        <div className="bg-accent w-full h-[40px] animate-pulse"></div>
      </CardContent>
      <CardFooter className="md:pl-[60px] flex gap-8 items-center">
        <div className="w-12 h-12 bg-accent animate-pulse"></div>
        <div className="w-12 h-12 bg-accent animate-pulse"></div>
        <div className="w-12 h-12 bg-accent animate-pulse"></div>
        <div className="w-12 h-12 bg-accent animate-pulse"></div>
      </CardFooter>
    </Card>
  );
};

export default PostShimmer;
