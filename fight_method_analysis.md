#### Analyse de la méthode fight()

Les if/else : Cela va à l'encontre de l'objectif du failfast. Pour cela il faudrait les mettre au début de la fonction
afin de gérer les erreurs dès le début.

Le switch case qui traite les dégats est répté plusieurs fois. Nous pouvons en faire qu'un seul.
Il faut inclure ennemywheapon dans le tableau de retour pour retirer le dexuième switch case.
Une modification du code au niveau du calcule des dégats doit être faite