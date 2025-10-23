import React from 'react'
import icon1 from "@/public/art/1.svg"
import icon2 from "@/public/art/2.svg"
import icon3 from "@/public/art/3.svg"
import Image from 'next/image'
import { Element } from 'react-scroll'
import PaddedLines from '@/components/shared/paddedLines'

/**
 * Features is a functional component that renders a section highlighting the features of Strimz.
 * It contains three features: Easy Payments, Pay in crypto, and Fast transactions.
 * Each feature is represented by an icon, a heading, and a description.
 * The component is styled with responsive design considerations, ensuring compatibility across various screen sizes.
 */
const Features = () => {
    return (
        <Element name='features'>
            <section className="bg-primary w-full flex justify-center items-center px-4 py-9 md:px-0 md:py-16">
                <main className='w-full max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6'>

                    {/* one */}
                    <div className='w-full flex flex-col p-4'>
                        <Image src={icon1} alt="icon" width={72} height={72} quality={100} priority />
                        <h3 className='text-white font-sora font-[600] text-[24px] leading-[32px] mt-6'>Easy Payments</h3>
                        <p className='text-[#BCBAC4] font-poppins font-[400] text-base leading-[28px] mt-2'>Pay for subscriptions, utilities, and airtime with crypto. No bank accounts needed—just select a service and pay.</p>
                    </div>

                    {/* two */}
                    <div className='w-full flex flex-col p-4'>
                        <Image src={icon2} alt="icon" width={72} height={72} quality={100} priority />
                        <h3 className='text-white font-sora font-[600] text-[24px] leading-[32px] mt-6'>Pay in crypto</h3>
                        <p className='text-[#BCBAC4] font-poppins font-[400] leading-[28px] text-base mt-2'>Use your stablecoins to make payments as an alternative to fiat. Pay directly from your wallet without conversions.</p>
                    </div>

                    {/* three */}
                    <div className='w-full flex flex-col p-4'>
                        <Image src={icon3} alt="icon" width={72} height={72} quality={100} priority />
                        <h3 className='text-white font-sora font-[600] text-[24px] leading-[32px] mt-6'>Fast transactions</h3>
                        <p className='text-[#BCBAC4] font-poppins font-[400] leading-[28px] text-base mt-2'>Payments process quickly and instantly, keeping your services active without delays or bank approvals.</p>
                    </div>

                </main>
            </section>
            <PaddedLines />
        </Element>
    )
}

export default Features