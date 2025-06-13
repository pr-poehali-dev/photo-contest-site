import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  userRole?: "participant" | "judge" | null;
  userName?: string;
}

const Navigation = ({ userRole, userName }: NavigationProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Camera" size={32} className="text-primary" />
            <span className="text-xl font-montserrat font-bold text-gray-900">
              ФотоКонкурс
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Главная
            </Link>

            {userRole === "participant" && (
              <>
                <Link
                  to="/participant"
                  className={`font-medium transition-colors ${
                    isActive("/participant")
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Мой кабинет
                </Link>
                <Link
                  to="/participant/upload"
                  className={`font-medium transition-colors ${
                    isActive("/participant/upload")
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Загрузить фото
                </Link>
              </>
            )}

            {userRole === "judge" && (
              <>
                <Link
                  to="/judge"
                  className={`font-medium transition-colors ${
                    isActive("/judge")
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Кабинет судьи
                </Link>
                <Link
                  to="/judge/voting"
                  className={`font-medium transition-colors ${
                    isActive("/judge/voting")
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  Голосование
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {userName ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Привет, {userName}
                </span>
                <Button variant="outline" size="sm">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выход
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">
                    Вход
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">Регистрация</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
