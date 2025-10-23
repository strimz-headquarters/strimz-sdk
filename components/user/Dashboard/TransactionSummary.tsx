import Link from "next/link"
import WalletFundTx from "../TxHistory/WalletFundTx"
import PayrollTx from "../TxHistory/PayrollTx"


/**
 * TransactionSummary component renders a section with a summary of the user's recent transactions.
 *
 * The component displays information about the user's recent transactions, including the date, amount,
 * token type, and transaction status. The component also includes a link to the user's transaction history.
 *
 * @returns {React.ReactElement} A styled component displaying the user's recent transactions.
 */
const TransactionSummary = () => {
    return (
        <section className="w-full flex flex-col gap-3 mt-4">
            <div className="w-full flex justify-between items-center px-1.5">
                <h4 className="text-primary font-[500] font-poppins text-sm capitalize">Transaction History</h4>
                <Link href="/user/transaction-history" className="underline text-[#58556A] text-sm font-[400] font-poppins">See all</Link>
            </div>

            {/* no data */}
            {/* <div className="w-full h-[245px] bg-[#F9FAFB] rounded-[12px] flex justify-center items-center">
                <div className="w-full flex flex-col justify-center gap-1 items-center">
                    <h4 className="text-strimzPrimary font-[500] font-poppins text-sm">Not transactions yet</h4>
                    <p className="text-[#58556A] md:w-[50%] w-[80%] text-center text-xs font-[400] font-poppins">Your transaction history will appear here once you start streaming payments.</p>
                </div>
            </div> */}

            {/* with data */}
            <div className="w-full flex flex-col gap-2">
                {/* walletfunding */}
                <WalletFundTx title="USDT Wallet funding" date="10th Jun, 24 at 9:30AM" amount="1,000" status="In progress" token="USDT" />
                <WalletFundTx title="USDC Wallet funding" date="20th April, 24 at 9:30AM" amount="10,000" status="Completed" token="USDC" />

                {/* payroll */}
                <PayrollTx title="Payment to contract employees" date="15th March, 24 at 10:30AM" amount="10,000" status="Completed" token="USDT" />
                <PayrollTx title="Civil service payroll" date="30th Feburary, 24 at 8:30AM" amount="100,000" status="Failed" token="USDC" />
            </div>
        </section>
    )
}

export default TransactionSummary