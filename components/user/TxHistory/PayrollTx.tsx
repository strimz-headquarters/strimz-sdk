import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import { TxPropsTypes } from "@/types/dashboard";
import Image from "next/image";
import { AiOutlineDollarCircle } from "react-icons/ai";


/**
 * PayrollTx component displays a payroll transaction item with its details.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the transaction.
 * @param {string} props.date - The date of the transaction.
 * @param {string} props.amount - The amount involved in the transaction.
 * @param {"USDC" | "USDT"} props.token - The token type used in the transaction.
 * @param {"Completed" | "Failed" | "In progress"} props.status - The current status of the transaction.
 *
 * @returns A JSX element representing the payroll transaction item.
 */

const PayrollTx = ({ title, date, amount, token, status }: TxPropsTypes) => {
    return (
        <main className="w-full flex justify-between items-center cursor-pointer hover:bg-[#F9FAFB] transition-all px-2 py-2 rounded-[8px]">
            <div className="flex items-center gap-3">
                <span className={`relative w-[40px] h-[40px] rounded-full text-primary bg-[#F3F4F6] flex justify-center items-center`}>
                    <AiOutlineDollarCircle className="w-4 h-4" />
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

export default PayrollTx