import React from 'react'
import { useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLinks from './SidebarLinks';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state)=> state.auth);
  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div>Loading...</div>
      </div>
    )
  }
  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {
            sidebarLinks.map((link) => {
              if(link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLinks key={link.id} link={link} iconName={link.icon} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar