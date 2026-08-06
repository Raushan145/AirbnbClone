import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavSkeleton = () => {
  return (
     <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm ">
        <div className="flex justify-between items-center md:gap-0 gap-2 md:px-10 px-5 md:py-4 py-1">
    
          {/* Logo */}
          <Skeleton width={60} height={35} borderRadius={200}/>
    
          {/* Search */}
         <div className="w-[250px] md:w-[550px]">
          <Skeleton width="100%" height={35} borderRadius={999} />
        </div>
    
          <div className="flex justify-between items-center gap-10">
            {/* reservation */}
            <div className="hidden md:block">
              <Skeleton width={100} height={35} borderRadius={999} />
            </div>
          {/* List Your Home */}
            <div className="hidden md:block">
              <Skeleton width={100} height={35} borderRadius={999} />
            </div>
          {/* Profile */}
          <Skeleton circle width={35}  height={35}/>
          </div>
    
        </div>
    
        {/* Categories */}
        <div className="flex gap-4 px-6 py-3 overflow-x-hidden flex md:justify-center md:items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              width={50}
              height={25}
              borderRadius={20}
            />
          ))}
        </div>
      </div>
  )
}

export default NavSkeleton
