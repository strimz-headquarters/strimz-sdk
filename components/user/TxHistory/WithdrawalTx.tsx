import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import { TxPropsTypes } from "@/types/dashboard";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

/**
 * WithdrawalTx component renders a transaction with a withdrawal type.
 *
 * The component renders a withdrawal transaction with the given title, date,
 * amount, token, and status.
 *
 * @param {{ title: string, date: string, amount: string, token: "USDC" | "USDT", status: "Completed" | "Failed" | "In progress" }} props
 * @returns {React.ReactElement} A transaction with a withdrawal type.
 */
const WithdrawalTx = ({ title, date, amount, token, status }: TxPropsTypes) => {
    return (
        <main className="w-full flex justify-between items-center cursor-pointer hover:bg-[#F9FAFB] transition-all px-2 py-2 rounded-[8px]">
            <div className="flex items-center gap-3">
                <span className={`relative w-[40px] h-[40px] rounded-full text-primary bg-[#F3F4F6] flex justify-center items-center`}>
                    <GoArrowUpRight className="w-4 h-4" />
                    {token === "USDC" && <Image src={usdcIcon} alt='usdt icon' className='w-6 h-6 absolute -bottom-2 -right-2' width={68} height={69} quality={100} priority />}
                    {token === "USDT" && <Image src={usdtIcon} alt='usdt icon' className='w-6 h-6 absolute -bottom-2 -right-2' width={68} height={69} quality={100} priority />}
                </span>
                <div className="flex flex-col gap-1">
                    <h4 className="text-primary text-sm font-[500] font-poppins">{title}</h4>
                    <p className="text-xs font-[400] font-poppins text-[#8E8C9C]">{date}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                <h4 className="text-primary text-sm font-[500] font-poppins">${amount}</h4>
                <p className="flex items-center gap-1 text-xs font-[400] font-poppins text-[#58556A]">
                    <span className={`w-[8px] h-[8px] bg-white rounded-full border-2 ${status === "Completed" ? "border-green-600" : status === "Failed" ? "border-rose-600" : "border-yellow-600"}`} />
                    {status}
                </p>
            </div>
        </main>
    )
}

export default WithdrawalTx