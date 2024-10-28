import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <Card>
      <CardTitle className="text-2xl font-bold mb-2 border-b p-4">
        Figuringout.life Contact Information
      </CardTitle>
      <CardContent className="p-4">
        <p className="mt-2">For any queries or support, you can reach us at:</p>
        <ul className="list-disc pl-6 mt-2 gap-2">
          <li>
            <strong>E-mail:</strong>{" "}
            <a href="customersupport@Figuringout.digital">customersupport@figuringout.life</a>
          </li>
          <li>
            <strong>Address:</strong> Anandvan, Anandpark, Thane West, 400601. Maharashtra, India.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default page;
