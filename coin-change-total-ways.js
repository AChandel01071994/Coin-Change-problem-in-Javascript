// ways to make change out of coins
{
    // recursive solution
    function changeWaysProblemRecursive(coins, change){

         const helper = (c, k, total) => {
            // if total is 0 thn one way is found
            if(total === 0) return 1;
            // if total goes less than 0, no way found
            if(total < 0) return 0;
            // total is greater than 0 & no coins available, no way found
            if(total > 0 && k < 0) return 0;
                
            return helper(c, k, total - c[k]) + helper(c, k - 1, total);
         }
        
         return helper(coins, coins.length - 1, change)
    }
    
    // Dynamic programming solution
    function changeWaysProblemTabulation(coins, change){
        let tabulationMatrix = [];
        // add no coin entry in coins array
        coins.unshift(null);
        for(let i = 0; i < coins.length; i++){
            tabulationMatrix[i] = [];
            for(let j = 0; j <= change; j++){
                let val;
                // one way to make 0 change i.e. use no coin
                if(j === 0) val = 1;
                // if no coin available & change is greater than 0, no way to make change
                else if(i === 0 && j > 0) val = 0;
               else {
                   // exclude current coin
                 let excluded = tabulationMatrix[i - 1][j];
                 // include current coin (check for negative change after subtraction ? 0 : value at index)
                 let included = (j - coins[i]) < 0 ? 0 : tabulationMatrix[i][j - coins[i]];
                 // add result of both subproblem
                 val = excluded + included;  
               }
               tabulationMatrix[i][j] = val;
            }
        }
        return {
            tabulationMatrix
        }
        
    }
    
    let allCoins = [1,2,5];
    let changeTotal = 5;
    //ans - 4

//     let allCoins = [1,2];
//     let changeTotal = 4;
//     ans - 3

//     changeWaysProblemRecursive(allCoins, changeTotal);
    changeWaysProblemTabulation(allCoins, changeTotal);
}
