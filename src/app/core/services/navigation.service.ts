import {useNavigate} from "react-router-dom";

export function navigationService() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const homePage = () => {
        navigate('/home');
    }

    const userProfile = (userId: number) => {
        navigate(`/home/users/${userId}`);
    }

    const messagePage = () => {
        navigate(`/home/messages`);
    }

    const chatterbox = (recipientId: number) => {
        navigate(`/home/messages/chatterbox/${recipientId}`);
    }

    const signInPage = () => {
        navigate(`/`);
    }

    return {
        homePage,
        userProfile,
        messagePage,
        chatterbox,
        signInPage
    };
}
