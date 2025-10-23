import WalletFundTx from "./WalletFundTx"
import PayrollTx from "./PayrollTx"
import WithdrawalTx from "./WithdrawalTx"

/**
 * AllTx component renders a section with all the different types of transactions.
 *
 * The component renders all the different types of transactions, including wallet funding,
 * payroll, and withdrawal transactions.
 *
 * @returns {React.ReactElement} A section with all the different types of transactions.
 */
const AllTx = () => {
    return (
        <section className="w-full flex flex-col gap-2">
            {/* walletfunding */}
            <WalletFundTx title="USDT Wallet funding" date="10th Jun, 24 at 9:30AM" amount="1,000" status="In progress" token="USDT" />
            <WalletFundTx title="USDC Wallet funding" date="20th April, 24 at 9:30AM" amount="10,000" status="Completed" token="USDC" />

            {/* payroll */}
            <PayrollTx title="Payment to contract employees" date="15th March, 24 at 10:30AM" amount="10,000" status="Completed" token="USDT" />
            <PayrollTx title="Civil service payroll" date="30th Feburary, 24 at 8:30AM" amount="100,000" status="Failed" token="USDC" />

            {/* widthdrawal */}
            <WithdrawalTx title="Withdrawal from USDC wallet" date="9th Jan, 24 at 9:30AM" amount="500" status="Completed" token="USDC" />
        </section>
    )
}

export default AllTx