import { ModeToggle } from "@/components/mode-theme";
import { UserButton } from "@clerk/nextjs";
  
export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
      <ModeToggle />
      <p>Main route</p>
    </div>
  );
}
