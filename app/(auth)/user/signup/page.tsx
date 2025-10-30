import SignupForm from "@/components/auth/Signup";
import Logo from "@/components/shared/Logo";
import StrimzLogo from "@/public/logo/whiteLogo.png"
import authPattern from "@/public/patterns/authPattern.png"
import authPattern2 from "@/public/patterns/authPattern2.png"
import Image from "next/image";

/**
 * A page for users to sign up.
 *
 * The page displays a grid layout. On large screens, the left column displays
 * the Strimz logo, a heading, a subheading, and a background pattern. The right
 * column displays the SignupForm component.
 *
 * The design includes responsive styling for different screen sizes and
 * backgrounds with patterns for visual interest.
 */
export default function UserSignup() {
    return (
        <main className="w-full min-h-screen grid md:grid-cols-8 px-5 md:px-0">
            <section className="md:col-span-3 hidden md:flex flex-col bg-[#050020] overflow-hidden relative lg:pt-12 pt-8 lg:px-12 px-6 gap-16">
                <Logo href='/' className='w-[101px]' image={StrimzLogo} />
                <div className="lg:w-[337px] flex flex-col gap-2">
                    <h3 className="text-[40px] leading-[48px] font-[700] font-sora text-white">Streamline payments anytime ⚡</h3>
                    <p className="text-base font-[400] font-poppins text-[#8E8C9C]">Log in to manage your subscriptions with ease.</p>
                </div>
                <div className="absolute lg:left-0 -left-12 lg:bottom-0 -bottom-12 flex">
                    <Image src={authPattern} className="w-[278.05px] h-[225.76px]" alt="pattern" width={1258} height={740} priority quality={100} />
                    <Image src={authPattern2} className="w-[278.05px] -ml-20 h-[225.76px]" alt="pattern" width={1107} height={740} priority quality={100} />
                </div>
            </section>
            <section className="md:col-span-5 flex justify-center items-center bg-[#F9FAFB]">
                <SignupForm />
            </section>
        </main>
    );
}