const number_of_bars = 100;

function merge(num_array, left, mid, right, util) {
    let i = left, j = mid + 1, k = left;
    let temp = [];
    while(i <= mid && j <= right){
        if(num_array[i] <= num_array[j]){
            temp.push(num_array[i]);
            util.push([i, j, k, num_array[i]]);
            i++;
        }else{
            temp.push(num_array[j]);
            util.push([i, j, k, num_array[j]]);
            j++;
        }
        k++;
    }
    while(i <= mid){
        temp.push(num_array[i]);
        util.push([i, i, k, num_array[i]]);
        k++;
        i++;
    }
    while(j <= right){
        temp.push(num_array[j]);
        util.push([j, j, k, num_array[j]]);
        k++;
        j++;
    }
    for(let x = 0, y = left; y <= right; y++, x++){
        num_array[y] = temp[x];
    }
    return num_array;
}
function merge_sort_util(num_array, left, right, util) {
    if(left < right){
        let mid = left + Math.floor((right - left)/2);
        num_array = merge_sort_util(num_array, left, mid, util);
        num_array = merge_sort_util(num_array, mid+1, right, util);
        num_array = merge(num_array, left, mid, right, util);
    }
    return num_array;
}
function merge_sort(num_array, util){
    return merge_sort_util(num_array, 0, num_array.length - 1, util);
}

function bubble_sort(num_array, util) {
    for(let i = 0; i < num_array.length; i++){
        let j = 0;
        for(; j < num_array.length-i-1; j++){
            if(num_array[j] > num_array[j+1]){
                
                let temp = num_array[j];
                num_array[j] = num_array[j+1];
                num_array[j+1] = temp;
                util.push([j, true, false]);
            }
            else util.push([j, false, false]);
        }
        util.push([j, false, true]);
    }
    return num_array;
}

function insertion_sort(num_array, util){
    for(let i = 0; i < num_array.length; i++){
        let j = i - 1;
        util.push([i, true, false])
        while(j >= 0 && num_array[j] > num_array[j+1]){
            util.push([j, false, false]);
            let temp = num_array[j];
            num_array[j] = num_array[j+1];
            num_array[j+1] = temp;
            j--;
        }
        util.push([j+1, false, true]);
    }
    return num_array;
}

function selection_sort(num_array, util){
    for(let i = 0; i < num_array.length; i++){
        let minn = i;
        util.push[minn,i,true,false];
        for(let j = i+1; j < num_array.length; j++){
            if(num_array[j] < num_array[minn]){
                minn = j;
            }
            util.push([minn,j,false,false]);
        }
        let temp = num_array[i];
        num_array[i] = num_array[minn];
        num_array[minn] = temp;
        util.push([i,minn,false,true]);
    }
    return num_array;
}

function partition(num_array, left, right, util){
    let pivot = right;
    let pos = left;
    util.push([pivot, pos, true, false]);
    for(let i = left; i < right; i++){
        if(num_array[i] <= num_array[pivot]){
            let temp = num_array[i];
            num_array[i] = num_array[pos];
            num_array[pos] = temp;
            util.push([pos, i, false, false]);
            pos++;
        }
    }
    let temp = num_array[pivot];
    num_array[pivot] = num_array[pos];
    num_array[pos] = temp;
    util.push([pos, pivot, false, true]);
    return pos;
}
function quick_sort_util(num_array, left, right, util){
    if(left<=right){
        let pos = partition(num_array, left, right, util);
        num_array = quick_sort_util(num_array, left, pos - 1, util);
        num_array = quick_sort_util(num_array, pos + 1, right, util);
    }
    return num_array;
}
function quick_sort(num_array, util){
    return quick_sort_util(num_array, 0, num_array.length - 1, util);
}

function heapify(num_array, i, n, util){
    let largest = i;
    let left = 2*i + 1;
    let right = 2*i + 2;

    if(left < n && num_array[largest] < num_array[left]){
        largest = left;
    }
    if(right < n && num_array[largest] < num_array[right]){
        largest = right;
    }
    if(largest != i){
        let temp = num_array[largest];
        num_array[largest] = num_array[i];
        num_array[i] = temp;
        util.push([largest, i, false])
        return heapify(num_array, largest, n, util);
    }
    return num_array;
}
function heap_sort(num_array, util){
    let n = num_array.length;
    for(let i = Math.floor(n/2) - 1; i >= 0; i--){
        num_array = heapify(num_array, i, n, util);
    }
    for(let i = n-1; i >= 0; i--){
        let temp = num_array[0];
        num_array[0] = num_array[i];
        num_array[i] = temp;
        util.push([0,i, true]);
        num_array = heapify(num_array, 0, i, util);
    }
    return num_array;
}

document.querySelector('#new-nums').addEventListener('click', () => {
    let nums_div = document.querySelector('#nums');
    nums_div.innerHTML = '';
    for(let i = 0; i < number_of_bars; i++){
        let val = Math.floor(Math.random()*100) + 5;
        let num = document.createElement('p');
        num.textContent = val;
        num.style.height = 5*val + 'px';
        nums_div.appendChild(num);
    }
});

document.querySelector('#heap-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = heap_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){
        let x = util[i][0];
        let y = util[i][1];
        let sorted = util[i][2];

        if(sorted){
            setTimeout(() => {
                let num_x = Number(nums[x].textContent);
                let num_y = Number(nums[y].textContent);

                nums[x].textContent = num_y;
                nums[y].textContent = num_x;

                nums[x].style.height = 5*num_y + 'px';
                nums[y].style.height = 5*num_x + 'px';

                nums[y].style.backgroundColor = '#68fc5d';
            }, time*10);
        }else{
            setTimeout(() => {
                nums[x].style.backgroundColor = '#ff6161';
                nums[y].style.backgroundColor = '#ff6161';

                let num_x = Number(nums[x].textContent);
                let num_y = Number(nums[y].textContent);

                nums[x].textContent = num_y;
                nums[y].textContent = num_x;

                nums[x].style.height = 5*num_y + 'px';
                nums[y].style.height = 5*num_x + 'px';
            }, time*10);
            time++;
            setTimeout(() => {
                nums[x].style.backgroundColor = '#3edcf7';
                nums[y].style.backgroundColor = '#3edcf7';
            }, time*10);
        }
        time++;
    }
});

document.querySelector('#quick-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = quick_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){
        let x = util[i][0];
        let y = util[i][1];
        let pivot = util[i][2];
        let sorted = util[i][3];

        if(sorted){
            setTimeout(() => {
                let num_x = Number(nums[x].textContent);
                let num_y = Number(nums[y].textContent);

                nums[x].textContent = num_y;
                nums[y].textContent = num_x;

                nums[x].style.height = 5*num_y + 'px';
                nums[y].style.height = 5*num_x + 'px';

                nums[x].style.backgroundColor = '#68fc5d';
                if(x != y) nums[y].style.backgroundColor = '#3edcf7';
            }, time*10);
        }else if(pivot){
            setTimeout(() => {
                nums[x].style.backgroundColor = '#d86bff';
            }, time*10);
        }else{
            setTimeout(() => {
                nums[x].style.backgroundColor = '#ff6161';
                nums[y].style.backgroundColor = '#ff6161';

                let num_x = Number(nums[x].textContent);
                let num_y = Number(nums[y].textContent);

                nums[x].textContent = num_y;
                nums[y].textContent = num_x;

                nums[x].style.height = 5*num_y + 'px';
                nums[y].style.height = 5*num_x + 'px';
            }, time*10);
            time++;
            setTimeout(() => {
                nums[x].style.backgroundColor = '#3edcf7';
                nums[y].style.backgroundColor = '#3edcf7';
            }, time*10);
        }
        time++;
    }
});

document.querySelector('#selection-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = selection_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){
        let x = util[i][0];
        let y = util[i][1];
        let beg = util[i][2];
        let swap = util[i][3];

        if(swap){
            setTimeout(() => {
                nums[number_of_bars - 1].style.backgroundColor = '#3edcf7';
                
                nums[x].style.backgroundColor = '#ff6161';
                nums[y].style.backgroundColor = '#ff6161';

                let num_x = Number(nums[x].textContent);
                let num_y = Number(nums[y].textContent);

                nums[x].textContent = num_y;
                nums[y].textContent = num_x;

                nums[x].style.height = 5*num_y + 'px';
                nums[y].style.height = 5*num_x + 'px';
            }, time*10);
            time++;
            setTimeout(() => {
                nums[x].style.backgroundColor = '#68fc5d';
                if(x!=y) nums[y].style.backgroundColor = '#3edcf7';
            }, time*10);
        }else{
            if(beg){
                setTimeout(() => {
                    nums[y].style.backgroundColor = '#ff6161';
                }, time*10);
            }
            else{
                setTimeout(() => {
                    nums[y].style.backgroundColor = '#ff6161';
                    nums[y-1].style.backgroundColor = '#3edcf7';
                }, time*10);
            }
        }
        time++;
    }
});

document.querySelector('#insertion-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = insertion_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){
        let j = util[i][0];
        let start = util[i][1];
        let end = util[i][2];

        if(start){
            setTimeout(() => {
                nums[j].style.backgroundColor = '#68fc5d';
            }, time*10);
            time++;
            setTimeout(() => {
                nums[j].style.backgroundColor = '#ff6161';
            }, time*10);
        }else if(end){
            setTimeout(() => {
                nums[j].style.backgroundColor = '#68fc5d';
            }, time*10);
            time++;
            setTimeout(() => {
                nums[j].style.backgroundColor = '#3edcf7';
            }, time*10);
        }else{
            setTimeout(() => {
                nums[j+1].style.backgroundColor = '#ff6161';

                let prev = Number(nums[j].textContent);
                let curr = Number(nums[j+1].textContent);

                nums[j].textContent = curr;
                nums[j+1].textContent = prev;

                nums[j].style.height = 5*curr + 'px';
            }, time*10);
            time++;
            setTimeout(() => {
                let curr = Number(nums[j+1].textContent);

                nums[j+1].style.backgroundColor = '#3edcf7';
                nums[j].style.backgroundColor = '#ff6161';
                nums[j+1].style.height = 5*curr + 'px';
            }, time*10);
        }
        time++;
    }
    for(let i = 0; i < num_array.length; i++){
        setTimeout(() => {
            nums[i].style.backgroundColor = '#68fc5d';
        }, time*10);
        time++;
    }
});

document.querySelector('#bubble-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = bubble_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){

        let j = util[i][0];
        let swap = util[i][1];
        let sorted = util[i][2];

        if(sorted){
            setTimeout(() => {
                nums[j].style.backgroundColor = '#68fc5d';
            }, time*10);
        }else{
            setTimeout(() => {
                nums[j].style.backgroundColor = '#ff6161';
                nums[j+1].style.backgroundColor = '#ff6161';
            }, time*10);
            time++;

            if(swap){
                setTimeout(() => {
                    let curr = Number(nums[j].textContent);
                    let next = Number(nums[j+1].textContent);
                    nums[j].textContent = next;
                    nums[j+1].textContent = curr;

                    nums[j].style.height = 5*next + 'px';
                    nums[j+1].style.height = 5*curr + 'px';
                }, time*10);
                time++;
            }

            setTimeout(() => {
                nums[j].style.backgroundColor = '#3edcf7';
            }, time*10);
        }
        time++;
    }
});

document.querySelector('#merge-sort').addEventListener('click', () => {
    let nums = document.querySelectorAll('#nums p');
    let num_array = []
    for(let i = 0; i < number_of_bars; i++){
        num_array.push(Number(nums[i].textContent));
    }
    let util = []
    num_array = merge_sort(num_array, util);
    let time = 0;
    for(let i = 0; i < util.length; i++){

        let x = util[i][0];
        let y = util[i][1];
        let z = util[i][2];
        let ht = util[i][3];

        setTimeout(() => {
            nums[x].style.backgroundColor = '#ff6161';
            nums[y].style.backgroundColor = '#ff6161';
        }, time*10);
        time++;
        
        if(i == util.length - 1){
            setTimeout(() => {
                nums[x].style.backgroundColor = '#3edcf7';
                nums[y].style.backgroundColor = '#3edcf7';
                nums[z].style.height = 5*ht + 'px';
                nums[z].textContent = ht;
            }, time*10);
        }else{
            let next_x = util[i+1][0];
            let next_y = util[i+1][1];
            
            if(x == next_x){
                setTimeout(() => {
                    nums[y].style.backgroundColor = '#3edcf7';
                    nums[z].style.height = 5*ht + 'px';
                    nums[z].textContent = ht;
                }, time*10);
            }else if(y == next_y){
                setTimeout(() => {
                    nums[x].style.backgroundColor = '#3edcf7';
                    nums[z].style.height = 5*ht + 'px';
                    nums[z].textContent = ht;
                }, time*10);
            }else{
                setTimeout(() => {
                    nums[x].style.backgroundColor = '#3edcf7';
                    nums[y].style.backgroundColor = '#3edcf7';
                    nums[z].style.height = 5*ht + 'px';
                    nums[z].textContent = ht;
                }, time*10);
            }
        }
        time++;
    }
    for(let i = 0; i < num_array.length; i++){
        setTimeout(() => {
            nums[i].style.backgroundColor = '#68fc5d';
        }, time*10);
        time++;
    }
});

document.querySelector('#test').addEventListener('click', () => {
    for(let i = 0; i < 1000 ; i++){
        let arr = []
        for(let j = 0; j < 1000; j++){
            arr.push(Math.floor(Math.random()*1000));
        }
        sortedArr = arr.slice();
        sortedArr.sort(function(a, b){ return a - b });
        let util = []
        arr = heap_sort(arr, util);
        let flag = true;
        for(let i = 0; i < 1000; i++){
            if(sortedArr[i] != arr[i]){
                flag = false;
                break;
            }
        }
        if(flag){
            console.log(true);
        }else{
            console.log(false);
        }
    }
});