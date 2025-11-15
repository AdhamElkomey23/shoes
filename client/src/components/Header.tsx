import { User, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="absolute top-0 left-5 right-5 z-20 flex items-center justify-between px-8 py-6">
      <img src="/nike-logo.png" alt="Nike" className="h-20 w-auto" />
      <div className="flex items-center gap-6">
        <button
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Account"
        >
          <User className="w-8 h-8" />
        </button>
        <button
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
}
