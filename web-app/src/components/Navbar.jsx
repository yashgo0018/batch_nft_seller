import { getShortAddress } from "../helpers";

function Navbar({ account, connectWithMetamask }) {
  return <header className="text-gray-600 body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">eBoyDAO Bundle Sale</span>
      </a>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
      {/* {account 
        ? <span>{getShortAddress(account)}</span>
        : <button
            onClick={connectWithMetamask} 
            className="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-white mt-4 md:mt-0">
          Connect With Metamask
        </button>} */}
    </div>
  </header>;
}

export default Navbar;
