import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FiUsers, FiBell, FiMessageCircle, FiBook } from 'react-icons/fi';

const LandingPage = () => {
    const categories = [
        {
            title: "Викладачі",
            description: "Відгуки та рейтинги викладачів від студентів",
            link: "/teachers",
            icon: <FiUsers className="category-icon" />
        },
        {
            title: "Оголошення",
            description: "Актуальні оголошення для студентів та гуртожитків",
            link: "/posts",
            icon: <FiBell className="category-icon" />
        },
        {
            title: "Спільнота",
            description: "Обговорення та корисна інформація для студентів",
            link: "/posts",
            icon: <FiMessageCircle className="category-icon" />
        }
    ];

    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Ласкаво просимо до PolyHub</h1>
                    <p className="subtitle">Ваш універсальний помічник у студентському житті</p>
                </div>
            </section>

            <section className="quick-access">
                <h2>Швидкий доступ</h2>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <Link to={category.link} key={index} className="category-card">
                            {category.icon}
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="about-project">
                <h2>Про проект</h2>
                <div className="about-content">
                    <p>
                        PolyHub - це сучасна платформа для студентів Національного університету "Львівська політехніка",
                        створена для покращення студентського досвіду та комунікації.
                    </p>
                    <div className="features">
                        <div className="feature">
                            <h3>🏢 Зручний доступ</h3>
                            <p>Доступ до всіх функцій через університетську пошту @lpnu.ua</p>
                        </div>
                        <div className="feature">
                            <h3>👨‍🏫 Відгуки про викладачів</h3>
                            <p>Чесні та анонімні відгуки про викладачів від студентів</p>
                        </div>
                        <div className="feature">
                            <h3>📢 Актуальні оголошення</h3>
                            <p>Швидкий доступ до важливої інформації та оголошень</p>
                        </div>
                        <div className="feature">
                            <h3>👥 Активна спільнота</h3>
                            <p>Платформа для спілкування та обміну досвідом між студентами</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage; 