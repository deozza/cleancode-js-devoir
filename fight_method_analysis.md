La méthode `fight` n'est pas écrite en clean code.

- Elle a 6 paramètres, ce qui est trop. Pour éviter cela, on peut utiliser un objet pour les regrouper ou encore mieux, séparer au maximum la fonction en plusieurs fonctions.
- Elle a beaucoup de level d'imbriquation (dans le pire des cas, 6). Pour éviter cela, on peut utiliser le pattern `early return` pour sortir de la fonction dès qu'une condition n'est pas respectée au lieu de les imbriquer.
- Elle utilise un switch case pour déterminer l'arme du joueur, ce qui est une mauvaise pratique car on ne peut pas savoir si tous les cas sont traités. Il serait mieux d'utiliser une classe et le polymorphisme pour traiter les différentes armes.
- Elle utilise des variables mutables (`let`). Il est préférable d'utiliser des variables immutables (`const`).
- Elle retourne différents types (`Array<number|boolean>`). En regardant le code, des fois elle retourne un array qui contient uniquement les damages, d'autres fois elle retourne aussi l'arme de l'ennemi, et aussi des booleans qu'on ne sait pas ce qu'ils représentes. Il est préférable de retourner un même type pour une fonction, peut-être un objet les différents éléments.
- Le code est qui détermine les damages est répété. On pourrait le factoriser dans une fonction ou une méthode de la classe `Weapon`.
- La fonction `fight` fait trop de choses. Il serait préférable de la découper en plusieurs fonctions.
- On ne sait pas ce que fait exactement la fonction `fight` sans lire le code. Il serait préférable de renommer la fonction pour qu'elle soit plus explicite.
