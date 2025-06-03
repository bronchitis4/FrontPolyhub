import '../posts-list/post-list.jsx'; // якщо є свій css для вчителів — заміни
import TeacherService from '../../../services/teachersService.js';
import { useEffect, useState } from 'react';
import TeacherListItem from '../../ui/teacher-list-item/teacher-list-item.jsx';
import HasMoreBtn from '../../ui/has-more-btn/has-more-btn.jsx';
import debounce from 'lodash.debounce';
import SearchInput from '../../ui/search-input/search-input.jsx';

const TeacherList = ({ institute_id, searchValue, onSearchChange }) => {
    const teacherService = new TeacherService();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 2;
    const search = searchValue || "";
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handldFetchTeachers = async () => {
        if(!hasMore)
            return;

        try {
            const response = await teacherService.getAllTeachers(LIMIT, offset, institute_id);

            if(response.data.length < LIMIT)
                setHasMore(false);
            
            if(!response.data.length)
                throw Error("Викладачі все");
            
            setOffset(state => state + LIMIT)
            setTeachers(state => [...state, ...response.data])
        } catch (error) {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = debounce(async (value) => {
        if (!value) {
            setSearchResults([]);
            setSearchError(null);
            setSearchLoading(false);
            return;
        }
        setSearchLoading(true);
        setSearchError(null);
        try {
            const response = await teacherService.searhTeachersByFullName(value);
            setSearchResults(response.data || []);
        } catch (error) {
            setSearchError('Не вдалося знайти викладачів.');
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    }, 400);

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    useEffect(() => {
        setHasMore(true);
        setOffset(0);
        const fetchTeachers = async () => {
            try {
                setLoading(true);
                const response = await teacherService.getAllTeachers(LIMIT, 0, institute_id);
                
                if(response.data.length < LIMIT)
                    setHasMore(false);

                if (response) {
                    setTeachers(response.data);
                    setOffset(state => state + LIMIT);
                } else {
                    console.log("Викладачів не знайдено")
                    setError('Викладачів не знайдено');
                    setTeachers([]);
                }
            } catch (error) {
                setError('Не вдалося завантажити викладачів. Спробуйте пізніше.');
                setTeachers([]);
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        if (institute_id) {
            fetchTeachers();
        }
    }, [institute_id]);

    return (
        <div className="posts-list-wrapper">
            {search && (searchLoading ? <div className="loading">Пошук...</div> : null)}
            {search && searchError && <div className="error">{searchError}</div>}
            {search && !searchLoading && !searchError && searchResults.length === 0 && (
                <div className="no-posts">Викладачів не знайдено</div>
            )}
            {search && !searchLoading && !searchError && searchResults.length > 0 && (
                <div className="posts-list">
                    {searchResults.map((teacher) => (
                        <TeacherListItem
                           key={teacher.id}
                           id={teacher.id}
                           fullName={teacher.full_name}
                           imgUrl={teacher.image_url}
                           institute={teacher.institute ? teacher.institute.name : ''}
                           email={teacher.email}
                           avarageRating={3}
                           bio={teacher.bio}
                        />
                    ))}
                </div>
            )}
            {!search && (
                <>
                    {loading && <div className="loading">Завантаження...</div>}
                    {error && <div className="error">{error}</div>}
                    {!loading && !error && teachers.length === 0 && (
                        <div className="no-posts">Викладачів не знайдено</div>
                    )}
                    {!loading && !error && teachers.length > 0 && (
                        <div className="posts-list">
                            {teachers.map((teacher) => (
                                <TeacherListItem
                                   key={teacher.id}
                                   id={teacher.id}
                                   fullName={teacher.full_name}
                                   imgUrl={teacher.image_url}
                                   institute={teacher.institute ? teacher.institute.name : ''}
                                   email={teacher.email}
                                   avarageRating={3}
                                   bio={teacher.bio}
                                />
                            ))}
                        </div>
                    )}
                    {hasMore && !loading ? 
                        <HasMoreBtn action={handldFetchTeachers}>Прогрузити далі</HasMoreBtn>
                    : null}
                </>
            )}
        </div>
    );
};
//fullName, imgUrl,  bio, institute, email, avarageRating
export default TeacherList;
