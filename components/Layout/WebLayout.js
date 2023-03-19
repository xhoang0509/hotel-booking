export default function WebLayout({ children }) {
    return (
        <div className="lg:w-9/12 md:w-full mx-auto min-h-[70vh] my-12">
            {children}
        </div>
    )
}