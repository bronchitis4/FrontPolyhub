import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../../../services/postService';
import './add-post.css'

function AddPostForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(0);
  const [userId, setUserId] = useState(78);
  const postService = new PostService();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category);
    try {
      const response = await postService.createPost(formData);
      console.log(response);
      if (response && response.data) {
        // Перенаправляємо на сторінку створеного поста
        navigate(`/post/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  };

  return (
    <div className='form-post-wrapper'>
    <h1>Створення поста:</h1>
    <form>
      <input type="text" placeholder="Назва" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Контент" value={content} onChange={(e) => setContent(e.target.value)} />
        <label htmlFor="category">Категорія</label>
        <select id="category" value={category} onChange={(e) => setCategory(Number(e.target.value))}>
          <option value={0} disabled>Виберіть Категорію</option>
          <option value="2">Блог</option>
          <option value="3">Оголошення</option>
        </select>
      <input type="file" onChange={handleFileChange} />
      <button onClick={(e) => handleSubmit(e)}>Створити пост</button>
    </form>
    </div>
  );
}

export default AddPostForm;
