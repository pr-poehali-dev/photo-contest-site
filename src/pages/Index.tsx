import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-montserrat font-bold text-gray-900 mb-6">
            Международный
            <span className="text-primary block">Фотоконкурс 2025</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Покажите миру свой взгляд через объектив. Участвуйте в престижном
            конкурсе и получите шанс выиграть главный приз 100 000 ₽
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="px-8 py-3 text-lg font-semibold hover-scale"
              >
                <Icon name="Camera" size={20} className="mr-2" />
                Принять участие
              </Button>
            </Link>
            <Link to="/judge">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg hover-scale"
              >
                <Icon name="Star" size={20} className="mr-2" />
                Стать судьёй
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-gray-600">Участников</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1200+</div>
              <div className="text-gray-600">Работ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-gray-600">Судей</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-montserrat font-bold text-center text-gray-900 mb-12">
            Как это работает
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-scale transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Upload" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl font-montserrat">
                  Загрузите фото
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Зарегистрируйтесь, оплатите участие и загрузите до 3 работ в
                  любой из 5 номинаций
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl font-montserrat">
                  Профессиональная оценка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Жюри из 50+ профессиональных фотографов оценит каждую работу
                  по 10-балльной шкале
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Trophy" size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl font-montserrat">
                  Получите награды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Победители получат денежные призы, сертификаты и возможности
                  для профессионального роста
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contest Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-gray-900 mb-6">
                Условия участия
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-500"
                  />
                  <span>Взнос за участие: 1 500 ₽</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-500"
                  />
                  <span>До 3 работ от одного участника</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-500"
                  />
                  <span>5 номинаций на выбор</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon
                    name="CheckCircle"
                    size={20}
                    className="text-green-500"
                  />
                  <span>Разрешение фото: минимум 2000×1500 px</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-montserrat font-bold text-gray-900 mb-4">
                Призовой фонд
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">1 место</span>
                  <span className="text-xl font-bold text-primary">
                    100 000 ₽
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">2 место</span>
                  <span className="text-xl font-bold text-primary">
                    50 000 ₽
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">3 место</span>
                  <span className="text-xl font-bold text-primary">
                    25 000 ₽
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Номинации (×5)</span>
                  <span className="text-lg font-bold text-primary">
                    по 10 000 ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-montserrat font-bold mb-4">
            Готовы показать свой талант?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к конкурсу уже сегодня и получите шанс выиграть
            главный приз
          </p>
          <Link to="/auth/register">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-3 text-lg font-semibold hover-scale"
            >
              Участвовать в конкурсе
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Camera" size={24} className="text-primary" />
            <span className="text-xl font-montserrat font-bold">
              ФотоКонкурс
            </span>
          </div>
          <p className="text-gray-400 mb-8">
            Международная платформа для фотографов всех уровней
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">
              Правила
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Контакты
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Поддержка
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
