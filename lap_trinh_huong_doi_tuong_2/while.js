
        let number = 18;
        let i = 0;
        let j = 1;
        let c;
        let b = 0;
        for (let a = 1; a <= number; a++) {
            c = i + j;
            b= c + b;
            i = j;
            j = c;
            
        }
        console.log(b);
