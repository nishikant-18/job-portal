import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Search,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  FadeInScale,
  HoverCardTransition,
  FloatingElement,
} from "@/components/motion-components";

import companies from "../data/companies.json";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/jobs");
    }
  };

  const popularSearches = [
    "Production",
    "Mechanical",
    "Quality",
    "Supply chain",
  ];

  return (
    <div className="relative overflow-hidden py-6 lg:py-16 space-y-20">
      {/* Industrial background accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      {/* Exclusive Top-Right Corner Action for Employers */}
      <div className="flex justify-end px-4 max-w-6xl mx-auto">
        <Link to="/post-job">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border/50 rounded-full px-4 py-1.5 flex items-center gap-1.5"
          >
            <Building2 size={14} />
            Hiring? Post a job
            <ArrowRight size={12} />
          </Button>
        </Link>
      </div>

      {/* Hero Section - Candidate Centric */}
      <section className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <FloatingElement delay={0.1}></FloatingElement>

        <FadeInScale>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]">
            Find Your Next <br />
            <span className="bg-gradient-to-r from-primary via-emerald-700 to-accent bg-clip-text text-transparent">
              Core Industry Role
            </span>
          </h1>
        </FadeInScale>

        <FloatingElement delay={0.3}>
          <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Find meaningful careers across manufacturing, automotive, energy,
            infrastructure, logistics, and the companies that keep the world
            moving.
          </p>
        </FloatingElement>

        {/* Candidate Search Hero Unit */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-xl shadow-primary/10"
          >
            <div className="relative w-full flex items-center pl-3">
              <Search
                size={20}
                className="text-muted-foreground absolute left-4"
              />
              <Input
                type="text"
                placeholder="Role, skill, plant, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none shadow-none pl-10 focus-visible:ring-0 text-base h-12 bg-transparent"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto px-8 h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              Search Jobs
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="text-xs text-muted-foreground self-center">
              Try a quick search
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() =>
                  navigate(`/jobs?search=${encodeURIComponent(term)}`)
                }
                className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="space-y-6">
        <p className="text-center text-xs sm:text-sm uppercase font-semibold text-muted-foreground tracking-widest">
          Top Companies Hiring Now
        </p>
        <div className="bg-background/40 backdrop-blur-md border-y border-border/40 py-6">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2500,
                disableOnInteraction: false,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="flex items-center">
              {companies.map(({ name, id, path }) => (
                <CarouselItem
                  key={id}
                  className="basis-1/3 sm:basis-1/4 lg:basis-1/6 flex justify-center"
                >
                  <img
                    src={path}
                    alt={name}
                    className="h-7 sm:h-9 object-contain opacity-100 hover:scale-105 transition-transform duration-300"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Candidate-First Features Grid */}
      <section className="space-y-10 max-w-6xl mx-auto px-4">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built to Land You the Right Job
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to navigate your application journey with
            confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HoverCardTransition>
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-primary/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Search size={20} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Targeted Job Search
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Filter core-industry positions by role, salary, location, and
                experience so you spend time on the right opportunities.
              </CardContent>
            </Card>
          </HoverCardTransition>

          <HoverCardTransition>
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-accent/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <TrendingUp size={20} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Real-time Application Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Stay informed with instant updates on your application status
                from initial submission through final interview stage.
              </CardContent>
            </Card>
          </HoverCardTransition>

          <HoverCardTransition>
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-primary/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck size={20} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Direct Access to Recruiter
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Bypass traditional ATS resume black holes with direct pipelines
                straight to plant managers, operations leaders, and hiring
                teams.
              </CardContent>
            </Card>
          </HoverCardTransition>
        </div>
      </section>

      {/* Candidate CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary via-emerald-700 to-slate-800 p-8 sm:p-12 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Upgrade Your Career?
            </h2>
            <p className="text-indigo-100 text-base sm:text-lg">
              Explore opportunities with trusted industrial employers and put
              your skills to work where they matter.
            </p>
            <div className="pt-2">
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-amber-50 font-bold px-8 py-6 rounded-xl text-base shadow-lg"
                >
                  Explore All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
