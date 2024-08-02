
export function normaliseName(input:String) {
    return input.replace(/[\s_-]+/g, '').toLowerCase();
}