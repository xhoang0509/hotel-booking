import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

export default function Header() {
    return (
        <div className="bg-primary text-[#fff] flex justify-center items-center">
            <nav className="w-full md:w-3/5 flex justify-between p-3">
                <div className="flex items-center">
                    <span className="text-xl text-bold cursor-pointer">
                        <Link href="/">BOOKING.COM</Link>                                
                    </span>
                </div>
                <div className='text-bold'>
                    <span className='px-3 py-2'>VND</span>
                    <span className='px-3 py-2'><FontAwesomeIcon icon={faCircleQuestion} className='text-base w-5 inline-block'/></span>
                    <span className='px-3 py-2'>
                        <a>Đăng ký chỗ nghỉ Quý vị</a>
                    </span>
                    <button className='px-3 py-2'>
                        <span className='bg-white text-primary p-2 rounded-sm'>
                            <Link href="/account/register">Đăng ký</Link>
                        </span>
                    </button>
                    <button className='px-3 py-2'>
                        <span className='bg-white text-primary p-2 rounded-sm'>
                            <Link href="/account/login">Đăng nhập</Link>
                        </span>
                    </button>
                </div>
            </nav>
            <nav>

            </nav>
        </div>
    )
}