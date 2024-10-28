"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface formDataProps {
  name?: string;
  email?: string;
  password?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<formDataProps>();
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:8787/api/v1/user/signup", {
        ...formData,
      });
      const token = response.data.jwt;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user || {}));
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] shadow-md">
      <div className="w-[400px] text-lg flex flex-col gap-4">
        <h2 className="text-center font-bold">Sign up to Figuringout.life</h2>
        <Input name="name" type="text" placeholder="Name" onChange={onChange} />
        <Input name="email" type="email" placeholder="Email" onChange={onChange} />
        <Input name="password" type="password" placeholder="Password" onChange={onChange} />
        <Button size="lg" onClick={signup}>
          Sign up
        </Button>
        <Separator></Separator>
        <label className="text-center text-sm text-secondary-foreground">
          Already have an account?
        </label>
        <Button variant="outline">
          <Link href="/login">Sign In</Link>
        </Button>
        <Separator></Separator>
        <Button size="lg" variant="outline">
          Continue with Google
        </Button>
      </div>
    </div>
  );
};
export default Signup;
