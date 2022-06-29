import '../index.css';

function Header() {
  return (
    <header className="h-fit rounded-b sticky z-50 top-0 w-full px-1 py-4 flex bg-slate-900">
    <h1 className='px-4 inline text-white text-xl font-bold'>Madrasah</h1>
      <div className='flex-auto'>
        <a href="/" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Homepage</a>
        <a href="/library" className='bg-transparent mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Library</a>
        <a href="/articles" className='bg-transparent   mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Blog</a>
        <a href="/information" className='bg-transparent   mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Information</a>
      </div>
      <div className='justify-self-end'>
        <a href="/signup" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Sign Up</a>
        <a href="/login" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Login</a>
        <a href="/dashboard" className='bg-transparent  mx-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Dashboard</a>
      </div>
    </header>
  );
}

export default Header;
