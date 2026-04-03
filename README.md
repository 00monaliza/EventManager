# Event-Manager
# Запуск проекта 
```bash
  git clone <repo-url>
  cd event-manager
  npm install
  npm run dev
```

# Архитектурные решения

# Server vs Client Components

  придерживался принципа: «Server Component — пока не нужна интерактивность». страницы app/events/page.tsx и app/layout.tsx — серверные, они не несут никакой клиентской логики. все интерактивные части (фильтры, форма, карточки) — Client Components с пометкой "use client". это позволяет Next.js правильно разбивать бандл и не тащить лишний JS на клиент

# Управление состоянием — Zustand

  выбрал Zustand вместо useState/useReducer на уровне компонентов, потому что состояние (список мероприятий, фильтры, статус загрузки) разделяется между несколькими компонентами в разных частях дерева. Zustand даёт минимальный boilerplate и предсказуемый поток данных. стор инициализируется один раз через StoreInitializer внутри useEffect —
  это обязательно для SSR-совместимости, чтобы localStorage не вызывался на сервере

# Хранение данных — localStorage

  все изменения (создание, редактирование, удаление, избранное) немедленно сохраняются в localStorage через функции loadEvents / saveEvents из lib/storage.ts. при первом запуске, если localStorage пуст, подгружаются mock-данные

# Стили — CSS Modules

  все стили написаны через CSS Modules. глобальные CSS-переменные (--color-primary,
  --radius-md, --shadow-sm и т.д.) вынесены в styles/variables.css это единая дизайн система без лишних зависимостей

# Даты — date-fns

  все операции с датами идут через date-fns с русской локалью. никакого ручного парсинга строк, типизированные функции formatDate, isDateInPast из lib/utils.ts


# Структура компонентов

  app/
    layout.tsx          — серверный, подключает шрифты, Header, Tabs
    events/page.tsx     — серверный, рендерит фильтры + список
    favorites/page.tsx  — избранные мероприятия без фильтров
    page.tsx            — redirect на /events

  components/
    ui/
      Button.tsx        — 4 варианта: primary, secondary, danger, ghost
      Badge.tsx         — цветовые метки категорий и статусов
      Modal.tsx         — портал на document.body, ESC + клик по фону
      Toast.tsx         — уведомления с авто-закрытием через 3 сек

    events/
      EventCard.tsx     — карточка с инлайн-SVG звездой для избранного
      EventList.tsx     — CSS Grid, пустые состояния
      EventForm.tsx     — единая форма для создания и редактирования
      EventFilters.tsx  — поиск с debounce 300ms, фильтры, сортировка
      DeleteConfirm.tsx — модал с подтверждением удаления
      EventSkeleton.tsx — CSS-анимация загрузки

    layout/
      Header.tsx        — кнопка добавления + экспорт JSON
      Tabs.tsx          — навигация с live-счётчиком избранных
      StoreInitializer.tsx — инициализация стора на клиенте


# Дополнительные функции:
  - Поиск по названию и описанию
  - Избранные мероприятия, отдельная вкладка со счётчиком
  - Экспорт текущего списка в JSON-файл
  - Toast-уведомления при создании, редактировании, удалении и экспорте
  - Скелетон-анимация при загрузке