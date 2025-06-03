import React, { useState } from 'react';
import { useEffect } from 'react';
import TeacherService from '../../../services/teachersService.js'; // Замінено PostService на TeacherService
import './teacher-form.css'; // Змінено назву стилів

function AddTeacherForm() {
  const [file, setFile] = useState(null); // Для img_url
  const [fullName, setFullName] = useState(''); // Замінено title на full_name
  const [bio, setBio] = useState(''); // Замінено content на bio
  const [instituteId, setInstituteId] = useState(0); // Для institute_id
  const [email, setEmail] = useState(''); // Додано email
  const teacherService = new TeacherService(); // Новий сервіс для вчителів

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Додано, щоб уникнути перезавантаження сторінки

    const formData = new FormData();
    formData.append('file', file); // Для img_url
    formData.append('full_name', fullName);
    formData.append('bio', bio);
    formData.append('institute_id', instituteId);
    formData.append('email', email);

    try {
      const response = await teacherService.createTeacher(formData); // Виклик методу для створення вчителя
      console.log(response);
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
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
        />
        <textarea
          placeholder="Біографія"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label htmlFor="instituteId">ID Інституту</label>
        <select
          id="instituteId"
          value={instituteId}
          onChange={(e) => setInstituteId(Number(e.target.value))}
        >
          <option value="1">ІКНІ</option>
          <option value="2">ІКТА</option>
          <option value="3">ІБІС</option>
        </select>
        <input
          type="email"
          placeholder="Електронна пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Додати вчителя</button> {/* Змінено текст кнопки */}
      </form>
    </div>
  );
}

export default AddTeacherForm;