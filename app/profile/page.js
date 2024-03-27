"use client"
import Image from "next/image";
import AppLayout from "@/layouts/AppLayout";
import React from "react";
import { useAppSelector } from "@/lib/hooks";



const Profile = () => {
    const {user} = useAppSelector(state => state.auth)
  return (
    <>
      <AppLayout>
      <div className="space-y-5 profile-page">
          <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-gray-100 dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 gap-8 items-end relative z-[1]">
            <div className="bg-gradients dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
            <div className="profile-box flex-none md:text-start text-center">
              <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                    <Image
                      src={user?.profile ? `${userProfile}/${user.profile}` : '/assets/images/asCustomer.png'}
                      alt={`${user?.first_name} ${user?.last_name}`}
                      className="w-full h-full object-cover rounded-full"
                      width={186}
                      height={186}
                    />
                    {/* <Link
                      to={"/dashboard/user/settings"}
                      className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                    >
                      <Icon icon="heroicons:pencil-square" />
                    </Link> */}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                    {`${user?.first_name} ${user?.last_name}`}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[700px] md:space-y-0 space-y-4 lg:gap-2">
              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">Email</div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">{user?.email}</div>
              </div>

              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">Phone</div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">{user?.phone}</div>
              </div>

              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">Address</div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  {user?.address ? user?.address : "--"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Profile;
