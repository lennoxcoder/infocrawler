

let len = 60;
let number_items = len/3; 
let element_index = Math.floor(Math.random() * (number_items+1));
let start_index = element_index*3-3;
let max_index = len-1-14;

let a='';

for (let i = 0; i < 59; i=i+3) {
    a = '';
    if (i===45) a='<--';
    console.log(i,i+1, i+2, a);        
}

if (start_index>=max_index+1) {
    start_index=max_index;
    console.log('start_index', start_index);
} else {
    console.log('element_index', element_index);
    console.log('start_index', start_index);

}

