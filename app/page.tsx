import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1>
          Hello and welcome to learning hub
        </h1>
        <Button variant={"secondary"}>
          Click me
        </Button>
      </div>
    </>
  );
}