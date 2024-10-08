# Analyse de la méthode fight()

## 1. Gestion des erreurs avec des if/else

### Problème
`hasInit`, `hasRound`, et `hasFought` sont réalisés en utilisant des if/else dans la fonction. Cela va à l'encontre de l'objectif du fail-fast. 

### Solution
Déplacer les vérifications d'erreurs en haut de la méthode, pour simplifier le reste de la fonction et faciliter la lecture.


## 2. Répétition de code avec le switch case

### Problème
Pour le calcul des dégâts, le switch case est répété deux fois, une fois pour le joueur et une fois pour l'ennemi. Cela accroît la complexité et complique la maintenance du code. 

### Solution
Créer une fonction dédiée pour évaluer les dommages qui prend en compte l'arme et renvoie les dommages. Ceci permettra d'éviter les répétitions et de concentrer la logique de calcul.


## 3. Utilisation de constantes pour les valeurs de santé

### Problème
Les valeurs de santé des joueurs sont indiquées en dur dans plusieurs parties de la méthode. Cela complique la modification de ces valeurs si nécessaire.

### Solution
On déclare des constantes au début du fichier pour les valeurs de santé des joueurs. 


## 4. Retrait du switch case dans `calculateDamage`

### Problème
Le switch case dans la fonction `calculateDamage` complique la lecture du code et peut entraîner des erreurs lors de l'ajout de nouvelles armes ou du changement des valeurs de dégâts.

### Solution
Remplacer le switch case par un objet de mapping (dictionnaire) qui associe chaque arme à ses dégâts. Cela rend le code plus propre et facilite l'ajout ou la modification d'armes à l'avenir.