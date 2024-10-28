import Footer from "@/components/Footer";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="h-full overflow-y-auto ">
        <div className="mx-auto max-w-screen-xl h-full w-full">
          <div className="h-screen">
            <div className="py-6 md:py-12 max-w-5xl px-4 lg:px-0 mx-auto">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LandingLayout;
