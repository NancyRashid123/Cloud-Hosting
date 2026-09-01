import Image from 'next/image'
import { TiTick } from 'react-icons/ti'
import CloudImage from '../../public/cloud-hosting.png'

export default function HeroSection() {
  return (
    <section>
       <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between">
      
      {/* Content */}
      <div className="flex flex-col lg:items-start lg:text-left " >
       

        <h2 className="mt-5 text-2xl font-extrabold leading-tight text-gray-800 w-[80%] lg:text-5xl">
          The Best Cloud Hosting for Your Business
        </h2>

        <p className="mt-5 text-md leading-6 text-gray-500 w-[80%] lg:text-lg">
          The web hosting solution for your online success. Fast, secure and
          reliable hosting with everything you need to grow your website.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <TiTick className="text-2xl text-blue-500" />
            <span>Easy To Use Control Panel</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <TiTick className="text-2xl text-blue-500"/>
            <span>Secure Hosting</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <TiTick className="text-2xl text-blue-500" />
            <span>Website Maintenance</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src={CloudImage}
          alt="Cloud Hosting"
          width={500}
          height={500}
        />
      </div>

    </div>
    </section>
  )
}
