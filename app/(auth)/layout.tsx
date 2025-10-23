
/**
 * The AuthLayout component renders a basic layout for authentication pages.
 * It is a functional component that accepts a single prop, "children", which
 * is a React node that contains the content to be rendered within the layout.
 *
 * The component wraps the content in a section element with a class of "w-full".
 * This results in the content being displayed in a full-width container.
 *
 * @param {{ children: React.ReactNode }} props The props for the component.
 * @prop {React.ReactNode} children The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered component.
 */
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full">
            {children}
        </section>
    );
}