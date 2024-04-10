import { useEffect, useState } from "react";
import SideNavigation from "./SideNavigation";
import { useDispatch } from "react-redux";
import { toggleCart } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ShoppingBag } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import SubNavigation from "./SubNavigation";
import CartButton from "../../cartButton";
import userService from "@/helpers/userHelpers";
import { useRouter } from "next/navigation";

function Navbar() {
  // Check user login status
  const { currentUser } = useAppSelector((state) => state.auth.login);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      await userService.getUserById(dispatch);
    };
    fetchData();
  }, [dispatch]);

  // get user info from redux store
  const [userDropdown, setUserDropdown] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleLogout = async () => {
    if (currentUser) {
      await userService.logout(dispatch, router, currentUser.accessToken);
    }
  };
  useEffect(() => {
    setPrevScrollPos(window.scrollY);
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      setIsNavbarVisible(!isScrollingDown || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`sticky top-0 z-10 duration-300 
      ${isNavbarVisible ? "" : "-translate-y-full"}`}
    >
      <div className=" p-4 bg-white flex items-center justify-between">
        <div
          className="text-primary-700 text-base font-semibold border-b hidden lg:block
        border-primary-950 hover:text-primary-950"
        >
          <Link href="/products"> Tất cả sản phẩm </Link>
        </div>
        <div className="block lg:hidden">
          <SideNavigation
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Common section */}
        <div className="relative w-[180px] h-[60px] lg:order-first">
          <Link href="/">
            <Image
              src="/logo.svg"
              style={{ objectFit: "cover" }}
              alt="logo"
              fill
            />
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <div className="relative flex justify-center">
            <CartButton />
          </div>
          <div>
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setUserDropdown(!userDropdown)}>
                  <Image
                    src="/images/four.jpg"
                    alt="profile"
                    className="object-cover w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  {userDropdown && (
                    <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg w-40 border p-4">
                      <button className="py-2 px-4 hover:bg-primary-50 w-full">
                        <Link href="/profile">Profile</Link>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="py-2 px-4 hover:bg-primary-50 w-full"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-900 hover:text-white border hover:bg-gray-900 
            focus:ring-2 focus:outline-none focus:ring-gray-300 
            font-medium rounded-lg text-sm px-4 py-2.5 text-center hidden lg:block"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Sub navigation */}
      <div className="hidden lg:block bg-primary-50 p-4 border-primary-400 shadow-md">
        <SubNavigation />
      </div>
    </div>
  );
}

export default Navbar;
