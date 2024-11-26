import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/authUser";
import { LogOut, User } from "lucide-react";

const Nav = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-grey-300 mt-4 border-black bg-slate-200 fixed w-full top-0 z-40">
      <div className="container mx-auto px-1 rounded-2xl h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">MeChat</h1>
            </Link>
          </div>

          <div className="relative flex items-center gap-2 group">
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 flex items-center group-hover:opacity-80 transition">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button (Visible on Hover) */}
                <button
                  onClick={logout}
                  className={`
                    absolute top-full mt-2 left-0 bg-red-500 text-white 
                    text-sm py-1 px-3 rounded-lg shadow-lg opacity-0 
                    group-hover:opacity-100 transition-all duration-200`}
                >
                  <LogOut className="w-4 h-4 inline-block mr-1" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
