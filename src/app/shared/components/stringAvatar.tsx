import Avatar from '@mui/material/Avatar';

function stringToBackgroundColor(string: string) {
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

function getLuminance(color: string) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    const a = [r, g, b].map((v) => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getTextColor(backgroundColor: string) {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export default function StringAvatar({name, size}: { name: string, size: number }) {
    name = name.toUpperCase();
    return (
        <Avatar sx={{
            height: `${size}px`,
            width: `${size}px`,
            fontSize: `${size / 2.5}px`,
            background: stringToBackgroundColor(name),
            color: getTextColor(stringToBackgroundColor(name))
        }}>
            {`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
        </Avatar>
    );
}
