
const getArgs = (args) => {
    const res = {}
    const [executer, file, ...rest] = args
    rest.forEach((elem, index, arr) => {
        if(elem[0] === '-'){
            if(index === arr.length - 1){
                res[elem.substring(1)] = true
            }else if(arr[index + 1][0] !== '-'){
                res[elem.substring(1)] = arr[index + 1]
            }else {
                res[elem.substring(1)] = true
            }
        }
    });

    return res
}

export {
    getArgs
}