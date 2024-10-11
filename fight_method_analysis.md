### 1. Method Analysis

## Analyse fight() :

- La fonction fight() permet de réaliser un combat entre un player et un ennemi
- Toutes leurs statistiques sont initialisées dans init()
- Une arme est tirée au hasard pour le player, importé depuis le fichier weaponslist
- La victoire ou la défaite du player se joue sur s'il perd tout ses HP avant ceux de l'ennemi
- Chaque nouveau round définit une nouvelle arme au player en excluant celles déjà tirées

## Problèmes :

- Fonction trop longue et multitâche donc difficile à tester
- Elle utilise des boolean (hasRound, hasFought, hasInit) ce qui augmente la complexité de compréhension de ces variables ci en les rendant ambigus
- Elle utilise un gros bloc switch, ce qui n'est pas optimal dans l'agencement d'une fonction si une personne tierce doit la comprendre ou la modifier
- Le code pour calculer les dégats du joueur et de l'ennemi est dupliqué
- Le return renvoie différents types de valeurs ce qui n'est pas optimal pour la compréhension

## Solutions CleanCode : 

- Division de la fonction en différentes sous-fonctions qui n'auront qu'un rôle chacune (santé du player/enemy, calcul des dégats des armes, tirage d'arme pour l'ennemi)
- Centralisation de l'état du jeu avec une interface pour plus de clarté
- Mise à jour automatique de l'état du jeu à la fin d'un round pour améliorer la cohérence globale
