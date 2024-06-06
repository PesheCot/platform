import { marked } from 'marked';

export function floatToString(float) {
    float = parseFloat(float);
    return parseFloat(float.toFixed(2)).toString();
}

export function date_format(date) {
    if (date) {
        return date.getDate().toString().padStart(2,0) + '.' + (date.getMonth() + 1).toString().padStart(2,0);
    }
}
    
export function toHtml(md) {
    if (md) {
        return marked.parse(md);
    }

    return '';
}

export default {
    date_format,
    floatToString,
    toHtml,
}