function createHastable(initialSize=10){
    let hashmap=new Array(initialSize).fill(null);

    function hash(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    function set(key,value){
        const index=getIndex(key);
        if(hashmap[index]!==null){
            const list=hashmap[index];
            let dupe=false;
            for(let i=0;i<list.length;i++){
                if(list[i].key==key){
                    hashmap[index].splice(i,1,{key,value});
                    dupe=true;
                    break;
                }
            }
            if(dupe===false){
                hashmap[index].push({key,value});
            }
        }
        else{
            const list=[];
            list.push({key,value});
            hashmap.splice(index,1,list);
        }
        console.log(hashmap);

    }
    function getIndex(key){
        const hashCode=hash(key);
        return hashCode%initialSize;
        
    }
    function get(key){
        const index=getIndex(key);
        const list=hashmap[index];
        if(list!==null && list.length>0){
            if(list.length>1){
                for(let i=0;i<list.length;i++){
                    if(list[i].key===key){
                        return list[i].value;
                    }
                }
                return null;
            }
            else{
                if(list[0].key===key){
                    return list[0];
                }
                else{
                    return null;
                }
            }
        }
        else{
            return null;
        }
    }
    function has(key){
        if(get(key)!==null){
            return true;
        }
        else{
            return false;
        }
    }
    function remove(key){
        if(has(key))
        {
            const index=getIndex(key);
            const list=hashmap[index];
            for(let i=0;i<list.length;i++){
                if(list[i].key===key){
                    hashmap[index].splice(i,1);
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
    function length(){
        let count=0;
        hashmap.forEach(element=>{
            if(element!==null){
                count+=element.length;
            }
        })
        return count;
    }
    function clear(){
        hashmap.fill(null);
    }
    function returnSet(value=null){
        const array=[];
        hashmap.forEach(element=>{
            if(element!==null){
                element.forEach(obj=>{
                    if(value!==null)
                        array.push(obj[value]);
                    else
                        array.push(obj);
                })
            }
        })
        return array;
    }
    function keys(){
        return returnSet("key");
    }
    function values(){
        return returnSet("value");
    }
    function entries(){
        return returnSet();
    }
    return{
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    }
}

