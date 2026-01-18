import { AuroraText } from "@/components/ui/aurora-text";

export function Hero() {
   return (
      <section className="relative overflow-hidden border-border py-16 md:py-24">
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
