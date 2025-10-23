"use client";
import { useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../shared/Logo";
import StrimzLogo from "@/public/logo/blueLogo.png"
import { SideBarLinksTypes } from "@/types/dashboard";
import { SideBarLinks } from "@/utils/sideBarLinks";

/**
 * The SideBar component renders a collapsible sidebar for the dashboard.
 * 
 * Props:
 * - `sidebarOpen`: A boolean that indicates whether the sidebar is open or closed.
 * - `setSidebarOpen`: A function to toggle the `sidebarOpen` state.
 * 
 * The component includes:
 * - A header with a logo linking to the user's homepage and a toggle button for mobile view.
 * - A navigation menu with links to different sections, which are highlighted based on the current pathname.
 * - A footer with an upgrade button redirecting to the plan upgrade page.
 * 
 * The sidebar's visibility affects the document's scroll behavior.
 */

const SideBar = ({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const trigger = useRef(null);
    const sidebar = useRef(null);

    const pathname = usePathname();
    const router = useRouter()

    const handleCloseSideBar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const toggleScroll = () => {
            document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
        };
        toggleScroll();

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [sidebarOpen]);


    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-[9999] flex h-[100svh] w-64 flex-col justify-between overflow-y-hidden bg-[#F9FAFB] duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex flex-col">
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex flex-col gap-2 font-barlow px-6 py-8 lg:py-6.5">
                    <div className="flex items-start justify-between gap-2  ">
                        <Logo href='/user' className='w-[101.58px] md:w-[110.58px] lg:w-[130px]' image={StrimzLogo} />

                        <button
                            ref={trigger}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            className="block lg:hidden text-primary"
                        >
                            <IoIosArrowRoundBack className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* <!-- SIDEBAR HEADER --> */}

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-3 pb-4 px-4 lg:mt-3 lg:px-6">
                        {/* <!-- Menu Group --> */}
                        <div>
                            <ul className="font-poppins flex flex-col gap-1.5">
                                {/* <!-- Menu Item Calendar --> */}
                                {SideBarLinks.map((link: SideBarLinksTypes, index: number) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-2 text-sm font-[400] p-[12px] rounded-[8px] font-poppins text-[#58556A] transition-all hover:bg-[#FFFFFF] border hover:border-[#E5E7EB] hover:shadow-sidebarLinkShadow hover:text-primary ${pathname === link.href && "bg-white border-[#E5E7EB] shadow-sidebarLinkShadow text-primary"}`}
                                            onClick={handleCloseSideBar}
                                        >
                                            {link.icon}
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </div>

            {/* <!-- Sidebar Footer --> */}
            <div className="w-full flex flex-col px-3 pb-8">
                <div className="w-full flex flex-col justify-between h-[120px] alertGradient rounded-[12px] p-4">
                    <p className="text-[#F9FAFB] font-[500] font-sora text-sm">Unlock more with a plan upgrade ⚡</p>
                    <button type="button" onClick={() => router.push("/user/account/plan")} className="w-full h-[32px] flex justify-center items-center rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] text-primary text-xs">Upgrade</button>
                </div>

            </div>
        </aside>
    );
};

export default SideBar;