import { Home, User, LayoutGrid, Rocket, Star, CircleHelp } from "lucide-react";

export const STARTUP_LANDING_LINKS = [
  { name: "Home", href: "/startup-connect", icon: Home },
  { name: "How it Works", href: "/startup-connect/about", icon: CircleHelp },
  { name: "Browse Gigs", href: "/startup-connect/browse-gigs", icon: Rocket },
];

// Student ලට අදාළ Links
export const STUDENT_LINKS = [
  { name: "My Profile", href: "/startup-connect/profile", icon: User },
  { name: "My Projects", href: "/startup-connect/my-projects", icon: LayoutGrid },
  { name: "Application Status", href: "/startup-connect/student", icon: Home },
  { name: "Reviews", href: "/startup-connect/reviews", icon: Star },
];

// Startup අයට අදාළ Links
export const STARTUP_LINKS = [
  { name: "Dashboard", href: "/startup-connect", icon: Home },
  { name: "My Projects", href: "/startup-connect/my-projects", icon: LayoutGrid },
  { name: "Reviews", href: "/startup-connect/reviews", icon: Star },
];