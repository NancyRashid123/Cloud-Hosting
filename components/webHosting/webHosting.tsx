import React from 'react'
import { TiTick } from 'react-icons/ti'

export default function WebHostingPlane() {
  return (
    <section className=" py-10">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 flex flex-col gap-3">

  <h3 className="text-3xl font-bold text-blue-700">
    Premium
  </h3>

  <strong className="text-5xl font-extrabold text-gray-900">
    $4.99
    <span className="text-lg font-medium text-gray-500">/mo</span>
  </strong>

  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 w-fit">
    🎉 10% OFF
  </span>

  <div className=" w-full flex flex-col gap-3">
    <h5 className=" text-center text-2xl font-bold text-gray-800">
      Top Features
    </h5>

    <div className="space-y-4">
      <div className="flex items-center gap-3 text-gray-700">
        <TiTick className="text-2xl text-blue-500" />
        <span>100 Websites</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <TiTick className="text-2xl text-blue-500" />
        <span>100 GB SSD Storage</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <TiTick className="text-2xl text-blue-500" />
        <span>Weekly Backups</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <TiTick className="text-2xl text-blue-500" />
        <span>Unlimited Bandwidth</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <TiTick className="text-2xl text-blue-500" />
        <span>Free SSL</span>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <span className="text-2xl text-blue-500">
          <TiTick />
        </span>
        <span>Free Email</span>
      </div>
    </div>
  </div>

  <button className=" w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300">
    BUY NOW
  </button>
</div>
    </section>
  )
}
