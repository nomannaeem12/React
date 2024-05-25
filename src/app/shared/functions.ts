import moment from "moment/moment";

export function shortDate(value: Date): string {
    return moment(value).format('h:mm a, M/d/yy');
}

export function containsEmoji(text: string): boolean {
    const emojiPattern = /^(?!\d+$)(\p{Emoji_Presentation}|\p{Emoji}[\uFE0F\u200D]?)+$/u;
    return emojiPattern.test(text);
}
