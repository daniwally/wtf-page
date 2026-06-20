import { LOGOS, Timecode } from "./shared";

const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-8" data-testid="footer">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={LOGOS.wtfWhite} alt="WTF" className="h-8 w-auto" />
          <span className="text-white/30">|</span>
          <img src={LOGOS.briefWhite} alt="Brief Destroyers" className="h-6 w-auto" />
        </div>
        <p className="font-hud text-white/30 text-xs uppercase tracking-[0.2em]">
          Battle Tested Creativity Since 2010
        </p>
        <div className="flex items-center gap-4">
          <Timecode className="text-[10px] text-volt/60" />
          <p className="text-white/30 text-sm font-light">© {new Date().getFullYear()} WTF Agency</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
