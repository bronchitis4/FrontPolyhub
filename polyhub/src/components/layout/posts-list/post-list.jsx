import './post-list.css';
import PostListItem from '../../ui/post-list-item/post-list-item.jsx';
import PostService from '../../../services/postService.js';
import { useEffect, useState } from 'react';
import HasMoreBtn from '../../ui/has-more-btn/has-more-btn.jsx';

const PostList = ({ category_id }) => {
    const postService = new PostService();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 2;

    const handleFetchPosts = async () => {
        if (!hasMore)
            return;

        try {
            const response = await postService.getAllPosts(LIMIT, offset, category_id);

            if (response.data.length < LIMIT)
                setHasMore(false);

            if (!response.data.length)
                throw Error("Пости закінчились");

            setOffset(state => state + LIMIT);
            setPosts(state => [...state, ...response.data]);
        } catch (error) {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setHasMore(true);
        setOffset(0);
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await postService.getAllPosts(LIMIT, 0, category_id);

                if (response.data.length < LIMIT)
                    setHasMore(false);

                if (response) {
                    setPosts(response.data);
                    setOffset(state => state + LIMIT);
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
            fetchPosts();
        }
    }, [category_id]);

    return (
        <div className="posts-list-wrapper">
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
            {hasMore && !loading ? (
                <HasMoreBtn action={handleFetchPosts}>Прогрузити далі</HasMoreBtn>
            ) : null}
        </div>
    );
};

export default PostList;
