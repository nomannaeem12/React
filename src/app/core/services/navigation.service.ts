import {useNavigate} from "react-router-dom";

export function navigationService() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home');
    }

    const navigateToUserProfile = (userId: number) => {
        navigate(`/home/users/${userId}`);
    }

    return {navigateToHome, navigateToUserProfile};
}
