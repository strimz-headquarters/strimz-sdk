import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import { TxPropsTypes } from "@/types/dashboard";
import Image from "next/image";
import { GoArrowDownRight } from "react-icons/go";

/**
 * WalletFundTx component renders a transaction item representing a wallet funding operation.
 *
 * The component displays information about a wallet funding transaction, including the title,
 * date, amount, token type, and transaction status. It includes an icon representing the token
 * type and changes background color on hover for better user interaction.
 *
 * Props:
 * @param {string} title - The title of the transaction.
 * @param {string} date - The date and time of the transaction.
 * @param {string} amount - The amount involved in the transaction.
 * @param {"USDC" | "USDT"} token - The type of token used in the transaction.
 * @param {"Completed" | "Failed" | "In progress"} status - The status of the transaction.
 *
 * @returns {React.ReactElement} A styled component displaying transaction details.
 */

const WalletFundTx = ({ title, date, amount, token, status }: TxPropsTypes) => {
    return (
        <main className="w-full flex justify-between items-center cursor-pointer hover:bg-[#F9FAFB] transition-all px-2 py-2 rounded-[8px]">
            <div className="flex items-center gap-3">
                <span className={`relative w-[40px] h-[40px] rounded-full text-primary bg-[#F3F4F6] flex justify-center items-center`}>
                    <GoArrowDownRight className="w-4 h-4" />
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

export default WalletFundTx