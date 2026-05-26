import { ImagesBadge as BaseImagesBadge } from "@/components/ui/images-badge";
import project1 from "@/assets/official-projects/reinas-project-1.jpg";
import project3 from "@/assets/official-projects/reinas-project-3.jpg";
import project5 from "@/assets/official-projects/reinas-project-5.jpg";
import project8 from "@/assets/official-projects/reinas-project-8.jpg";
import { cn } from "@/lib/utils";

type ImagesBadgeProps = {
  className?: string;
  href?: string;
  title?: string;
};

export function ImagesBadge({
  className = "",
  href = "/#projecten",
  title = "Live configuraties",
}: ImagesBadgeProps) {
  return (
    <div
      className={cn(
        "relative hidden shrink-0 items-center rounded-xl border border-white/6 bg-white/[0.02] px-2.5 py-1.5 backdrop-blur-md md:inline-flex",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_50%,rgba(100,198,255,0.03)_100%)]" />
      <BaseImagesBadge
        href={href}
        text={title}
        images={[project1, project3, project5]}
        imageObjectPositions={["center center", "center center", "center center"]}
        imageAltPrefix="Reina's configuratie"
        folderSize={{ width: 36, height: 26 }}
        teaserImageSize={{ width: 22, height: 15 }}
        hoverImageSize={{ width: 66, height: 48 }}
        hoverTranslateY={-54}
        hoverSpread={24}
        hoverRotation={10}
        textClassName="max-w-[8.8rem] text-[11px] text-white/76 group-hover:text-white/90"
      />
    </div>
  );
}
