import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, Moon, PenBox, Sun } from "lucide-react";
import { HireGramLogoWithText } from "./hiregram-logo";
import { useTheme } from "./theme-provider";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { theme, setTheme } = useTheme();

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <nav className="py-4 px-4 md:px-6 flex justify-between items-center border-b border-border/60 backdrop-blur-sm bg-background/80">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <HireGramLogoWithText size={32} textSize="text-lg" />
        </Link>

        <div className="flex gap-2 md:gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="text-muted-foreground hover:text-primary"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
              className="border-primary/30 hover:border-primary/60 hover:bg-primary/10"
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-primary/30",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-card rounded-xl border border-border/30 shadow-2xl shadow-primary/20">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
              appearance={{
                elements: {
                  card: "bg-card border-0",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footer: "bg-card",
                  dividerLine: "bg-border/20",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
