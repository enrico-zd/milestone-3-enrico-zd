import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

export default function Navigation() {
    return (
        <header>
            <nav className="flex justify-center items-center h-12 shadow-sm text-lg">
                <div className="flex flex-row justify-between items-center w-[80%] h-full">
                <Link className="z-10" href="/">RevoShop</Link>
                <div className="flex gap-4 items-center z-10">

                    {/* cart page */}
                    <Link href="/cart"><FontAwesomeIcon icon={faCartShopping} width={28}/></Link>
                </div>
                </div>
            </nav>
            </header>
    )
}