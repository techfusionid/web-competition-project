import { AuroraText } from "@/components/ui/aurora-text";

export function Hero() {
   return (
      <section className="relative overflow-hidden border-border py-10 md:py-14">
         {/* Dashed Grid Background */}
         <div
            className="absolute inset-0 z-0"
            style={{
               backgroundImage: `
                  linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                  linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
               `,
               backgroundSize: "20px 20px",
               backgroundPosition: "0 0, 0 0",
               maskImage: `
                  repeating-linear-gradient(
                     to right,
                     black 0px,
                     black 3px,
                     transparent 3px,
                     transparent 8px
                  ),
                  repeating-linear-gradient(
                     to bottom,
                     black 0px,
                     black 3px,
                     transparent 3px,
                     transparent 8px
                  ),
                  radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
               `,
               WebkitMaskImage: `
                  repeating-linear-gradient(
                     to right,
                     black 0px,
                     black 3px,
                     transparent 3px,
                     transparent 8px
                  ),
                  repeating-linear-gradient(
                     to bottom,
                     black 0px,
                     black 3px,
                     transparent 3px,
                     transparent 8px
                  ),
                  radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)
               `,
               maskComposite: "intersect",
               WebkitMaskComposite: "source-in",
            }}
         />
         <div className="container relative z-10">
            <div className="mx-auto flex max-w-200 flex-col items-center text-center space-y-4">
                  <a
                     href="https://techfusion.id"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-block rounded bg-neutral-200 dark:bg-[#120C24] dark:text-white px-2 py-1 text-xs font-light cursor-pointer transition-colors hover:bg-muted"
                  >
                     Built by <span className="font-bold tracking-wide">#Techfusion</span>
                  </a>
               <h1 className="text-balance text-4xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-7xl pb-6">
                  One-stop platform to find best <AuroraText>competition</AuroraText> and team for you!
               </h1>
               <p className="text-balance text-lg text-muted-foreground md:text-xl">
                  Over 500+ competitions from various categories. Build your
                  portfolio, sharpen your skills, and achieve excellence !
               </p>
            </div>
         </div>
      </section>
   );
}
