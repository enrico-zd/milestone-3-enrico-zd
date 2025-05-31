import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full h-[210px] shadow-[0_-3px_5px_-3px_rgba(0,0,0,0.2)] relative">
            <div className="flex flex-row justify-around">
                <div className="w-[400px] mt-6">
                    <h2 className="text-xl font-semibold">RevoShop</h2>
                    <p>
                        Your premier destination for quality products across electronics, furniture, accessories and more. 
                        We provide a seamless shopping experience with curated selections for every need.
                    </p>
                </div>
                <div className="w-[100px] flex flex-col mt-6">
                    <h2 className="text-xl font-semibold">Help</h2>
                    <ul>
                        <li> 
                            <Link
                            href="/"
                            >
                                Contact Us
                            </Link> 
                        </li>
                        <li> 
                            <Link
                            href="/faq"
                            >
                                FAQ
                            </Link> 
                        </li>
                    </ul>
                </div>
                <div className="w-[400px] mt-6">
                    <h2 className="text-xl font-semibold">Reach Us</h2>
                    <div className="flex flex-row gap-2">
                        <FontAwesomeIcon icon={faLocationDot} className="mt-1 ml-0.5 w-[13px] h-[17px]"/>
                        <p>GoWork RDTX Square, 2nd Floor Jl. Prof. DR. Satrio No.164</p>
                    </div>
                    <div className="flex flex-row gap-1.5">
                        <FontAwesomeIcon icon={faAddressBook} className="mt-1 ml-0.5 w-[15px] h-[16px]" />
                        <p>0812-8758-1385</p>
                    </div>
                    <div className="flex flex-row gap-1.5">
                        <FontAwesomeIcon icon={faEnvelope}className="mt-1 w-[18px] h-[13px]" />
                        <p>support@revoshop.com</p>
                    </div>
                    
                    
                </div>
            </div>

            <div className="flex flex-row justify-between mx-6 my-6">
                <p>&copy; 2025 - RevoShop. All Rights Reserved</p>
                <div className="flex flex-row gap-2">
                    <Image 
                        src={"/linkedin.png"}
                        width={23}
                        height={20}
                        alt="linkedin"
                    />
                    <Image 
                        src={"/instagram.png"}
                        width={23}
                        height={20}
                        alt="instagram"
                    />
                    <Image 
                        src={"/github.png"}
                        width={23}
                        height={20}
                        alt="github"
                    />
                    <Image 
                        src={"/bluesky.png"}
                        width={23}
                        height={20}
                        alt="bluesky"
                    />
                </div>
            </div>
        </div>
    );
}