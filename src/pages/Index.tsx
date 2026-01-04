import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  model: string;
  power: string;
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = {
    conditioners: [
      {
        id: 1,
        name: 'Настенный кондиционер',
        model: 'Серия Premium',
        power: '2.5 - 7.0 кВт',
        features: ['Инверторное управление', 'Режим обогрева', 'WiFi модуль', 'Ионизация воздуха']
      },
      {
        id: 2,
        name: 'Кассетный кондиционер',
        model: 'Серия Business',
        power: '5.0 - 14.0 кВт',
        features: ['4-х сторонний обдув', 'Скрытая установка', 'Равномерное распределение', 'Тихая работа']
      },
      {
        id: 3,
        name: 'Канальный кондиционер',
        model: 'Серия Industrial',
        power: '7.0 - 22.0 кВт',
        features: ['Скрытая установка', 'Гибкая система воздуховодов', 'Многозональность', 'Мощное охлаждение']
      }
    ],
    fancoils: [
      {
        id: 4,
        name: 'Фанкойл настенный',
        model: 'Серия Comfort',
        power: '1.5 - 4.5 кВт',
        features: ['Компактный дизайн', '3 скорости вентилятора', 'Низкий уровень шума', 'Простой монтаж']
      },
      {
        id: 5,
        name: 'Фанкойл кассетный',
        model: 'Серия Office',
        power: '3.0 - 8.0 кВт',
        features: ['Встраиваемая конструкция', 'Равномерный обдув', 'Высокая эффективность', 'Современный дизайн']
      },
      {
        id: 6,
        name: 'Фанкойл канальный',
        model: 'Серия Pro',
        power: '5.0 - 15.0 кВт',
        features: ['Скрытый монтаж', 'Гибкая интеграция', 'Высокая мощность', 'Надежность']
      }
    ]
  };

  const contacts = [
    { phone: '+7 (993) 137-47-81', label: 'Отдел продаж' },
    { phone: '+7 (917) 419-21-14', label: 'Техническая поддержка' }
  ];

  const addToCart = (product: { id: number; name: string; model: string; power: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Wind" size={36} className="text-white" />
              <div>
                <h1 className="text-3xl font-bold">Комфорт</h1>
                <p className="text-sm opacity-90">Умный климат для вашего бизнеса</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 items-center">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`hover:opacity-80 transition-opacity ${activeSection === 'dashboard' ? 'font-semibold' : ''}`}
              >
                Панель управления
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`hover:opacity-80 transition-opacity ${activeSection === 'catalog' ? 'font-semibold' : ''}`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('prices')}
                className={`hover:opacity-80 transition-opacity ${activeSection === 'prices' ? 'font-semibold' : ''}`}
              >
                Цены
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`hover:opacity-80 transition-opacity ${activeSection === 'contacts' ? 'font-semibold' : ''}`}
              >
                Контакты
              </button>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <button className="relative hover:opacity-80 transition-opacity">
                    <Icon name="ShoppingCart" size={24} />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      Выбранное оборудование для запроса коммерческого предложения
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map((item) => (
                            <Card key={item.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">{item.model}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.power}</p>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-destructive hover:opacity-80"
                                  >
                                    <Icon name="Trash2" size={18} />
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Всего позиций:</span>
                            <span className="font-bold text-lg">{getTotalItems()}</span>
                          </div>
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={() => {
                              setIsCartOpen(false);
                              setActiveSection('contacts');
                            }}
                          >
                            <Icon name="Phone" size={20} className="mr-2" />
                            Получить коммерческое предложение
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">
                            Позвоните нам для уточнения цен и сроков поставки
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">Панель управления</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="AirVent" size={28} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle>Кондиционеры</CardTitle>
                      <CardDescription>Климатическое оборудование</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Широкий выбор кондиционеров для любых помещений</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Icon name="Fan" size={28} className="text-secondary" />
                    </div>
                    <div>
                      <CardTitle>Фанкойлы</CardTitle>
                      <CardDescription>Системы вентиляции</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Эффективные решения для циркуляции воздуха</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon name="PhoneCall" size={28} className="text-accent" />
                    </div>
                    <div>
                      <CardTitle>Консультация</CardTitle>
                      <CardDescription>Профессиональная помощь</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Свяжитесь с нами для расчета стоимости</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Преимущества работы с нами
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Профессиональное оборудование</h4>
                      <p className="text-sm text-muted-foreground">Только сертифицированная техника от ведущих производителей</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Гарантия качества</h4>
                      <p className="text-sm text-muted-foreground">Официальная гарантия на все оборудование и монтажные работы</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Опыт работы</h4>
                      <p className="text-sm text-muted-foreground">Более 10 лет на рынке климатического оборудования</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Индивидуальный подход</h4>
                      <p className="text-sm text-muted-foreground">Решения под конкретные задачи вашего бизнеса</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">Каталог оборудования</h2>
            
            <Tabs defaultValue="conditioners" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="conditioners">Кондиционеры</TabsTrigger>
                <TabsTrigger value="fancoils">Фанкойлы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conditioners" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.conditioners.map((product) => (
                    <Card key={product.id} className="hover-scale">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon name="AirVent" size={28} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <CardDescription>{product.model}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Zap" size={16} className="text-secondary" />
                          <span className="font-medium">Мощность: {product.power}</span>
                        </div>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Check" size={14} className="text-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => addToCart(product)}
                          >
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                          <Button className="flex-1" onClick={() => setActiveSection('contacts')}>
                            <Icon name="Phone" size={16} className="mr-2" />
                            Узнать цену
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fancoils" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.fancoils.map((product) => (
                    <Card key={product.id} className="hover-scale">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-secondary/10 rounded-lg">
                            <Icon name="Fan" size={28} className="text-secondary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <CardDescription>{product.model}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Zap" size={16} className="text-secondary" />
                          <span className="font-medium">Мощность: {product.power}</span>
                        </div>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Check" size={14} className="text-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => addToCart(product)}
                          >
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                          <Button className="flex-1" onClick={() => setActiveSection('contacts')}>
                            <Icon name="Phone" size={16} className="mr-2" />
                            Узнать цену
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'prices' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Цены и условия</h2>
            
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} />
                  Индивидуальный расчет стоимости
                </CardTitle>
                <CardDescription>
                  Цена зависит от модели, объема поставки и условий монтажа
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      Что влияет на стоимость
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Icon name="Building2" size={18} className="text-secondary mt-1" />
                        <div>
                          <p className="font-medium">Площадь помещения</p>
                          <p className="text-sm text-muted-foreground">Размер и высота потолков</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Layers" size={18} className="text-secondary mt-1" />
                        <div>
                          <p className="font-medium">Тип оборудования</p>
                          <p className="text-sm text-muted-foreground">Модель и характеристики</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Wrench" size={18} className="text-secondary mt-1" />
                        <div>
                          <p className="font-medium">Сложность монтажа</p>
                          <p className="text-sm text-muted-foreground">Особенности объекта</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Package" size={18} className="text-secondary mt-1" />
                        <div>
                          <p className="font-medium">Объем заказа</p>
                          <p className="text-sm text-muted-foreground">Количество единиц</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                    <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                      <Icon name="PhoneCall" size={24} />
                      Получите точный расчет
                    </h3>
                    <p className="mb-4 opacity-90">
                      Свяжитесь с нами по телефону для расчета стоимости и консультации по оборудованию
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contacts.map((contact, idx) => (
                        <div key={idx} className="bg-white/10 p-4 rounded-lg">
                          <p className="text-sm opacity-80 mb-1">{contact.label}</p>
                          <a
                            href={`tel:${contact.phone.replace(/\D/g, '')}`}
                            className="text-xl font-bold hover:opacity-80 transition-opacity"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Award" size={22} />
                        Дополнительные услуги
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b">
                          <span>Выезд специалиста на объект</span>
                          <span className="font-medium text-primary">Бесплатно</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span>Проектирование системы</span>
                          <span className="font-medium">По запросу</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span>Монтаж и пусконаладка</span>
                          <span className="font-medium">По запросу</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span>Гарантийное обслуживание</span>
                          <span className="font-medium text-primary">Включено</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Контакты</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contacts.map((contact, idx) => (
                <Card key={idx} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name="Phone" size={28} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle>{contact.label}</CardTitle>
                        <CardDescription>Звоните в рабочее время</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`tel:${contact.phone.replace(/\D/g, '')}`}
                      className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
                    >
                      {contact.phone}
                    </a>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="Clock" size={16} />
                        <span>Пн-Пт: 9:00 - 18:00</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span>Сб-Вс: Выходной</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Как с нами связаться
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="PhoneCall" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Позвоните нам</h4>
                      <p className="text-sm text-muted-foreground">
                        Наши специалисты ответят на все вопросы и помогут с выбором оборудования
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Отправьте запрос</h4>
                      <p className="text-sm text-muted-foreground">
                        Мы свяжемся с вами в течение рабочего дня для уточнения деталей
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Выезд на объект</h4>
                      <p className="text-sm text-muted-foreground">
                        Бесплатный выезд специалиста для замеров и консультации
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Готовы начать?</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Позвоните нам прямо сейчас для консультации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${contacts[0].phone.replace(/\D/g, '')}`}
                  >
                    <Icon name="Phone" size={20} className="mr-2" />
                    {contacts[0].phone}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={() => window.location.href = `tel:${contacts[1].phone.replace(/\D/g, '')}`}
                  >
                    <Icon name="Phone" size={20} className="mr-2" />
                    {contacts[1].phone}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Wind" size={28} />
                <h3 className="text-xl font-bold">Комфорт</h3>
              </div>
              <p className="text-sm opacity-80">
                Профессиональные решения для климат-контроля вашего бизнеса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <div className="space-y-2 text-sm opacity-80">
                <button onClick={() => setActiveSection('dashboard')} className="block hover:opacity-100">
                  Панель управления
                </button>
                <button onClick={() => setActiveSection('catalog')} className="block hover:opacity-100">
                  Каталог
                </button>
                <button onClick={() => setActiveSection('prices')} className="block hover:opacity-100">
                  Цены
                </button>
                <button onClick={() => setActiveSection('contacts')} className="block hover:opacity-100">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm opacity-80">
                {contacts.map((contact, idx) => (
                  <div key={idx}>
                    <p className="opacity-60">{contact.label}</p>
                    <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="hover:opacity-100">
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
            <p>© 2024 Комфорт - Умный климат. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;