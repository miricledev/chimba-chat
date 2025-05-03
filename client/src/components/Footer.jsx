const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-dark-400 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-400 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-dark-300 hover:text-primary-500">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-dark-800 pt-8">
          <p className="text-base text-dark-400 text-center">
            &copy; 2024 Chimba Chat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 