import { Link } from 'react-router-dom';
import './add-teacher-btn.css'

const AddTeacherBtn = () => {
    return <Link to="add" className='add-teacher-btn'>Створити пост</Link>;
}

export default AddTeacherBtn;