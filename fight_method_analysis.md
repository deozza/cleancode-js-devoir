# Exercices 1 

## Table of content
- [Analyse de la méthode `init`](#analyse-de-la-méthode-init)
- [Analyse de la méthode `newRound`](#analyse-de-la-méthode-newround)
- [Analyse de la méthode `fight`](#analyse-de-la-méthode-fight)
- [Suggestions de refactoring](#suggestions-de-refactoring)
- [Conclusion](#conclusion)

## Analyse de la méthode init

La fonction `init` est responsable de l'initialisation du jeu. Elle définit les valeurs par défaut pour les propriétés du joueur et de l'ennemi, ainsi que les armes disponibles.
La fonction retourne un objet contenant les propriétés du joueur et de l'ennemi.
Il serait préférable de séparer les initialisations des propriétés du joueur et de l'ennemi en deux fonctions distinctes pour améliorer la lisibilité et la maintenabilité du code.

## Analyse de la méthode `newRound`

La fonction `newRound` est responsable de la création d'un nouveau tour de jeu. Elle définit les armes du joueur et de l'ennemi, ainsi que les états de jeu.
La fonction retourne un objet contenant les armes du joueur et de l'ennemi, ainsi que les états de jeu.
Il serait préférable de séparer la création des armes du joueur et de l'ennemi en deux fonctions distinctes pour améliorer la lisibilité et la maintenabilité du code.

## Analyse de la méthode `fight`

La fonction `fight` est responsable de la simulation du combat entre le joueur et l'ennemi. Elle calcule les dégâts infligés par les armes, met à jour les états de jeu et vérifie si la partie est terminée.
La fonction est très longue et complexe, ce qui rend difficile sa compréhension et sa maintenance. Il serait préférable de la décomposer en plusieurs fonctions plus petites et plus spécialisées :

- Une fonction `calculateDamage` qui prend en entrée l'arme du joueur et de l'ennemi et retourne les dégâts infligés.
- Une fonction `updateGameState` qui prend en entrée les dégâts infligés et met à jour les états de jeu.
- Une fonction `checkGameEnd` qui prend en entrée les états de jeu et retourne un booléen indiquant si la partie est terminée.
- Une fonction `chooseRandomWeapon` qui retourne une arme aléatoire pour le joueur et l'ennemi.
- Une fonction `fight` qui appelle les fonctions précédentes pour simuler le combat entre le joueur et l'ennemi.
- Une fonction `updateHealth` qui prend en entrée la santé d'un joueur et les dégâts infligés et retourne la nouvelle santé.
- Une fonction `updateGameState` qui prend en entrée les dégâts infligés et met à jour les états de jeu en fonction des dégâts infligés et de la santé des joueurs.
- Une fonction `hasPlayerWon` qui prend en entrée la santé de l'ennemi et retourne un booléen indiquant si le joueur a gagné.
- Une fonction `hasPlayerLost` qui prend en entrée la santé du joueur et retourne un booléen indiquant si le joueur a perdu.
- Une fonction `checkGameEnd` qui prend en entrée les états de jeu et retourne un booléen indiquant si la partie est terminée en fonction de la santé des joueurs.
- Une fonction `calculateDamageForWeapons` qui prend en entrée les armes du joueur et de l'ennemi et retourne les dégâts infligés par chaque arme.
- Une fonction `getDamageForWeapon` qui prend en entrée une arme et retourne les dégâts qu'elle inflige.



## Suggestions de refactoring

- Une fonction `calculateDamage` qui prend en entrée l'arme du joueur et de l'ennemi et retourne les dégâts infligés.
- Une fonction `updateGameState` qui prend en entrée les dégâts infligés et met à jour les états de jeu.
- Une fonction `checkGameEnd` qui prend en entrée les états de jeu et retourne un booléen indiquant si la partie est terminée.
- Une fonction `chooseRandomWeapon` qui retourne une arme aléatoire pour le joueur et l'ennemi.
- Une fonction `fight` qui appelle les fonctions précédentes pour simuler le combat entre le joueur et l'ennemi.
- Une fonction `updateHealth` qui prend en entrée la santé d'un joueur et les dégâts infligés et retourne la nouvelle santé.
- Une fonction `updateGameState` qui prend en entrée les dégâts infligés et met à jour les états de jeu en fonction des dégâts infligés et de la santé des joueurs.
- Une fonction `hasPlayerWon` qui prend en entrée la santé de l'ennemi et retourne un booléen indiquant si le joueur a gagné.
- Une fonction `hasPlayerLost` qui prend en entrée la santé du joueur et retourne un booléen indiquant si le joueur a perdu.
- Une fonction `checkGameEnd` qui prend en entrée les états de jeu et retourne un booléen indiquant si la partie est terminée en fonction de la santé des joueurs.
- Une fonction `calculateDamageForWeapons` qui prend en entrée les armes du joueur et de l'ennemi et retourne les dégâts infligés par chaque arme.
- Une fonction `getDamageForWeapon` qui prend en entrée une arme et retourne les dégâts qu'elle inflige.

## Conclusion 

D'après l'analyse précédente, il semble que le code actuel ne respecte pas les principes du "clean code". Cela signifie qu'il peut être difficile à lire, à comprendre et à maintenir. Pour améliorer cela, il est recommandé de réorganiser la fonction fight en utilisant les nouvelles fonctions identifiées. Cela permettra d'améliorer la lisibilité et la maintenabilité du code, ce qui facilitera sa compréhension et sa modification ultérieure.
