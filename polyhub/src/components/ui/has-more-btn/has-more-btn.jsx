import './has-more-btn.css'

const HasMoreBtn = ({children, action}) => {
    return (
            <button className='has-more-btn' onClick={action}>
                {children}
            </button>
    )
}

export default HasMoreBtn;