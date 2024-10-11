1) Dans les paramètres de la fonction fight, playerWeapon est de type any: mais on sait que ce sera un objet
Solution => playerWeapon: object

2) Dans la fonction fight on devrait faire du code Yoda, vérifier l'inverse si les conditions ne sont pas remplies d'abord pour une meilleure lisibilité
Solution => 

if (!hasInit){
    throw new Error('Game not initialized');
}

if (!hasRound){
    throw new Error('Round not initialized');
}

if (hasFought){
    throw new Error('Round already played');
}

/* Code de fight */

3) La variable enemyWeapon est assignée avec let alors qu'elle n'est pas réassignée donc autant la mettre dans une constante

4) Pour les cas ou les armes inflingent : playerDamages += 1 * Math.floor(Math.random() * 5); on peut le mettre dans une fonction plutôt que de le répéter plusieurs fois qui

5) Le switch est le même à la différence que c'est juste la variable qui change, donc le mettre dans une fonction qui prend la variable en paramètres

6) Le return à la fin pour determiné le gagnant les 4 premiers elements retournés sont les mêmes dont autant toujours les retourner et pour les deux autres booleens retourné la valeur retourné par la condition qui check le gagant/perdant

7) Plutôt que de faire un switch, j'ai ajouter directement dans chaque object le nombre de dégats qu'il inflige, et éventuellement si il a un multiplicateur de dégats

8) Déplacer la fonction qui génère une liste d'armes dans une fonction generateWeaponList

9) Déplacer la fonction qui Reinitialise les armes dans une fonction