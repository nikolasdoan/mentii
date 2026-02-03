export function Footer() {
    return (
        <footer className="border-t bg-white py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-8">
                <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
                    Built for <strong>Mentii Demo</strong>. Not a real product.
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>Fake Terms</span>
                    <span>Fake Privacy</span>
                </div>
            </div>
        </footer>
    );
}
