export function debounce(callback = () => {}, timeout = 300){
    let timer = null;

    return (...args) => {
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout( callback.apply(this,args), timeout );
    }
}