import { SideBarLinksTypes } from "@/types/dashboard";
import { AiOutlineDollar } from "react-icons/ai";
import { GoHome, GoHistory } from "react-icons/go";

export const SideBarLinks: SideBarLinksTypes[] = [
    {
        href: "/user",
        title: "Home",
        icon: <GoHome className="w-[20px] h-[20px]" />
    },
    {
        href: "/user/payroll",
        title: "Payroll",
        icon: <AiOutlineDollar className="w-[20px] h-[20px]" />
    },
    {
        href: "/user/transaction-history",
        title: "Tx History",
        icon: <GoHistory className="w-[20px] h-[20px]" />
    },
]