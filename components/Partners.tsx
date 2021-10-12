import Image from 'next/image';

const Partners = () => (
  <div className="w-full flex flex-col items-center bg-[color:#4686C1] font-poppins gap-6 lg:px-32 pt-8">
    <h1 className="text-white font-bold text-3xl">Our Partners</h1>
    <div className="relative w-full h-[120px] sm:h-[200px] max-w-screen-lg bg-white overflow-hidden">
      <div className="flex absolute left-0 animate h-full w-[200%]">
        <div className="flex w-1/2 justify-around">
          <Image
            width={200}
            height={200}
            src="/images/company-default.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-1.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-2.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-3.jpg"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-4.jpg"
            alt="logo-1"
            objectFit="contain"
          />
        </div>
        <div className="flex w-1/2 justify-around">
          <Image
            width={200}
            height={200}
            src="/images/company-default.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-1.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-2.png"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-3.jpg"
            alt="logo-1"
            objectFit="contain"
          />
          <Image
            width={200}
            height={200}
            src="/images/company-logo-4.jpg"
            alt="logo-1"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Partners;
