import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="p-4 border-b border-border/40 bg-card/20 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Leaf className="text-primary w-6 h-6" />
        <h1 className="text-xl font-bold text-foreground font-headline">
          MavunoVision
        </h1>
      </div>
    </header>
  );
}
