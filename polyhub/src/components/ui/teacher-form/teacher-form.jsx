import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherService from '../../../services/teachersService.js'; // Замінено PostService на TeacherService
import './teacher-form.css'; // Змінено назву стилів

function AddTeacherForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // Для img_url
  const [fullName, setFullName] = useState(''); // Замінено title на full_name
  const [bio, setBio] = useState(''); // Замінено content на bio
  const [instituteId, setInstituteId] = useState(''); // Змінюємо на пустий рядок для правильної валідації
  const [email, setEmail] = useState(''); // Додано email
  const teacherService = new TeacherService(); // Новий сервіс для вчителів

  // Масив інститутів з правильними ID
  const institutes = [
    { id: "2", name: "ІКНІ" },
    { id: "3", name: "ІКТА" }
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Додано, щоб уникнути перезавантаження сторінки

    if (!fullName || !bio || !email || !instituteId) {
      alert('Будь ласка, заповніть всі поля');
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
      // Виводимо дані, які відправляємо
      console.log('Sending teacher data:', {
        full_name: fullName,
        bio,
        institute_id: instituteId,
        email
      });

      const response = await teacherService.createTeacher(formData);
      console.log('Server response:', response); // Додаємо лог відповіді сервера
      if (response && response.data) {
        // Перенаправляємо на сторінку викладачів з вибраним інститутом
        navigate('/teachers');
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('Помилка при створенні викладача. Спробуйте ще раз.');
    }
  };

  const handleInstituteChange = (e) => {
    const selectedId = e.target.value;
    console.log('Selected institute ID:', selectedId);
    setInstituteId(selectedId);
  };

  return (
    <div className="form-teacher-wrapper">
      <h1>Додавання викладача:</h1>
      <form onSubmit={handleSubmit}> {/* Додано onSubmit до форми */}
        <input
          type="text"
          placeholder="Повне ім'я"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <textarea
          placeholder="Біографія"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <label htmlFor="instituteId">Інститут</label>
        <select
          id="instituteId"
          value={instituteId}
          onChange={handleInstituteChange}
          required
        >
          <option value="">Виберіть інститут</option>
          {institutes.map(institute => (
            <option key={institute.id} value={institute.id}>
              {institute.name}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="Електронна пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="file" 
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Додати викладача</button> {/* Змінено текст кнопки */}
      </form>
    </div>
  );
}

export default AddTeacherForm;