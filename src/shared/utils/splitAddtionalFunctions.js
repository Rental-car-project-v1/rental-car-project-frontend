export default function splitAddtionalFunctions (funcString) {
    return funcString?.split(',').map(func => func.trim()) || []
}