export default function splitTerms (termsString) {
    return termsString?.split(',').map(term => term.trim()) || []
}