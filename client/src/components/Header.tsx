import { User, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
      <img src="/nike-logo.png" alt="Nike" className="h-8 w-auto" />
      <div className="flex items-center gap-6">
        <button className="text-white hover:text-gray-300 transition-colors" aria-label="Account">
          <User className="w-6 h-6" />
        </button>
        <button className="text-white hover:text-gray-300 transition-colors" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
