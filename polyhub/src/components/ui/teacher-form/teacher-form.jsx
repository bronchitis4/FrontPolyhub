import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherService from '../../../services/teachersService.js';
import './teacher-form.css';

function AddTeacherForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [instituteId, setInstituteId] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const teacherService = new TeacherService();

  const institutes = [
    { id: "2", name: "ІКНІ" },
    { id: "3", name: "ІКТА" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Повне ім'я обов'язкове";
    }
    
    if (!bio.trim()) {
      newErrors.bio = "Біографія обов'язкова";
    }
    
    if (!instituteId) {
      newErrors.instituteId = "Будь ласка, виберіть інститут";
    }

    if (!email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Будь ласка, введіть коректний email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('full_name', fullName);
    formData.append('bio', bio);
    formData.append('institute_id', instituteId);
    formData.append('email', email);

    try {
      const response = await teacherService.createTeacher(formData);
      if (response && response.data) {
        navigate('/teachers');
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      setErrors({ submit: 'Помилка при створенні викладача. Спробуйте ще раз.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-teacher-wrapper">
      <h1>Додавання викладача:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Повне ім'я"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors({ ...errors, fullName: '' });
              }
            }}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <textarea
            placeholder="Біографія"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (errors.bio) {
                setErrors({ ...errors, bio: '' });
              }
            }}
            className={errors.bio ? 'error' : ''}
          />
          {errors.bio && <span className="error-message">{errors.bio}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="instituteId">Інститут</label>
          <select
            id="instituteId"
            value={instituteId}
            onChange={(e) => {
              setInstituteId(e.target.value);
              if (errors.instituteId) {
                setErrors({ ...errors, instituteId: '' });
              }
            }}
            className={errors.instituteId ? 'error' : ''}
          >
            <option value="">Виберіть інститут</option>
            {institutes.map(institute => (
              <option key={institute.id} value={institute.id}>
                {institute.name}
              </option>
            ))}
          </select>
          {errors.instituteId && <span className="error-message">{errors.instituteId}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: '' });
              }
            }}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input 
            type="file" 
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Додавання...' : 'Додати викладача'}
        </button>
      </form>
    </div>
  );
}

export default AddTeacherForm;