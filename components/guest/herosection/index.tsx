'use client'
import React from 'react'
import strimzVector from '@/public/logoIcons/StrimzVector.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { MoveRight } from 'lucide-react'
import StackedUsers from './StackedUsers'
import netflix from "@/public/brands/Netflix.svg"
import showmax from "@/public/brands/Showmax.svg"
import spotify from "@/public/brands/Spotify.svg"
import startimes from "@/public/brands/Startimes.svg"
import airtel from "@/public/brands/Airtel.svg"
import mtn from "@/public/brands/MTN.svg"
import MovingText from '@/components/shared/MovingText'

/**
 * HeroSection is a functional component that serves as the landing page for guests.
 * It contains a background pattern, a group of subscription and utility brands, and a call-to-action
 * to encourage users to start automating their payroll with Strimz.
 *
 * @returns {JSX.Element} A section element that wraps the guest page hero section.
 */
const HeroSection = () => {

    const router = useRouter()

    return (
        <>
            <section className='w-full min-h-screen lg:pt-[44px] pt-[36px] overflow-x-hidden bg-white'>
                <main className="max-w-[900px] mx-auto w-full flex flex-col items-center gap-6 px-4">
                    {/* top section */}
                    <div className='w-full h-[580px] md:h-auto relative flex flex-col items-center justify-start'>
                        {/* Waves 1 */}
                        <div className='relative overflow-hidden md:w-[600px] md:h-[600px] w-full aspect-square rounded-full bg-gradient-to-b from-[#F0FFF8] to-[#FFFFFF] flex justify-center items-center'>

                            {/* Waves 2 */}
                            <div className="relative md:w-[450px] md:h-[450px] w-[280px] h-[280px] rounded-full bg-gradient-to-b from-[#CCFFE7] to-[#FFFFFF] flex justify-center items-center before:absolute before:w-full before:h-full before:inset-0 before:rounded-full before:bg-accent/60 before:animate-custom-ping before:opacity-60 before:delay-[500ms]">

                                {/* brands */}
                                {/* Left side */}
                                <Image src={airtel} alt="airtel" className="w-[48px] md:w-[70px] h-[48px] md:h-[70px] absolute -top-[4%] left-[30%] drop-shadow-brandShadow" width={72} height={72} priority quality={100} />

                                <Image src={showmax} alt="showmax" className="w-[34px] md:w-[48px] h-[34px] md:h-[48px] absolute top-[8%] left-[10%] drop-shadow-brandShadow" width={48} height={48} priority quality={100} />

                                <Image src={netflix} alt="netflix" className="w-[48px] md:w-[75px] h-[48px] md:h-[75px] drop-shadow-brandShadow absolute top-[30%] -left-[5%]" width={72} height={72} priority quality={100} />

                                {/* right side */}
                                <Image src={spotify} alt="spotify" className="w-[48px] md:w-[70px] h-[48px] md:h-[70px] drop-shadow-brandShadow absolute -top-[4%] right-[30%]" width={72} height={72} priority quality={100} />

                                <Image src={startimes} alt="startimes" className="w-[34px] md:w-[50px] h-[34px] md:h-[50px] drop-shadow-brandShadow absolute top-[8%] right-[10%]" width={48} height={48} priority quality={100} />

                                <Image src={mtn} alt="MTN" className="w-[48px] md:w-[70px] h-[48px] md:h-[70px] drop-shadow-brandShadow absolute top-[30%] -right-[5%]" width={72} height={72} priority quality={100} />

                                {/* Waves 3 */}
                                <div className='relative md:w-[300px] md:h-[300px] w-[180px] h-[180px] rounded-full bg-gradient-to-b from-[#B3FEDB] to-[#FFFFFF] flex justify-center items-center'>

                                    {/* strimz at the core */}
                                    <span className='flex lg:w-[100px] lg:h-[100px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] relative'>
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-85" />
                                        <Image src={strimzVector} alt='logo' className='w-full h-full' width={120} height={120} priority quality={100} />
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* group of text */}
                        <div className='absolute bottom-0 inset-x-0 w-full bg-gradient-to-b from-white/0 to-white flex flex-col items-center gap-4'>
                            <h1 className="font-sora font-[700] lg:text-[56px] md:text-[56px] text-[40px] lg:leading-[64px] md:leading-[56px] leading-[48px] text-primary text-center">Accept Crypto Payments for Subscriptions & Utilities</h1>
                            <p className="text-[#58556A] font-poppins font-[400] text-base text-center">Integrate Strimz SDK to enable your users to pay for subscriptions and utilities with cryptocurrency. Automated, secure, and compliant.</p>
                            <InteractiveHoverButton
                                type='button'
                                onClick={() => router.push("/auth")}
                                icon={<MoveRight className="w-5 h-5" />}
                                innerClassName='bg-accent rounded-[8px]'
                                className='w-[150px] h-[48px] flex justify-center items-center bg-accent rounded-[8px] cursor-pointer text-[14px] font-[500] font-poppins text-white hover:text-white shadow-ctaShadow'>
                                Get Started
                            </InteractiveHoverButton>
                        </div>
                    </div>

                    {/* bottom section */}
                    <StackedUsers />
                </main>
            </section>
            <MovingText />
        </>
    )
}

export default HeroSection