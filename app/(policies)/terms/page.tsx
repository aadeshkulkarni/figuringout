/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

const TermsAndConditions = () => {
  return (
    <Card>
      <CardTitle className="text-xl font-bold mb-2 border-b p-4">
        Figuringout Terms and Conditions
      </CardTitle>
      <CardContent className="p-4">
        <p className="mb-4">
          Welcome to Figuringout! These terms and conditions outline the rules and regulations for the
          use of Figuringout's website and services.
        </p>

        <p className="mb-4">
          By accessing this website and using our application, we assume you accept these terms and
          conditions. Do not continue to use Figuringout if you do not agree to take all of the terms and
          conditions stated on this page.
        </p>

        <h2 className="text-xl font-semibold mb-2">Account Creation</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Users must sign up using Google to access Figuringout. You are responsible for maintaining
            the confidentiality of your account and password.
          </li>
          <li>
            Users are provided with 5 free credits upon signing up. Additional credits require a
            subscription to one of our monthly plans.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Use of Services</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Figuringout allows users to generate content, code, images, videos, and music using
            generative AI.
          </li>
          <li>
            Misuse of the services for illegal or offensive activities is strictly prohibited.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Subscription and Payments</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Users must subscribe to our monthly plans to continue using our services after the
            initial credits are exhausted.
          </li>
          <li>Payment information is securely handled by our payment partner, Razorpay.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Intellectual Property Rights</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Unless otherwise stated, Figuringout and/or its licensors own the intellectual property
            rights for all material on Figuringout.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">User-Generated Content</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Users retain ownership of content they generate but grant Figuringout a license to use,
            reproduce, modify, and distribute such content.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Termination</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            Figuringout reserves the right to terminate or suspend your account at any time if you
            violate these Terms and Conditions.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
        <ul className=" pl-8 mb-4">
          <li className="mb-2">
            These Terms will be governed by and interpreted in accordance with the laws of India.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TermsAndConditions;
