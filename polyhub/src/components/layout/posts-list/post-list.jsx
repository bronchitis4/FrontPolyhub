import './post-list.css';
import PostListItem from '../../ui/post-list-item/post-list-item.jsx';
import PostService from '../../../services/postService.js';
import { useEffect, useState, useRef } from 'react';
import { FiCalendar, FiArrowUp } from 'react-icons/fi';

const PostList = ({ category_id }) => {
    const postService = new PostService();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' - найновіші, 'asc' - найстаріші
    const postsListRef = useRef(null);

    const sortPosts = (postsToSort) => {
        return [...postsToSort].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        setSortOrder(newOrder);
        setPosts(prevPosts => sortPosts(prevPosts));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Додатково прокручуємо до верху контейнера постів
        if (postsListRef.current) {
            postsListRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useEffect(() => {
        setPosts([]); // Очищаємо пости при зміні категорії
        
        const fetchAllPosts = async () => {
            try {
                setLoading(true);
                const response = await postService.getAllPosts(1000, 0, category_id); // Отримуємо всі пости одразу

                if (response) {
                    setPosts(sortPosts(response.data));
                } else {
                    setError('Постів не знайдено');
                    setPosts([]);
                }
            } catch (error) {
                setError('Не вдалося завантажити пости. Спробуйте пізніше.');
                setPosts([]);
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (category_id) {
            fetchAllPosts();
        }
    }, [category_id]);

    return (
        <>
            <div className="posts-list-wrapper" ref={postsListRef}>
                <div className="posts-list-header">
                    <button 
                        className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`} 
                        onClick={toggleSortOrder}
                        title={sortOrder === 'desc' ? 'Найновіші спочатку' : 'Найстаріші спочатку'}
                    >
                        <FiCalendar />
                        <span>{sortOrder === 'desc' ? 'Найновіші' : 'Найстаріші'}</span>
                    </button>
                </div>

                {loading && <div className="loading">Завантаження...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && posts.length === 0 && (
                    <div className="no-posts">Постів не знайдено</div>
                )}
                {!loading && !error && posts.length > 0 && (
                    <div className="posts-list">
                        {posts.map((post) => (
                            <PostListItem
                                key={post.id}
                                id={post.id}
                                header={post.title}
                                urlImage={post.imageurl}
                                content={post.content}
                                date={post.created_at}
                                user_id={post.user_id}
                            />
                        ))}
                    </div>
                )}
            </div>
            <button 
                className="scroll-top-button"
                onClick={scrollToTop}
                title="Прокрутити вгору"
            >
                <FiArrowUp />
            </button>
        </>
    );
};

export default PostList;
