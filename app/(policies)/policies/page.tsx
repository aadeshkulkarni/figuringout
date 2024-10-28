import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

const PoliciesPage = () => {
  return (
    <Card>
      <CardTitle className="text-2xl font-bold mb-2 border-b p-4">
        Figuringout Policies
      </CardTitle>
      <CardContent className="p-4">
        <section className="mb-8">
          <p className="mb-4">
            At Figuringout, we prioritize your privacy and are committed to protecting your personal
            information.
          </p>

          <p className="text-lg font-bold mb-2">Information Collection and Use</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              We collect personal information such as your Google account details when you sign up.
            </li>
            <li>Usage data is also collected to improve our services.</li>
          </ul>

          <p className="text-lg font-bold mb-2">Data Security</p>
          <ul className="list-disc list-inside mb-4">
            <li>We employ strict security measures to protect your data.</li>
            <li>Payment information is processed securely via Razorpay.</li>
          </ul>

          <p className="text-lg font-bold mb-2">Data Sharing</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              We do not sell or share your personal information with third parties, except as
              required by law or to provide our services.
            </li>
          </ul>

          <p className="text-lg font-bold mb-2">User Rights</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              You have the right to access, modify, and delete your personal information at any
              time.
            </li>
          </ul>

          <p className="text-lg font-bold mb-2">Changes to This Privacy Policy</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              We may update our Privacy Policy periodically. Any changes will be posted on this
              page.
            </li>
          </ul>
        </section>

        <section>
          <p className="text-2xl font-bold mb-2 border-b">Figuringout Refund and Cancellation Policy</p>
          <p className="mb-4">
            We aim to provide the best service, but we understand that issues may arise. Our refund
            and cancellation policy is designed to be fair and straightforward.
          </p>

          <p className="text-lg font-bold mb-2">Refund Policy</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Refunds can be requested within 7 days of purchase by contacting our support team.
            </li>
            <li>Refunds will be processed within 5-7 working days.</li>
            <li>
              The amount will be credited to the original payment method used for the purchase.
            </li>
          </ul>

          <p className="text-lg font-bold mb-2">Cancellation Policy</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Users can cancel their subscription at any time. However, no refunds will be issued
              for partial months.
            </li>
            <li>To cancel your subscription, contact our support team.</li>
          </ul>
        </section>
        <section className="mb-12">
          <p className="text-2xl font-bold mb-2 border-b">Figuringout Pricing</p>
          <p className="mt-2">
            We offer a variety of monthly subscription plans to suit different needs. Details of
            each plan are available on our pricing page. Prices are subject to change, and any
            changes will be communicated to existing subscribers.
          </p>
        </section>

        <section className="mb-12">
          <p className="text-2xl font-bold mb-2 border-b">Figuringout Shipping Policy</p>
          <p className="mt-2">
            Since Figuringout provides digital services, there is no physical shipping involved. All
            services are delivered via our online platform immediately upon purchase.
          </p>
        </section>

        <section className="mb-12">
          <p className="text-2xl font-bold mb-2 border-b">Figuringout Contact Information</p>
          <p className="mt-2">For any queries or support, you can reach us at:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Email:</strong> customersupport@Figuringout.digital
            </li>
            <li>
              <strong>Address:</strong> Anandvan, Anandpark, Thane West, 400601. Maharashtra, India.
            </li>
          </ul>
        </section>

        <section>
          <p className="text-2xl font-bold mb-2 border-b">Figuringout Products/Services</p>
          <p className="mt-2">Figuringout offers the following services:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>AI-generated Content (text, articles, etc.)</li>
            <li>AI-generated Code</li>
            <li>AI-generated Images</li>
            <li>AI-generated Videos</li>
            <li>AI-generated Music</li>
          </ul>
          <p className="mt-2">
            Each user gets 5 free credits initially, after which they need to subscribe to continue
            using the services.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

export default PoliciesPage;
