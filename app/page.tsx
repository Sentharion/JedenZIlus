import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full py-10 overflow-x-hidden' >
      <h2 className='text-4xl sm:text-6xl font-bold mb-12 text-transform: uppercase'>
        Jeden z Iluś
      </h2>
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-14 justify-center items-center'>
        <Link href="/etap1" className='font-semibold bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d] w-48 h-48 sm:w-60 sm:h-60 border-4 border-black rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300 hover:rotate-3'>
          Etap I
        </Link>
        <Link href="/etap2" className='font-semibold bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d] w-48 h-48 sm:w-60 sm:h-60 border-4 border-black rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300 hover:rotate-3'>
          Etap II
        </Link>
        <Link href="/final" className='font-semibold bg-gradient-to-br from-[#ebd197] via-[#b48811] to-[#a2790d] w-48 h-48 sm:w-60 sm:h-60 border-4 border-black rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 duration-300 hover:rotate-3'>
          Finał
        </Link>
      </div>
    </div>
  );
}
