import moment from "moment/moment";

export function shortDate(value: Date): string {
    return moment(value).format('h:mm a, M/d/yy');
}
