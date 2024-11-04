"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();
  return (
    <Button variant="outline" className="rounded-full px-3 mb-2 ml-1" onClick={() => router.back()}>
      <ArrowLeft className="w-8 h-8" />
    </Button>
  );
};

export default GoBack;
