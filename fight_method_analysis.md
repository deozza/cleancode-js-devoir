### 1) Method analysis

La méthode fight() n'est pas du tout clean code. Elle mérite certaines modifications afin de la rendre clean :
- Des multiples noveaux d'imbrications : des le debut de la fonction on rentre dans 3 boucles if(), ce qui rend le code difficile a lire
SOLUTION => utilisé des retours anticipés afin de reduire les niveaux d'imbrication
- Du code répétitif : l'utilisation des switch case rend le codent répétif et multiplient le nombre de ligne inutiles.
SOLUTION => Utilisé un objet pour mapper les armes au dégats
- Le non respect du principe solid : la méthod ne respect pas du tout le principe Single Responsibility Principle. Elle fait plusieurs chose a la fois (calcule des dégat, modification des degats, calcul de la sante des joueurs, etc...);
SOLUTION => faire des fonctions séparer comme calculateDamage() qui va calculer les dégats en fonction d'une arme ou selectWeapon() qui va sélectionner une arme.
- Trop de paramètre de fonction : la méthode prend trop de paramètre
SOLUTION => 
- Des commentaires inutiles : la présence de commentaire inutile qui augmente la taille de la methode pour rien 
SOLUTION => simplifier le code afin de ne plus avoir besoin de commentaire.