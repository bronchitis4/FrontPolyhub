// import {NavLink} from "react-router-dom";
// import { useEffect, useState } from "react";
// import categoryImg from '../../../assets/images/category.png'
// import teacherImg from '../../../assets/images/teacher.png'
// import blogImg from '../../../assets/images/blog.png'
// import InstitutesService from "../../../services/institutesService";
// import './side-bar.css';

// const Sidebar = ({onSetCategory}) => {
//     const institutesService = new InstitutesService();
//     const [institutes, setInstitute] = useState([]);
//     const [error, setError] = useState(false);
//     const menuItems = [
//         {key: 1, title: "Категорії", image: categoryImg , link: 'сategories', subtopics: [{title: "Викладачі", image: teacherImg, categoryId: 1}, {title: "Блог", image: blogImg, categoryId: 2}]},
//         {key: 2, title: "Викладачі", image: categoryImg, link: 'resources', subtopics: [{title: "subtopicB", categoryName: "categoryB2"}, {title: "subtopicB", categoryName: "categoryB2"}]},
//     ];

//     useEffect(() => {
//         fetchInstitutes = async() => {
//             try{
//                 const responseData = await institutesService.getAllInstitutes();
//                 setInstitute(responseData);
//             }catch(error) {
//                 setError(true)
//             }
//         }

//         fetchInstitutes();
//     })

//     return (
//         <div className="sidenav">
//            {menuItems.map(item => {
//                 return <>
//                         <DropdownItem key={item.key} title={item.title} image={item.image} link={item.link}  subtopics={item.subtopics} onSetCategory={onSetCategory}/>
//                        </>
//            })}
//         </div>
//     );
// }


// const DropdownItem = ({title, image, link, subtopics, onSetCategory}) => {
    
//     const [isOpen, setOpen] = useState(false);

//     const toggleOpen = () => {
//         setOpen(state => !state);
//     }


//     return(
//         <>
//             <button className="dropdown-btn" onClick={toggleOpen}>
//                 <img src={image} width={20} height={20}/>
//                 <span>{title}</span>
//                 <i className="fa fa-caret-down" />
//             </button>
//             <div className="dropdown-container" style={{display: isOpen ? 'block': 'none'}}>
//                 {subtopics.map(item => {
//                     return <button onClick={() => onSetCategory(item.categoryName)}>
//                         <img src={item.image}  width={25} height={25}/>
//                         {item.title} 
//                     </button>
//                 })}
//             </div>
//         </>
//     );
// }
// export default Sidebar;



import {Link, NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import categoryImg from '../../../assets/images/category.png';
import teacherImg from '../../../assets/images/teacher.png';
import blogImg from '../../../assets/images/blog.png';
import InstitutesService from "../../../services/institutesService";
import AuthBtnLink from "../auth-btn-link/auth-btn-link";
import './side-bar.css';

const Sidebar = ({ OnSetCategoryId, OnSetInstituteId }) => {
    const institutesService = new InstitutesService();
    const [institutes, setInstitutes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const responseData = await institutesService.getAllInstitutes();
                setInstitutes(responseData.data);
            } catch (error) {
                console.error("Error fetching institutes:", error);
                setError(true);
            }
        };

        fetchInstitutes();
    }, []); 

    const menuItems = [
        {
            key: 1,
            title: "Викладачі",
            image: categoryImg,
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

    return (
        <div className="sidenav">
            {menuItems.map(item => (
                <DropdownItem
                    key={item.key}
                    title={item.title}
                    image={item.image}
                    link={item.link}
                    subtopics={item.subtopics}
                    OnSetCategoryId={item.link == "teachers" ? OnSetInstituteId : OnSetCategoryId}
                />
            ))}
        </div>
    );
};

const DropdownItem = ({ title, image, link, subtopics, OnSetCategoryId }) => {
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <button className="dropdown-btn" onClick={toggleOpen}>
                <img src={image} width={20} height={20} alt="icon" />
                <span><Link to={`/${link}`} style={{padding: '0'}}>{title}</Link></span>
                <i className="fa fa-caret-down" />
            </button>
            <div className="dropdown-container" style={{ display: isOpen ? 'block' : 'none' }}>
                {subtopics.map((item, index) => (
                    <Link to={`/${link}`}>
                    <button key={index} onClick={() => OnSetCategoryId(item.categoryName)}>
                        {item.image && <img src={item.image} width={25} height={25} alt="subicon" />}
                        {item.title}
                    </button>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
