import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Briefcase,
  Users,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Search,
  Building2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

  return (
    <div className="relative overflow-hidden py-6 lg:py-16 space-y-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      {/* Exclusive Top-Right Corner Action for Employers */}
      <div className="flex justify-end px-4 max-w-6xl mx-auto">
        <Link to="/post-job">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 transition-all border border-border/50 rounded-full px-4 py-1.5 flex items-center gap-1.5"
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
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Dream Tech Role
            </span>
          </h1>
        </FadeInScale>

        <FloatingElement delay={0.3}>
          <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover thousands of high-impact opportunities matched to your
            skill set, track applications in real time, and land your ideal
            role.
          </p>
        </FloatingElement>

        {/* Candidate Search Hero Unit */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-xl shadow-indigo-500/5"
          >
            <div className="relative w-full flex items-center pl-3">
              <Search
                size={20}
                className="text-muted-foreground absolute left-4"
              />
              <Input
                type="text"
                placeholder="Job title, tech stack, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-none shadow-none pl-10 focus-visible:ring-0 text-base h-12 bg-transparent"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto px-8 h-12 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              Search Jobs
            </Button>
          </form>

          {/* Popular Tag Quick Links */}
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
                    className="h-7 sm:h-9 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 dark:invert"
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
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-indigo-500/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Search size={20} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Targeted Job Search
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Filter tech positions by role, salary, location, and stack so
                you spend time only on positions worth applying for.
              </CardContent>
            </Card>
          </HoverCardTransition>

          <HoverCardTransition>
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-purple-500/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
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
            <Card className="h-full border-border/60 bg-gradient-to-b from-background to-accent/20 hover:border-pink-500/50 transition-colors shadow-sm">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                  <ShieldCheck size={20} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Direct Access to Recruiter
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Bypass traditional ATS resume black holes with direct pipelines
                straight to technical recruiters and hiring leads.
              </CardContent>
            </Card>
          </HoverCardTransition>
        </div>
      </section>

      {/* Candidate CTA Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-12 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Upgrade Your Career?
            </h2>
            <p className="text-indigo-100 text-base sm:text-lg">
              Explore open positions across top engineering teams and kickstart
              your next role today.
            </p>
            <div className="pt-2">
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="bg-white text-indigo-950 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl text-base shadow-lg"
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
