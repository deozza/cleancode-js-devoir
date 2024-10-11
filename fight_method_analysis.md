# Analyse de la méthode fight

La méthode fight est longue, elle fait trop de choses à la fois. Une méthode doit se concentrer sur une seule tâche.
De plus elle contient plusieurs instructions conditionnelles imbriquées (if dans if dans if), ce qui est mauvais. Nous devrions utiliser une approche de type "fail fast" à la place.

Il y a du code répétitif, en effet, il y a deux méthodes pour calculer les dégâts, pour l'ennemi et le joueur, mais elles font la même chose, on peut raccourcir le code en créant une méthode commune pour le joueur et l'ennemi.

Il y a des commentaires inutiles, certains expliquent des choses qui peuvent être comprises simplement en regardant la méthode.

De plus, comme nous utilisons TypeScript, autant définir un type Weapon (interface) pour playerWeapon et enemyWeapon plutôt que d'utiliser le type any.



# Correction de la méthode

Dans un premier temps, nous allons supprimer les commentaires inutiles.

Créer un interface pour Weapon

Refactorisez la méthode fight en la décomposant en plusieurs petites méthodes, chacune ayant une seule responsabilité.

Utiliser l'approche "fail fast" plutôt qu'un imbriquement de if.