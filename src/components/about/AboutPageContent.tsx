import Image from "next/image";
import { aboutData } from "@/data/about";
import { AboutGallery } from "@/components/about/AboutGallery";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { StrategicPriorities } from "@/components/about/StrategicPriorities";
import { Search, PenTool, FlaskConical, BookOpen, RefreshCw, Rocket } from "lucide-react";

const iconMap = {
  Search,
  PenTool,
  FlaskConical,
  BookOpen,
  RefreshCw,
  Rocket,
};

export function AboutPageContent() {
  return (
    <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="relative py-10 sm:py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">

        {/* Dark mode only: full-bleed background image + gradient overlays */}
        <div className="absolute inset-0 z-0 hidden dark:block">
          <Image
            src="/assets/images/distro/lake4.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        </div>

        {/* Light mode only: decorative radial blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[600px] h-[600px] dark:hidden translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(238,36,53,0.12) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 w-[400px] h-[400px] dark:hidden -translate-x-1/3 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        />

        {/* Two-column layout: text left, image right */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">

            {/* ── Left: Text content ── */}
            <div className="flex-1 space-y-4 sm:space-y-7">
              {/* Headline with red "purpose" */}
              <h1 className="text-3.5xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Technology with{" "}
                <span className="relative inline-block text-red-600 dark:text-red-500">
                  purpose.
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 rounded-full opacity-25 bg-red-400 dark:bg-red-600 blur-sm"
                  />
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {aboutData.heroSubheading}
              </p>
            </div>

            {/* ── Right: Image square — light mode only ── */}
            <div className="block dark:hidden lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] w-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <Image
                  src="/assets/images/distro/lake4.jpg"
                  alt="Humanitarian Technology & Field Operations"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2-Row Stacked Mission & Vision Section ──────────────────────────────────── */}
      <section className="py-14 sm:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Mission & Vision
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Transforming humanitarian relief through human-centered tech, data intelligence, and local innovation.
            </p>
          </div>

          {/* Row 1: Our Mission */}
          <div
            className="group relative rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl hover:shadow-2xl hover:shadow-red-500/15 hover:border-red-500/40 transition-all duration-500 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Number & Title Badge */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 font-sans font-black text-sm border border-red-200 dark:border-red-800">
                    01
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                    Our Mission
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Technology with purpose for life-saving impact.
                </h3>
              </div>

              {/* Right Column: Mission Quote & Feature Tags */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-5 lg:border-l lg:border-slate-200 lg:dark:border-slate-800/80 lg:pl-8">
                <p className="text-base sm:text-xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-4 border-red-500 pl-4">
                  &quot;{aboutData.mission}&quot;
                </p>

                
              </div>
            </div>
          </div>

          {/* Row 2: Our Vision */}
          <div
            className="group relative rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl hover:shadow-2xl hover:shadow-red-500/15 hover:border-red-500/40 transition-all duration-500 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Number & Title Badge */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 font-sans font-black text-sm border border-red-200 dark:border-red-800">
                    02
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                    Our Vision
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {aboutData.visionSubtitle || "A humanitarian organisation empowered by data and digital solutions"}
                </h3>
              </div>

              {/* Right Column: Vision Content & Feature Tags */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-5 lg:border-l lg:border-slate-200 lg:dark:border-slate-800/80 lg:pl-8">
                {aboutData.visionParagraphs ? (
                  <div className="space-y-3">
                    {aboutData.visionParagraphs.map((p, idx) => (
                      <p key={idx} className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {aboutData.vision}
                  </p>
                )}

              
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Field Operations & Deployments Photo Gallery */}
      <AboutGallery />

      {/* Values Section */}
      <section className="py-14 sm:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              The ethical and operational foundation guiding our software development and data governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {aboutData.values.map((val) => (
              <div
                key={val.number}
                className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-red-500/40 transition-all duration-300 space-y-3 sm:space-y-4 shadow-sm"
              >
                <span className="text-2xl sm:text-3xl font-black font-sans text-red-600 dark:text-red-500">
                  {val.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StrategicPriorities />

      {/* 6-Step Visual Approach */}
      <section className="py-14 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Digital Transformation Approach
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg">
              We follow a people-centred approach to digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
            {aboutData.approach.map((step) => {
              const Icon = iconMap[step.iconName as keyof typeof iconMap] || Search;

              return (
                <div
                  key={step.step}
                  className="relative p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xl sm:text-2xl font-black font-sans text-red-600 dark:text-red-500">
                        0{step.step}
                      </span>
                      <div className="p-2 sm:p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated Digital Transformation Journey Timeline with Scroll Effects & Distro Images */}
      <JourneyTimeline />
    </div>
  );
}
