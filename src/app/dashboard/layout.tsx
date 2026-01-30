import { DasboardMenu } from "@/components/sections/DasboardMenu";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-7">
      <DasboardMenu />
      <main>{children}</main>
    </div>
  );
}
