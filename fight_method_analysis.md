# Exercice 1 : **Method analysis**

## Problème 1 : **Violation du premier principe SOLID (Single responsibility principle)**

La fonction fight() est responsable de plusieurs tâches : calculer les dégâts du joueur et de l'ennemi, vérifier les états du jeu (si initialisé, si le tour a été joué), gérer la santé, et renvoyer les résultats. Ce qui n'est pas "clean".

Solution : Casser cette fonction en plusieurs fonctions ayant chacune leur propre responsabilité

## Problème 2 : **Utilisation de nombres "magiques" (antipattern)**

Dans la gestion des dégâts on a dans un switch case l'utilisation de nombre sans aucune signification pour ajouter les degâts pour le joueur ou l'ennemi (ex : playerDamages += 1;)

Solution : Utiliser des constantes qui s'explique toute seul par exemple : 
```js
    const WeaponsWithOneDommage = 1;
    const WeaponsWithFiveDommage = 5;
```

Comme ça à chaque attribution ça explique que ce sont les dégâts de l'arme qui sont ajouté (j'avais aussi pensé au fait de créer des classes objet pour les armes et les joueurs mais on doit juste analyser la méthode fight() et non tout le fonctionement du jeux non ? je dit ça au cas où)

## **Problème 3 : Répétition du code du switch case pour le calcule des dégâts du joueur et de l'ennemis**

Les dégâts du joueur et de l’ennemi sont calculés en utilisant un switch presque idem. C'est quelque chose qui viole le principe "DRY" (don't reapeat yourself)

Solution : Créer une fonction spécifique pour calculer les dégâts et en fonction de l'arme en paramètre et de retrouner la valeurs de l'arme

## **Problème 4 : Retour de fonction inconstant**

La fonction fight() retourne soit un tableau d'entier soit un tableau mixer avec des boolean.

Solution : Créer un objet qui sera le rendu de la fonction :

```js
    interface resultFight{
        playerHealth: number; 
        enemyHealth: number;
        enemyWeapon?: any;
        gameOver: boolean; 
        playerWon?: boolean;
        playerLost?: boolean;
    }
```

Comme ça on est sûr de ce que l'on va renvoyer par la fonction

## **Problème 5 : Utilisation du switch**

Utiliser un switch case est vraiment pas terrible, surtout si on doit après rajouter des armes, alors on devra rajouté encore plus de case ce qui va ralonger la fonction pour rien

Solution : utiliser un objet pour associer chaque armes avec ses dêgats 

```js
    const weaponDamageMap: Record<string, number | ((weapon: any) => number)> = {
    'hatchet': WeaponsWithOneDommage,
    'knife': WeaponsWithOneDommage,
    'spear': WeaponsWithOneDommage,
    'sword': WeaponsWithFiveDommage,
    'halberd': WeaponsWithFiveDommage,
    'bow': (weapon) => 1 * Math.floor(Math.random() * 5),
    'crossbow': (weapon) => 2 * Math.floor(Math.random() * 5),
    'darts': (weapon) => 1 * Math.floor(Math.random() * 3),
    'dagger': WeaponsWithThreeDommage
    };
```

On peut y ajouter en plus les constantes créer précedements.
