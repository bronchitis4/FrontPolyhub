import './user-info-block.css'
import ProfileService from '../../../services/profileService'
import { useEffect, useState } from 'react';

const UserInfoBlock = ({id, postCreateDate}) => {
    const [profileData, setProfileData] = useState({});
    const profileService = new ProfileService();
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await profileService.getProfileById(id);
                console.log(response.data);
                setProfileData(response.data);
            }catch(error){
                return error;
            }
        }
        
        fetchProfile();
    },[])
    
    
    return(
        <div className="profile-container">
            <div className="profile-image"></div>
            <div className='profile-wrapper'>
                <div className="profile-name">{profileData.nickname}</div>
                <div className="post-date"> { postCreateDate ? postCreateDate.split('T')[0] : null}</div>
            </div>
        </div>
    )
}

export default UserInfoBlock;