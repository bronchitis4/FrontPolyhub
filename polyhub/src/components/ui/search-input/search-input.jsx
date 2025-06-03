import './search-input.css';

const SearchInput = ({value, onChange}) => {
    return (
        <div className="search-input-container">
        <input
            type="text"
            placeholder="Пошук..."
            className="search-input"
            value={value}
            onChange={onChange}
        />
        </div>
    );
}

export default SearchInput;