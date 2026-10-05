import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950">
      {/* Top Border Glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-2xl font-bold text-white">
            Food<span className="text-orange-500">Hub</span>
          </h2>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 transition hover:border-orange-500 hover:bg-orange-500"
            >
              <FaGithub size={18} className="text-white" />
            </a>

            <a
              href="https://linkedin.com/in/pratik-khose-454b0331a"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 transition hover:border-orange-500 hover:bg-orange-500"
            >
              <FaLinkedinIn size={18} className="text-white" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-4 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>

          <a
            href="https://github.com/pratik-290"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-white transition hover:text-orange-500"
          >
            Crafted by Pratik Khose
            <HiArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;