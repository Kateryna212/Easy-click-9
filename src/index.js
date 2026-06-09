// ==========================================
// 1. СЕРВІС ДАНИХ (WebP зображення з якісними альтернативними описами alt)
// ==========================================
function fetchProducts() {
    return [
        { 
            id: 1, 
            name: "Ноутбук Pro", 
            price: 35000, 
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80",
            altText: "Сучасний відкритий ноутбук сріблястого кольору на робочому столі"
        },
        { 
            id: 2, 
            name: "Смартфон X", 
            price: 15000, 
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
            altText: "Тонкий сенсорний смартфон із дзеркальним екраном на світлому фоні"
        },
        { 
            id: 3, 
            name: "Бездротові Навушники", 
            price: 2500, 
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
            altText: "Великі бездротові накладні аудіо-навушники чорного кольору"
        },
        { 
            id: 4, 
            name: "Смарт-годинник", 
            price: 4200, 
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
            altText: "Розумний годинник із круглим циферблатом та силіконовим ремінцем"
        }
    ];
}

// ==========================================
// 2. КОМПОНЕНТИ ВІДОБРАЖЕННЯ (UI з оптимізацією Accessibility)
// ==========================================
function Header({ title }) {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.setAttribute('role', 'banner'); // ARIA-роль головної шапки сайту
    header.innerHTML = `<h1>${title}</h1>`;
    return header;
}

function Navigation({ links }) {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.setAttribute('aria-label', 'Головне меню сайту Easy-click'); // Опис навігації для Screen Reader

    const ul = document.createElement('ul');
    links.forEach(link => {
        const li = document.createElement('li');
        // Додано повноцінні посилання з атрибутом href для повноцінної навігації клавіатурою (Tab)
        li.innerHTML = `<a href="#${link.toLowerCase()}" aria-label="Перейти до розділу ${link}">${link}</a>`;
        ul.appendChild(li);
    });
    nav.appendChild(ul);
    return nav;
}

// ОПТИМІЗАЦІЯ ACCESSIBILITY КАРТКИ: додано чіткий alt, aria-label для кнопок, семантичний загіловок h2
function Card({ title, price, imageUrl, altText }) {
    const card = document.createElement('article'); // Семантичний тег статті для окремого товару
    card.className = 'product-card';
    card.setAttribute('aria-label', `Товар: ${title}`);

    card.innerHTML = `
        <img class="card-img" 
             src="${imageUrl}" 
             alt="${altText}" 
             loading="lazy" 
             width="210" 
             height="180">
        <h2 class="card-title">${title}</h2> <p class="card-price" aria-label="Ціна: ${price} гривень">${price} грн</p>
        <button class="card-btn" aria-label="Купити товар ${title} в один клік">Купити в один клік</button>
    `;
    card.querySelector('.card-btn').addEventListener('click', () => {
        alert(`Дякуємо! Товар "${title}" успішно оформлено через Easy-click!`);
    });
    return card;
}

function Footer({ year, author }) {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('role', 'contentinfo'); // ARIA-роль для підвалу сторінки
    footer.innerHTML = `<p>&copy; ${year} | ${author} | Усі права захищено</p>`;
    return footer;
}

// ==========================================
// 3. КОНТЕЙНЕР СТОРІНКИ
// ==========================================
function ProductPage() {
    const products = fetchProducts(); 
    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';

    pageContainer.appendChild(Header({ title: "Easy-click | Доступний Маркетплейс" }));
    pageContainer.appendChild(Navigation({ links: ['Головна', 'Каталог', 'Про нас', 'Контакти'] }));

    const cardListContainer = document.createElement('main');
    cardListContainer.className = 'card-list';
    cardListContainer.setAttribute('role', 'main'); // Визначення головного контенту для асистентів

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const cardElement = Card({ 
            title: product.name, 
            price: product.price, 
            imageUrl: product.image,
            altText: product.altText
        });
        fragment.appendChild(cardElement);
    });

    cardListContainer.appendChild(fragment);
    pageContainer.appendChild(cardListContainer);
    pageContainer.appendChild(Footer({ year: 2026, author: "Команда інклюзивності Easy-click" }));

    return pageContainer;
}

// ==========================================
// 4. ЗАПУСК
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        rootElement.appendChild(ProductPage());
    }
});
