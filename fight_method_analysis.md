Après lecture de la fonction fight je me rends compte qu'il n'est pas bien écrit. 

Plusieurs choses sont à corriger.

-Le nom de la fonction est très général selon moi -> Solution:  On devrait mettre un nom plus explicite comme par exemple : resolveCombatRound
-il y a  beaucoup de commentaires inutiles(les commentaires qui explique les codes sont pas nécessaires) -> Solution : Mettre des commentaires que lorsque c'est nécessaire
-Imbrication de conditions -> Solution : Appliquer le principe fail-fast (gérer d'abord le cas ou ça échoue comme ça on est sûr de rien oublier)
-Type de playerWeapon trop large -> Solution : Utiliser une interface pour Weapon
-Redondance du calcul des dégâts -> Solution : Extraire le calcul des dégâts dans une méthode
-Gestion de la santé redondante  -> Solution : Déplacer la logique de mise à jour de la santé
-Accès à weaponList global  -> Solution : Passer weaponList en paramètre
-Retour de méthode peu clair -> Solution : 	Utiliser un objet pour le retour de la méthode
-Utilisation de magic numbers  -> Solution : Définir des constantes explicites