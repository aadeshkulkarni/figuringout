import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] shadow-md">
      <div className="w-[400px] text-lg flex flex-col gap-4">
        <h2 className="text-center font-bold">Log in with your Google account</h2>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button size="lg">Log in</Button>
        <Button variant="ghost">Forgot password?</Button>
        <Separator></Separator>
        <Button size="lg" variant="outline">Continue with Google</Button>
      </div>
    </div>
  );
};
export default Login;
