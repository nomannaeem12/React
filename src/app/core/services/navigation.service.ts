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

    const navigateToMessagePage = () => {
        navigate(`/home/messages`);
    }

    const navigateToChatterbox = (recipientId: number) => {
        navigate(`/home/messages/chatterbox/${recipientId}`);
    }

    const navigateToSignInPage = () => {
        navigate(`/`);
    }

    return {
        navigateToHome,
        navigateToUserProfile,
        navigateToMessagePage,
        navigateToChatterbox,
        navigateToSignInPage
    };
}
