import { CiGlobe } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t mt-10">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto md:px-20 px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <div className="flex flex-col gap-3 text-gray-600 text-sm">
            <a href="#" className="hover:underline">Help Centre</a>
            <a href="#" className="hover:underline">Get help with a safety issue</a>
            <a href="#" className="hover:underline">AirCover</a>
            <a href="#" className="hover:underline">Anti-discrimination</a>
            <a href="#" className="hover:underline">Disability support</a>
            <a href="#" className="hover:underline">Cancellation options</a>
            <a href="#" className="hover:underline">Report neighbourhood concern</a>
          </div>
        </div>

        {/* Hosting */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Hosting</h3>
          <div className="flex flex-col gap-3 text-gray-600 text-sm">
            <a href="#" className="hover:underline">Airbnb your home</a>
            <a href="#" className="hover:underline">Airbnb your experience</a>
            <a href="#" className="hover:underline">Airbnb your service</a>
            <a href="#" className="hover:underline">AirCover for Hosts</a>
            <a href="#" className="hover:underline">Hosting resources</a>
            <a href="#" className="hover:underline">Community forum</a>
            <a href="#" className="hover:underline">Hosting responsibly</a>
            <a href="#" className="hover:underline">Join a free hosting class</a>
            <a href="#" className="hover:underline">Find a co-host</a>
            <a href="#" className="hover:underline">Refer a host</a>
          </div>
        </div>

        {/* Airbnb */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Airbnb</h3>
          <div className="flex flex-col gap-3 text-gray-600 text-sm">
            <a href="#" className="hover:underline">2026 Summer Release</a>
            <a href="#" className="hover:underline">Newsroom</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Investors</a>
            <a href="#" className="hover:underline">Airbnb.org emergency stays</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">

          {/* Left */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© 2026 Airbnb, Inc.</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-1 hover:underline">
             
              <CiGlobe size={18}/>
              English (IN)
            </a>

            <a href="#" className="flex items-center gap-1 hover:underline">
              <LuIndianRupee  size={18}/>
              INR
            </a>

            <a href="#" className="hover:text-black">
             <FaFacebook size={20}/>
            </a>

            <a href="#" className="hover:text-black">
            <FaTwitter size={20}/>
            </a>

            <a href="#" className="hover:text-black">
             <FaInstagram  size={20}/>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;