import { Link } from 'react-router-dom';
import '../../../styles/buttons.css';

const AddTeacherBtn = () => {
    return (
        <Link to="add" className="btn btn-add-teacher">
            <i className="fas fa-plus-circle"></i>
            Додати викладача
        </Link>
    );
}

export default AddTeacherBtn;