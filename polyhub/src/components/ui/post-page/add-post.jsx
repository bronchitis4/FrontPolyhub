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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const postService = new PostService();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Назва поста обов'язкова";
    }
    
    if (!content.trim()) {
      newErrors.content = "Контент поста обов'язковий";
    }
    
    if (category === 0) {
      newErrors.category = "Будь ласка, виберіть категорію";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category);

    try {
      const response = await postService.createPost(formData);
      console.log(response);
      if (response && response.data) {
        navigate(`/post/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ submit: 'Помилка при створенні поста. Спробуйте ще раз.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='form-post-wrapper'>
      <h1>Створення поста:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Назва"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors({ ...errors, title: '' });
              }
            }}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <textarea
            placeholder="Контент"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) {
                setErrors({ ...errors, content: '' });
              }
            }}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Категорія</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(Number(e.target.value));
              if (errors.category) {
                setErrors({ ...errors, category: '' });
              }
            }}
            className={errors.category ? 'error' : ''}
          >
            <option value={0} disabled>Виберіть Категорію</option>
            <option value="2">Блог</option>
            <option value="3">Оголошення</option>
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <input type="file" onChange={handleFileChange} />
        </div>

        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Створення...' : 'Створити пост'}
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;
