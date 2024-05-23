import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export default function StringAvatar({name, size}: { name: string, size: number }) {
    name = name.toUpperCase();
    return (
        <Avatar sx={{height: `${size}px`, width: `${size}px`, fontSize: `${size / 2}px` , background: stringToColor(name)}}>
            {`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
        </Avatar>
    );
}
