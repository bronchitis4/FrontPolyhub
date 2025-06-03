import { Link } from 'react-router-dom';
import './add-post-btn.css'

const AddPostBtn = () => {
    return <Link to="add" className='add-post-btn'>Створити пост</Link>;
}

export default AddPostBtn;