import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './side-bar.css';
import categoryImg from '../../../assets/images/category.png';
import teacherImg from '../../../assets/images/teacher.png';
import blogImg from '../../../assets/images/blog.png';

const Sidebar = ({ OnSetCategoryId, OnSetInstituteId }) => {
    const location = useLocation();
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (key) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(key)) {
            newOpenItems.delete(key);
        } else {
            newOpenItems.add(key);
        }
        setOpenItems(newOpenItems);
    };

    const institutes = [
        { id: 2, name: "ІКНІ" },
        { id: 3, name: "ІКТА" },
    ];

    const menuItems = [
        {
            key: 1,
            title: "Викладачі",
            image: teacherImg,
            link: 'teachers',
            subtopics: institutes.map(inst => ({
                title: inst.name,
                categoryName: inst.id,
                image: categoryImg 
            }))
        },
        {
            key: 2,
            title: "Пости",
            image: categoryImg,
            link: 'posts',
            subtopics: [
                { title: "Оголошення", image: teacherImg, categoryName: 3 },
                { title: "Блог", image: blogImg, categoryName: 2 }
            ]
        }
    ];

    const handleSubtopicClick = (item, subtopic) => {
        if (item.link === "teachers") {
            OnSetInstituteId(subtopic.categoryName);
        } else {
            OnSetCategoryId(subtopic.categoryName);
        }
    };

    return (
        <div className="sidenav">
            {menuItems.map(item => (
                <div key={item.key} className={`dropdown-item ${openItems.has(item.key) ? 'open' : ''}`}>
                    <div className="dropdown-header" onClick={() => toggleItem(item.key)}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                    </div>
                    <div className={`dropdown-content ${openItems.has(item.key) ? 'open' : ''}`}>
                        {item.subtopics.map((subtopic, index) => (
                            <Link
                                key={index}
                                to={`/${item.link}`}
                                className="subtopic"
                                onClick={() => handleSubtopicClick(item, subtopic)}
                            >
                                <img src={subtopic.image} alt={subtopic.title} />
                                <span>{subtopic.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
