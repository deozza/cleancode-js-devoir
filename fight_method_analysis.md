Analysis of the fight function : 

Problem : 
Fight function is too long and do A LOT of tasks, we get lost inside really easily.

Solution : 
Break the function into little functions, SRP principle like for calculating the health, choosing the weapon.
 
Problem : 
Switch repetition
the switch case is used 2 times both for player and the ennemy it violate the DRY principle.

Solution : 
create a function that would be reusable for both of them.

Problem : 
The health values are hardcoded, so more effort to adjust the values of them.

Solution : Define the values as constants.

Problem : the comments of error don't give us much help about the issue, so more hard to fix it and understand it
ex : throw new Error('Game not initialized');
ex : throw new Error('Invalid weapon');

Solution : write them more explicity so we can understand them

ex : throw new Error('Game not initialized, please refresh the page to start the game');
ex : throw new Error('Invalid weapon, please change your weapon or have a look at all weapons');




