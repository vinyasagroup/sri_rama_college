import LogoSettings from "@/components/admin/logo/LogoSettings";
import MarqueeSettings from "@/components/admin/logo/MarqueeSettings";
import CarouselSettings from "@/components/admin/logo/CarouselSettings";

const Logo = () => {
  return (
    <div className="space-y-8">
      <LogoSettings />
      <MarqueeSettings />
      <CarouselSettings />
    </div>
  );
};

export default Logo;