# Analyse et correction de la méthode fight

## Analyse

La fonction `fight()` comporte de nombreux problèmes qui ne respectent pas du tout les principes du cleancode 
La fonction a des problèmes de lisibilité, de duplication de code, de complexité et de maintenabilité. Voici une liste des problèmes rencontrés :

### Les problèmes concrets et leurs solutions

#### 1) La fonction est trop longue et gère trop de choses à la fois. 

Le meilleur moyen de régler ce problème est de découper la fonction en plusieurs fonctions plus petites et plus simples qui gèrent chacune une fonctionnalité. Cela permettra de rendre le code plus lisible et plus facile à maintenir.

#### 2) La fonction contient des switch case répétitifs et très similaires.

Les switch case contiennent le calcul et l'attribution des dégâts des armes au joueur ou au bot.
Il vaudrait mieux stocker ces valeurs dans un objet ou un tableau pour éviter la répétition de code.


#### 3) La fonction contient des if else à rallonge.

Ici, il faut simplement faire du fail fast pour clarifier le code pour qu'il soit plus "droit".

#### 4) La fonction contient des commentaires inutiles.

Ici, une simple suppression des commentaires inutiles fera l'affaire.  



### Autre problème noté au test du jeu:
- Lorsque l'on joue trop vite le jeu n'arrive pas toujours à actualiser les points de vie de l'adversaire ou encore son arme.
